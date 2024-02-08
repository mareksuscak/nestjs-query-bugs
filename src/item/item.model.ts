import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types, type HydratedDocument } from 'mongoose';
import MongooseDelete, {
  type SoftDeleteInterface,
  type SoftDeleteDocument,
  type SoftDeleteModel,
} from 'mongoose-delete';

// Guide
// https://mongoosejs.com/docs/typescript/schemas.html
// https://mongoosejs.com/docs/typescript/statics-and-methods.html

// Interfaces
export type ItemDocument = HydratedDocument<Item> & SoftDeleteDocument;
export type ItemModel = SoftDeleteModel<ItemDocument>;

// Schema
@Schema()
export class Item extends Document<SoftDeleteInterface> {
  @Prop({ required: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Item' })
  parent?: Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

// Plugins
ItemSchema.plugin(MongooseDelete, {
  indexFields: ['deleted'],
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

// Indices
ItemSchema.index({ parent: 1 });

// Virtuals
ItemSchema.virtual('subItems', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'parent',
});
