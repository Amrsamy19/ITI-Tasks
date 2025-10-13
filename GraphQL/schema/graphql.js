import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} from "graphql";

import User from "../models/User.js";
import Company from "../models/Company.js";
import { UserType } from "./types/User.js";
import { CompanyType } from "./types/Company.js";
import { Mutation } from "./mutations/User.js";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find();
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Company.findById(args.id);
      },
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve() {
        return Company.find();
      },
    },
  },
});

const graphql = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

export default graphql;
