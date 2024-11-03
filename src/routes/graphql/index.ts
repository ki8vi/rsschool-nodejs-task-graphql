import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLSchema, parse, validate } from 'graphql';
import { PrismaClient } from '@prisma/client';
import mutation from './mutations.js';
import query from './rootSchema.js';

const schema = new GraphQLSchema({ query, mutation })

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const prisma: PrismaClient = fastify.prisma;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const errors = validate( schema, parse(query));
      if(errors.length) return { errors };
      else console.log('all good')
      return await graphql({ schema, source: query, variableValues: variables, contextValue: { prisma } });

    },
  });
};

export default plugin;

