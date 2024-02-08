import { InputType, OmitType } from '@nestjs/graphql';

import { CreateItemInput } from './item-create.dto';

@InputType('UpdateItemInput')
export class UpdateItemInput extends OmitType(CreateItemInput, ['name']) {}
