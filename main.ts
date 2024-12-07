import { debounce } from "jsr:@std/async/debounce";
import { walk } from "jsr:@std/fs/walk";
import * as path from "jsr:@std/path";
import { openapiSchemaToJsonSchema } from "npm:@openapi-contrib/openapi-schema-to-json-schema";
import webapi from "npm:webapi-parser";
import { cueToOAS } from "./internal/run-cue.ts";
const { WebApiParser } = webapi;

async function main() {
  const CWD = Deno.cwd();

  const cueFiles: string[] = [];
  for await (const dirEntry of walk(SRC_DIR)) {
    if (dirEntry.isFile && dirEntry.name.endsWith(".cue")) {
      cueFiles.push(dirEntry.path);
    }
  }
  console.log(`${cueFiles.length} *.cue files found in ${CWD}`);

  // Generate intermediate OAS 3.0 for the cue datatypes
  const dataTypesOas = await cueToOAS(cueFiles);
  const { schemas } = JSON.parse(dataTypesOas).components;
  await Object.entries(schemas).forEach(async ([key, value]) => {
    const outFilePath = path.join(TMP_DIR, key);
    const jsonSchema = openapiSchemaToJsonSchema(value);
    jsonSchema.additionalProperties = false;
    const outFileContent = JSON.stringify(jsonSchema, null, "\t");
    await Deno.writeTextFile(outFilePath, outFileContent);
  });

  // Parse copy of RAML 1.0 api definition file
  await Deno.copyFile(
    path.join(SRC_DIR, "api.raml"),
    path.join(TMP_DIR, "api.raml")
  );
  const inPath = path.join(CWD, "api.raml");
  let model = await WebApiParser.raml10.parse(`file://${inPath}`);
  model = await WebApiParser.raml10.resolve(model);
  const validation = await WebApiParser.raml10.validate(model);
  if (!validation.conforms) {
    validation.results.forEach((report) => {
      console.log(report.message);
    });
  }

  const outPath = path.join(OUT_DIR, "openapi.json");
  console.log("Generating file to:", outPath);

  // Generate file with changed OAS 3.0 content
  await WebApiParser.oas30.generateFile(model, `file://${outPath}`);
}

const TMP_DIR = path.join(import.meta.dirname!, "tmp");
const OUT_DIR = path.join(import.meta.dirname!, "out");
const SRC_DIR = await Deno.realPath(Deno.args[0] || ".");
Deno.chdir(TMP_DIR);

await main();
const update = debounce(async () => {
  await main();
}, 200);

const watcher = Deno.watchFs(SRC_DIR);
for await (const _ of watcher) {
  update();
}
