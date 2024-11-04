import { GraphQLEnumType, GraphQLInt, GraphQLFloat, GraphQLObjectType, GraphQLNonNull } from 'graphql';

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
    id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  },
});
