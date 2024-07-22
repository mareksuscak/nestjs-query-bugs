import { ID, ObjectType } from '@nestjs/graphql';
import {
  CursorConnection,
  FilterableField,
  IDField,
  ObjectId,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import mongoose from 'mongoose';

@ObjectType('Item')
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
})
@CursorConnection('subItems', () => ItemDto, {
  pagingStrategy: PagingStrategies.NONE,
})
@CursorConnection('subItemsPaged', () => ItemDto, {
  pagingStrategy: PagingStrategies.OFFSET,
})
@Relation('parent', () => ItemDto, { nullable: true })
export class ItemDto {
  @ObjectId()
  _id: mongoose.Types.ObjectId;

  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name: string;
}
