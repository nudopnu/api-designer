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

_Important note:_

As discussed [here](https://github.com/cue-lang/cue/issues/267#issuecomment-873386839), specifying a closed struct in CUE does not automatically create an `"additionalProperties": false` flag. I injected this as a manual modification step afterwards.

## Show result in browser

```bash
MSYS_NO_PATHCONV=1 docker run \
    --rm \
    -p 8080:8080 \
    -e SWAGGER_JSON=/app/openapi.json \
    -v $(pwd)/out:/app \
    swaggerapi/swagger-ui
```

## Show auto-updating result in browser

```bash
docker build -t swagger-ui-auto-refresh .
MSYS_NO_PATHCONV=1 docker run \
    --rm \
    -d \
    -p 8080:8080 \
    -e SWAGGER_JSON=/app/openapi.json \
    -v $(pwd)/out:/app \
    swagger-ui-auto-refresh
```