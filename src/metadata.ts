/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./item/dto/item.dto"), { "ItemDto": { _id: { required: true, type: () => require("mongoose").Types.ObjectId }, id: { required: true, type: () => String }, name: { required: true, type: () => String } } }], [import("./item/dto/item-create.dto"), { "CreateItemDto": { name: { required: true, type: () => String } }, "CreateItemInput": { name: { required: true, type: () => String }, parent: { required: false, type: () => String } } }], [import("./item/dto/item-update.dto"), { "UpdateItemDto": {}, "UpdateItemInput": {} }]], "controllers": [] }, "@nestjs/graphql": { "models": [] } };
};