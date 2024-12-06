# API-Designer 🎨
This is a prototype for automatically generating an [OpenAPI Specification, OAS](https://swagger.io/specification/) (v3.0.0) given a [RAML](https://raml.org/) file for endpoint definitions + [CUE](https://cuelang.org/docs/) files for schema definitions.

# Run with

```bash
deno -A main.ts sample
```

deno -A internal/run-cue.ts