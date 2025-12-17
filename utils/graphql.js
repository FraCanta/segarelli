// utils/graphql.js
import { GraphQLClient } from "graphql-request";

const endpoint = "https://blogannamaria.annamariaricci.eu/graphql"; // l'endpoint WPGraphQL

export const client = new GraphQLClient(endpoint);
