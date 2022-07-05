import type { IGraphQLConfig, SchemaPointer } from 'graphql-config'

const contentToAdd = `
/* eslint-disable */

/**
 * This file is auto-generated by graphql-code-generator.
 * DO NOT EDIT MANUALLY.
 */
`

interface ConfigOptions {
  schema: SchemaPointer | { url: string; secret: string }
  additionalExtensions?: Record<string, any>
}

export default function defineConfig(options: ConfigOptions): IGraphQLConfig {
  const schema =
    typeof options.schema === 'object' && 'url' in options.schema
      ? [{ [options.schema.url]: { headers: { 'x-hasura-admin-secret': options.schema.secret } } }]
      : options.schema

  return {
    schema,
    documents: ['src/**/!(*.generated).{graphql,gql}'],
    extensions: {
      codegen: {
        config: {
          useTypeImports: true,
          /**
           * Remove __typename from types
           */
          skipTypename: true,

          /**
           * Rename all types to PascalCase and remove underscores
           */
          namingConvention: {
            typeNames: 'change-case-all#pascalCase',
            transformUnderscore: true,
          },
        },

        generates: {
          /**
           * Generate a local copy of the schema
           */
          './src/graphql/schema.graphql': {
            plugins: ['schema-ast'],
          },

          /**
           * Generate the base types for the schema
           */
          './src/graphql/schema.generated.ts': {
            plugins: ['typescript', { add: { content: contentToAdd } }],
          },

          /**
           * Generate one typing file for each of the operations files
           */
          'src/': {
            preset: 'near-operation-file',
            presetConfig: {
              extension: '.generated.ts',
              baseTypesPath: 'graphql/schema.generated.ts',
            },
            plugins: [
              { add: { content: contentToAdd, placement: 'prepend' } },
              'typescript-operations',
              'typed-document-node',
            ],
          },
        },
      },
      ...options.additionalExtensions,
    },
  }
}
