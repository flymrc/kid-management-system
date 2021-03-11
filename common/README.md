# Common

## OpenAPI specification generation

* Schema: `kms-leancloud.yaml`
* Templates: `src/resources/kotlin-leancloud/`

Schema extensions:
* `x-object-abstract`: Annotate schema type as abstract storage type (thus no table mapped to backend)
* `x-object-cross-unique-index`: Array type, apply cross unique index in Leancloud schema, each item refers an property.

Property extensions:
* `x-object-queryable`: If true, generate helper functions like `whereFieldIs`.
* `x-object-index`: Apply index in Leancloud schema, for now its value can only be `default`, `unique`.
  1. default: ascending index.
  2. unique: ascending with unique index.
  3. incremental: ascending with incremental unique index.