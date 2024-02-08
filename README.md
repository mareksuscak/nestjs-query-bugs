# NestJS Query Bugs

## Running the app

```bash
npm install

docker compose up -d
npm run start:dev
```

Navigate to `http://localhost:3000/graphql`

Create a few objects

```gql
mutation Create($input: CreateOneItemInput!) {
  createOneItem(input: $input) {
    id
    name
  }
}
```

Use the following payload (remove "parent" when creating parent items, then use the parent ID to create children):

```json
{
  "input": {
    "item": {
      "name": "Item 1",
      "parent": "65c4c8dbdba77e2806ee87ad"

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

## License

Nest is [MIT licensed](LICENSE).
