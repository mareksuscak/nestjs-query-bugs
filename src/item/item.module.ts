import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';

import { ItemDto } from './dto/item.dto';
import { ItemService } from './item.service';
import { Item, ItemSchema } from './item.model';
import { CreateItemInput } from './dto/item-create.dto';
import { UpdateItemInput } from './dto/item-update.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryMongooseModule.forFeature([{ document: Item, name: Item.name, schema: ItemSchema }])],

      dtos: [{ DTOClass: ItemDto }],
      services: [ItemService],
      resolvers: [
        {
          DTOClass: ItemDto,
          CreateDTOClass: CreateItemInput,
          UpdateDTOClass: UpdateItemInput,
          EntityClass: Item,
          ServiceClass: ItemService,
          enableTotalCount: true,
          enableAggregate: true,
        },
      ],
    }),
  ],
})
export class ItemModule {}
