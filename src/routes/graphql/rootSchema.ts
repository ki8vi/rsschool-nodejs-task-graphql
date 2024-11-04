import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { User } from './types/userTypes.js';
import { UUIDType } from './types/uuid.js';
import { Post } from './types/postTypes.js';
import { Ctx, Profile } from './types/profileType.js';
import { MemberType, MemberTypeIdEnum } from './types/memberTypes.js';


export type Arg =  {
  id: string;
}


const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: User as GraphQLObjectType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (__, { id }: Arg, ctx: Ctx) => {
        return await ctx.prisma.user.findUnique({ where: { id } });
      },
    },
    users: {
      type: new GraphQLList(User),
      resolve: async (__, _, ctx: Ctx) => {
        return await ctx.prisma.user.findMany();
      },
    },
    post: {
      type: Post,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (__, { id }: { id: string }, ctx: Ctx) => {
        const post = await ctx.prisma.post.findUnique({ where: { id } });
        return post;
      },
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: async (__, _, ctx: Ctx) => {
        return await ctx.prisma.post.findMany();
      },
    },
    profile: {
      type: Profile,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (__, { id }: Arg, ctx: Ctx) => {
        return await ctx.prisma.profile.findUnique({ where: { id } });
      },
    },
    profiles: {
      type: new GraphQLList(Profile),
      resolve: async (__, _, ctx: Ctx) => {
        return await ctx.prisma.profile.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: { id: { type: new GraphQLNonNull(MemberTypeIdEnum) } },
      resolve: async (__, { id }: { id: string }, ctx: Ctx) => {
        return await ctx.prisma.memberType.findUnique({ where: { id } });
      }
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (__, _, ctx: Ctx) => {
        return await ctx.prisma.memberType.findMany();
      }
    }
  }),
});

export default query;



