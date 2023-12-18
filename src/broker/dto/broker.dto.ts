import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  ObjectId,
  PagingStrategies,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import mongoose from 'mongoose';

@ObjectType('Broker')
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
})
export class BrokerDto {
  @ObjectId()
  _id: mongoose.Types.ObjectId;

  @IDField(() => ID)
  id!: string;

  @Field()
  email: string;

  @FilterableField()
  firstName: string;

  @FilterableField()
  lastName: string;
}
