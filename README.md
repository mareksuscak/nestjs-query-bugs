# NestJS Query Bugs

This repository was created in response to a request in <https://github.com/TriPSs/nestjs-query/discussions/221#discussioncomment-8254652>.

## Running the app

```bash
yarn

docker compose up -d
yarn start:dev
```

Navigate to <http://localhost:3000/graphql>

Create a few objects using the mutations below:

```gql
mutation Create($input: CreateOneItemInput!) {
  createOneItem(input: $input) {
    id
    name
  }
}
```

Use the following payload to create the parent item:

```json
{
  "input": {
    "item": {
      "name": "Item 1"
    }
  }
}
```

Now replace `<ITEM_1_ID>` below with the generated ID to create children:

```json
{
  "input": {
    "item": {
      "name": "Item 2",
      "parent": "<ITEM_1_ID>"

    }
  }
}
```

```json
{
  "input": {
    "item": {
      "name": "Item 3",
      "parent": "<ITEM_1_ID>"

    }
  }
}
```

Now query the created documents:

```graphql
# Write your query or mutation here
{
  items {
    nodes {
      id
      name
      subItems {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
}
```

Observe the following queries are made on the collection (printed in the terminal):

```js
// Top level query of the list
items.find({"deleted":{"$ne":true}})

// Expansion of the first item (this seems unnecessary!)
items.findOne({"_id":"65c4c8dbdba77e2806ee87ad","deleted":{"$ne":true}})
// Children lookup (should these be pulled in a batch query?)
items.find({"parent":{"$in":["65c4c8dbdba77e2806ee87ad"]},"deleted":{"$ne":true}})

// Expansion of the second item (this seems unnecessary!)
items.findOne({"_id":"65c4c8eddba77e2806ee87af","deleted":{"$ne":true}})
// Children lookup (should these be pulled in a batch query?)
items.find({"parent":{"$in":["65c4c8eddba77e2806ee87af"]},"deleted":{"$ne":true}})

// Expansion of the third item (this seems unnecessary!)
items.findOne({"_id":"65c4c91cdba77e2806ee87dc","deleted":{"$ne":true}})
// Children lookup (should these be pulled in a batch query?)
items.find({"parent":{"$in":["65c4c91cdba77e2806ee87dc"]},"deleted":{"$ne":true}})
```

I was expecting the data loader to handle batch-fetching of related items which I can accomplish through the `loaders` property as shown here: <https://github.com/mareksuscak/nestjs-query-bugs/pull/1/files#diff-089f4f2474b64391c42b6e66aed33977e132058d92108f0a63234a7862e1f8b8R54-R80>

## License

Nest is [MIT licensed](LICENSE).
