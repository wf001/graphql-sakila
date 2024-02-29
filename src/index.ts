import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from "graphql-scalars";
import * as fs from "fs";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getCustomers: () => prisma.customer.findMany({}),
    getCustomerAddress: (_, args) =>
      prisma.customer.findUnique({
        where: args,
        include: {
          address: { include: { city: { include: { country: true } } } },
        },
      }),
    getCustomerRentalInfo: (_, args) =>
      prisma.customer.findUnique({
        where: args,
        include: { payment: { include: { rental: true } } },
      }),
  },
};

const typeDefs = fs.readFileSync("./src/schema.graphql", "utf8");

const server = new ApolloServer({
  resolvers: {
    ...scalarResolvers,
    ...resolvers,
  },
  typeDefs: [...scalarTypeDefs, typeDefs],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
