# API-Designer 🎨
This is a prototype for automatically generating an [OpenAPI Specification, OAS](https://swagger.io/specification/) (v3.0.0) given a [RAML](https://raml.org/) file for endpoint definitions + [CUE](https://cuelang.org/docs/) files for schema definitions.

## Prerequisites

- [Deno](https://docs.deno.com/runtime/getting_started/installation/) (>=2.1.3)
- [Golang](https://go.dev/doc/install) (>=1.23.3)
- [Cue](https://cuelang.org/docs/introduction/installation/) (>=0.11.0)

## Run with

```bash
deno -A main.ts sample
```
