import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { User } from './types/userTypes.js';
import { Arg, Ctx } from './rootSchema.js';
import { ChangePostInput, ChangeProfileInput, ChangeUserInput, CreatePostInput, CreateProfileInput, CreateUserInput } from './types/inputTypes.js';
import { UUIDType } from './types/uuid.js';
import { Profile } from './types/profileType.js';
import { Post } from './types/postTypes.js';

type CreateUserArg = {
    dto: {
        name: string;
        balance: number;
    }
}

const mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
      createUser: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: User,
        args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
        resolve: async (__, { dto }: CreateUserArg, ctx: Ctx) => {
            return ctx.prisma.user.create({ data: dto });
        },
      },
      createProfile: {
        type: Profile,
        args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
        resolve: async (__, { dto }, context: Ctx) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          return context.prisma.profile.create({ data: dto });
        },
      },
      createPost: {
        type: Post,
        args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
        resolve: async (__, { dto }, context: Ctx) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          return context.prisma.post.create({ data: dto });
        },
      },
      changePost: {
        type: Post,
        args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: new GraphQLNonNull(ChangePostInput) } },
        resolve: async (__, { id, dto }, context: Ctx) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          return context.prisma.post.update({ where: { id }, data: dto });
        },
      },
      changeProfile: {
        type: Profile,
        args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: new GraphQLNonNull(ChangeProfileInput) } },
        resolve: async (__, { id, dto }, context: Ctx) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          return context.prisma.profile.update({ where: { id }, data: dto });
        },
      },
      changeUser: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: User,
        args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: new GraphQLNonNull(ChangeUserInput) } },
        resolve: async (__, { id, dto }, context: Ctx) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          return context.prisma.user.update({ where: { id }, data: dto });
        },
      },
      deleteUser: {
        type: GraphQLString,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: async (__, { id }: Arg, context: Ctx) => {
          await context.prisma.user.delete({ where: { id } });
          return 'bye user =)';
        },
      },
      deletePost: {
        type: GraphQLString,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: async (__, { id }: Arg, context: Ctx) => {
          await context.prisma.post.delete({ where: { id } });
          return 'bye post =)';
        },
      },
      deleteProfile: {
        type: GraphQLString,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: async (__, { id }: Arg, context: Ctx) => {
          await context.prisma.profile.delete({ where: { id } });
          return 'zaleg na dno';
        },
      },
      subscribeTo: {
        type: GraphQLString,
        args: {
          userId: { type: new GraphQLNonNull(UUIDType) },
          authorId: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (__, { userId, authorId }, context: Ctx) => {
          await context.prisma.subscribersOnAuthors.create({
            data: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              subscriberId: userId,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              authorId: authorId,
            },
          });
          return 'plus subs )';
        },
      },
      unsubscribeFrom: {
        type: GraphQLString,
        args: {
          userId: { type: new GraphQLNonNull(UUIDType) },
          authorId: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (__, { userId, authorId }, context: Ctx) => {
          await context.prisma.subscribersOnAuthors.deleteMany({
            where: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              subscriberId: userId,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              authorId: authorId,
            },
          });
          return 'just bye';
        },
      },
    },
  });

export default mutation;