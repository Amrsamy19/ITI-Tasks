import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} from "graphql";
import { UserType } from "../types/User.js";
import { CompanyType } from "../types/Company.js";
import User from "../../models/User.js";
import Company from "../../models/Company.js";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          age: args.age,
          companyId: args.companyId || null,
        });
        return await user.save();
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(_, args) {
        return await User.findByIdAndDelete(args.id);
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
      },
      async resolve(_, args) {
        return await User.findByIdAndUpdate(
          args.id,
          { $set: { ...args } },
          { new: true }
        );
      },
    },
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString },
      },
      async resolve(_, args) {
        const company = new Company({
          name: args.name,
        });
        return await company.save();
      },
    },
    deleteCompany: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(_, args) {
        return await Company.findByIdAndDelete(args.id);
      },
    },
    editCompany: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
      },
      async resolve(_, args) {
        return await Company.findByIdAndUpdate(
          args.id,
          { $set: { ...args } },
          { new: true }
        );
      },
    },
  },
});
