# bff-layer-starter

Custom GraphQL BFF Layer starter kit to support your frontend.

## Setup

```sh
npm i
```

## Running

```sh
npm start
# OR
npm run watch

```sh
# Generate TypeScript types from *.graphql schema files
npm run generate
```

```sh
# Trigger full clean/build
npm run build

## API

### `GET /`

Simple endpoint that acts as a health and/or status check.

#### Example response

```json
{
    "env": {
    "node_env": "development",
    "se_env": "DEVELOPMENT"
    }
}
```
#### Example request

```js
{
  "offset": 0,
  "limit":10
}
query {
    items {
      description
      isConfigured
      name
      type
    }
    offset
    limit
    totalCount
}

#### Example response

```json
{
  "data": {
    "connectors": {
      "items": [
        {
          "description": "This is the first connector",
          "isConfigured": true,
          "name": "Connector 1",
          "type": null
        },
        {
          "description": "This is the second connector",
          "isConfigured": false,
          "name": "Connector 2",
          "type": null
        },
        {
          "description": "This is the third connector",
          "isConfigured": true,
          "name": "Connector 3",
          "type": null
        }
      ],
      "offset": 0,
      "limit": 10,
      "totalCount": 3
    }
  }
}
```