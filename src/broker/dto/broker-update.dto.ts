import { InputType, PartialType } from '@nestjs/graphql';

import { CreateBrokerDto } from './broker-create.dto';

@InputType('UpdateBroker')
export class UpdateBrokerDto extends PartialType(CreateBrokerDto) {}
