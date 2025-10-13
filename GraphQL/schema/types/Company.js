import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} from "graphql";
import { UserType } from "./User.js";
import User from "../../models/User.js";

export const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent) {
        return User.find({ companyId: parent.id });
      },
    },
  }),
});
