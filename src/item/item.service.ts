import { Logger } from '@nestjs/common';
import type { DeepPartial, Filter, Query } from '@ptc-org/nestjs-query-core';
import { QueryService } from '@ptc-org/nestjs-query-core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseQueryService } from '@ptc-org/nestjs-query-mongoose';
import { Item } from './item.model';

@QueryService(Item)
export class ItemService extends MongooseQueryService<Item> {
  private readonly logger = new Logger(ItemService.name);

  constructor(@InjectModel(Item.name) model: Model<Item>) {
    super(model);
  }
}
