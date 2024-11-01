import { GraphQLObjectType, GraphQLList } from 'graphql';
import { User } from './types/userTypes.js';
import { UUIDType } from './types/uuid.js';
import { PrismaClient } from '@prisma/client';
import { Post } from './types/postTypes.js';
import { Profile } from './types/profileType.js';

export type Ctx = {
  prisma: PrismaClient;
}

export type Arg =  {
  id: string;
}


const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: User,
      args: { id: { type: UUIDType } },
      resolve: async (__, { id }: Arg, ctx: Ctx) => {
        return ctx.prisma.user.findUnique({ where: { id } });
      },
    },
    users: {
      type: new GraphQLList(User),
      resolve: async (__, _, ctx: Ctx) => {
        return ctx.prisma.user.findMany();
      },
    },
    post: {
      type: Post,
      args: { id: { type: UUIDType } },
      resolve: async (__, { id }: Arg, ctx: Ctx) => {
        return ctx.prisma.post.findUnique({ where: { id } });
      },
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: async (__, _, ctx: Ctx) => {
        return ctx.prisma.post.findMany();
      },
    },
    profile: {
      type: Profile,
      args: { id: { type: UUIDType } },
      resolve: async (__, { id }: Arg, ctx: Ctx) => {
        return ctx.prisma.profile.findUnique({ where: { id } });
      },
    },
    profiles: {
      type: new GraphQLList(Profile),
      resolve: async (__, _, ctx: Ctx) => {
        return ctx.prisma.profile.findMany();
      },
    },
  },
});

export default query;



