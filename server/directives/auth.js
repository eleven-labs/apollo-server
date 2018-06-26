'use strict';

const { ApolloServer, gql, SchemaDirectiveVisitor, AuthenticationError } = require("apollo-server");
const { defaultFieldResolver } = require("graphql");
const { getUser } = require('../helpers/auth');

class AuthDirective extends SchemaDirectiveVisitor {

  visitObject(type) {
    this.ensureFieldsWrapped(type);
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
  }

  ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async (...args) => {

        const context = args[2];
        const user = await getUser(context);

        if (!user) throw new AuthenticationError('Not authenticated');

        return resolve.apply(this, args);
      };
    });
  }
}

module.exports = AuthDirective;