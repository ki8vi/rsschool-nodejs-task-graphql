import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLError, GraphQLSchema, parse, validate } from 'graphql';
import { PrismaClient } from '@prisma/client';
import mutation from './mutations.js';
import query from './rootSchema.js';
import depthLimit from 'graphql-depth-limit';

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
      const err = validateQSD(schema, query);
      if(err) return { errors: err };
      else console.log('all good')
      return await graphql({ schema, source: query, variableValues: variables, contextValue: { prisma } });

    },
  });
};

export default plugin;

type ErrsOrNull = readonly GraphQLError[] | null;

function validateQSD(schema: GraphQLSchema, qr: string, depth: number = 5): ErrsOrNull {
  const res: readonly GraphQLError[] = validate(schema, parse(qr), [depthLimit(depth)]);
  return res.length ? res : null;
}
