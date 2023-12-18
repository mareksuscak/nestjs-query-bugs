import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { CRUDResolver } from '@ptc-org/nestjs-query-graphql';
import { Resolver } from '@nestjs/graphql';
import { Broker } from './broker.model';

import { BrokerDto } from './dto/broker.dto';
import { CreateBrokerDto } from './dto/broker-create.dto';
import { UpdateBrokerDto } from './dto/broker-update.dto';

@Resolver(() => BrokerDto)
export class BrokerResolver extends CRUDResolver(BrokerDto, {
  CreateDTOClass: CreateBrokerDto,
  UpdateDTOClass: UpdateBrokerDto,
  enableTotalCount: true,
  enableAggregate: true,
}) {
  constructor(@InjectQueryService(Broker) service: QueryService<BrokerDto>) {
    super(service);
  }
}
