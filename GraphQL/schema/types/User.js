import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
} from "graphql";
import { CompanyType } from "./Company.js";
import Company from "../../models/Company.js";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parent) {
        return Company.findById(parent.companyId);
      },
    },
  }),
});
