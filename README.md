# gql-generator-full-blown-preset

🛩 A cool and opinionated base configuration for graphql-code-generator. 

## Features
- Generates a base `schema.graphql` file using [`@graphql-codegen/schema-ast`](https://www.graphql-code-generator.com/plugins/schema-ast)
- Generates a base `schema.generated.ts` with typings for the base schema using [`@graphql-codegen/typescript`](https://www.graphql-code-generator.com/plugins/typescript)
- Generates typings files for each of your operations files using [`@graphql-codegen/typescript`](https://www.graphql-code-generator.com/plugins/near-operation-file-preset)
- Generate `TypedDocumentNode` instead of hooks/composables using [`@graphql-codegen/typed-document-node`](https://www.graphql-code-generator.com/plugins/typed-document-node)
- Use PascalCase as default naming convention.
- Remove `__typenames` from types.

## Installation
```
pnpm add -D @julr/gql-generator-full-blown-preset 
pnpm add @graphql-typed-document-node/core
```

If you are using pnpm you must hoist the `@graphql-codegen` dependencies to the root modules directory. This could be done by adding the following content to your project .npmrc file :
```
public-hoist-pattern[]=@graphql-codegen/*
```

## Usage
Create a `graphql.config.js` file in the root of your project.
```js
require("dotenv").config();
const generate = require("gql-generator-full-blown-preset/src/index");

module.exports = generate({
  url: process.env.HASURA_URL,
  secret: process.env.HASURA_SECRET,
});
```

## License

[MIT](./LICENSE.md) License © 2022 [Julien Ripouteau](https://github.com/Julien-R44)
