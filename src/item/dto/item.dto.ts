import { ID, ObjectType } from '@nestjs/graphql';
import {
  CursorConnection,
  FilterableField,
  IDField,
  ObjectId,
  PagingStrategies,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import mongoose from 'mongoose';

@ObjectType('Item')
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
})
@CursorConnection('subItems', () => ItemDto)
export class ItemDto {
  @ObjectId()
  _id: mongoose.Types.ObjectId;

  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name: string;
}
