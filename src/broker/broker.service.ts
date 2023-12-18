import { Logger } from '@nestjs/common';
import type { DeepPartial, Filter, Query } from '@ptc-org/nestjs-query-core';
import { QueryService } from '@ptc-org/nestjs-query-core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseQueryService } from '@ptc-org/nestjs-query-mongoose';
import { Broker } from './broker.model';

@QueryService(Broker)
export class BrokerService extends MongooseQueryService<Broker> {
  private readonly logger = new Logger(BrokerService.name);

  constructor(@InjectModel(Broker.name) model: Model<Broker>) {
    super(model);
  }

  // We can register custom methods here

  public async count(filter: Filter<Broker>): Promise<number> {
    return super.count(filter);
  }

  public async createOne(record: DeepPartial<Broker>): Promise<Broker> {
    return super.createOne(record);
  }

  query(query: Query<Broker>): Promise<Broker[]> {
    return super.query(query);
  }
}
