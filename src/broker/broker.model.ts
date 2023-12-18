import validator from 'validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type BrokerDocument = HydratedDocument<Broker>;

@Schema()
export class Broker extends MongooseDocument {
  @Prop({
    unique: true,
    trim: true,
    lowercase: true,
    validate: (v) => (!validator.isEmpty(v) ? validator.isEmail(v) : undefined),
  })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
}

export const BrokerSchema = SchemaFactory.createForClass(Broker);
