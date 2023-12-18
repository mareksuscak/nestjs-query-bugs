import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';

import { BrokerDto } from './dto/broker.dto';
import { BrokerService } from './broker.service';
import { Broker, BrokerSchema } from './broker.model';
import { CreateBrokerDto } from './dto/broker-create.dto';
import { UpdateBrokerDto } from './dto/broker-update.dto';
// import { BrokerResolver } from './broker.resolver';

@Module({
  // providers: [BrokerResolver],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          { document: Broker, name: Broker.name, schema: BrokerSchema },
        ]),
      ],

      dtos: [{ DTOClass: BrokerDto }],
      services: [BrokerService],
      resolvers: [
        {
          DTOClass: BrokerDto,
          CreateDTOClass: CreateBrokerDto,
          UpdateDTOClass: UpdateBrokerDto,
          EntityClass: Broker,
          ServiceClass: BrokerService,
          enableTotalCount: true,
          enableAggregate: true,
        },
      ],
    }),
  ],
})
export class BrokerModule {}
