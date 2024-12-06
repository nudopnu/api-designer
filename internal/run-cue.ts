export async function cueToOAS(cueFiles: string[]) {
  const command = new Deno.Command("cue", {
    args: ["export", "--out", "openapi", ...cueFiles],
    stdin: "piped",
    stdout: "piped",
  });

  const process = command.spawn();
  await process.stdin.close();
  const result = await process.output();
  return new TextDecoder().decode(result.stdout);
}
