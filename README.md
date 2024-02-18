# GraphQL Sakila Example

This repository contains a sample application built using,
- `Apollo`
- `Prisma`
- `TypeScript`
- `MySQL`

The dataset used is the [Sakila](https://dev.mysql.com/doc/index-other.html) sample database.

## Overview

This application includes the following features:

- Implementation of GraphQL queries (with arguments)
- Data manipulation using the Sakila dataset

## Setup

1. Clone the repository:

```bash
git clone https://github.com/wf001/graphql-sakila.git
```

2. Execute the SQL files in the `db/init` directory sequentially to set up the Sakila database.

```bash
cd graphql-sakika
mysql -u (your_db_username) < db/init/01-sakila-schema.sql
mysql -u (your_db_username) < db/init/02-sakila-dataset.sql
```

3. Install dependencies:


```bash
yarn install
```
4. Creat env file on root

``` .env
DATABASE_URL="mysql://(USERNAME):(USER_PASSWORD)@localhost:(PORT)/sakila"
```

## Usage

To start the server, run the following command:

```bash
yarn start
```

This will start the server, and you'll be able to access the GraphQL endpoint(default is `localhost:4000`).

![](https://github.com/wf001/mysqlcolor/assets/36895006/ab0a040a-53b5-41dd-9b19-c6aacbcc8017)

## Query Examples

Here's an example of the queries supported by the server:

```graphql
query GetCountry($cityId: Int!) {
  getCity(city_id: $cityId) {
    city
    city_id
    country {
      country
      country_id
    }
  }
}

```

## License

MIT License

