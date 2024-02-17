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
    getCountries: () => prisma.country.findMany({ include: { city: true } }),
    getCountry: (_, args) =>
      prisma.country.findFirst({
        where: args,
        include: { city: true },
      }),
    getCities: () => prisma.city.findMany({ include: { country: true } }),
    getCity: (_, args) =>
      prisma.city.findUnique({
        where: args,
        include: { country: true },
      }),
    getAddresses: () => prisma.address.findMany({ include: { city: true } }),
    getAddress: (_, args) =>
      prisma.address.findUnique({
        where: args,
        include: { city: true, store: true },
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
