import { GraphQLEnumType, GraphQLInt, GraphQLFloat, GraphQLObjectType } from 'graphql';

const memberCfg = {
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
};

export const MemberTypeIdEnum = new GraphQLEnumType(memberCfg);

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: MemberTypeIdEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});
