import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLNonNull } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from './memberTypes.js';
import { PrismaClient } from '@prisma/client';

export type Ctx = {
    prisma: PrismaClient;
}

export const Profile = new GraphQLObjectType({
    name: 'Profile',
    fields: {
        id: { type: new GraphQLNonNull(UUIDType) },
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberType: { type: new GraphQLNonNull(MemberType), resolve: async (pr: { memberTypeId: string }, __, ctx: Ctx) => ctx.prisma.memberType.findUnique({ where: { id: pr.memberTypeId } })  },
    },
});