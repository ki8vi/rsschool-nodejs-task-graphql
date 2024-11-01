import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from './uuid.js';
import type { PrismaClient  } from '@prisma/client';
import { Post } from './postTypes.js';
import type { Profile as ProfileType } from './profileType.js';
import { Profile } from './profileType.js';


export interface UserType {
  id: string;
  name: string;
  balance: number;
  profile: typeof ProfileType | null;
  posts: typeof Post[];
  userSubscribedTo: UserType[];
  subscribedToUser: UserType[];
}

export const User = new GraphQLObjectType<UserType, { prisma: PrismaClient }>({
    name: 'User',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
        profile: {
            type: Profile,
            resolve: async (parent, __, { prisma }) => {
                return prisma.profile.findUnique({ where: { userId: parent.id } });
            },
        },
        posts: {
            type: new GraphQLList(Post),
            resolve: async (parent, __, { prisma }) => {
                return prisma.post.findMany({ where: { authorId: parent.id } });
            },
        },
        userSubscribedTo: {
            type: new GraphQLList(User),
            resolve: async (parent, __, { prisma }) => {
                const sbs = await prisma.subscribersOnAuthors.findMany({
                    where: { subscriberId: parent.id },
                    include: { author: true },
                });
                return sbs.map((sb) => sb.author);
            },
        },
        subscribedToUser: {
            type: new GraphQLList(User),
            resolve: async (parent, __, { prisma }) => {
                const sbs = await prisma.subscribersOnAuthors.findMany({
                    where: { authorId: parent.id },
                    include: { subscriber: true },
                });
                return sbs.map((sb) => sb.subscriber);
            },
        },
    }),
  });