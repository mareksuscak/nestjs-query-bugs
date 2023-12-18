/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./broker/dto/broker.dto"), { "BrokerDto": { _id: { required: true, type: () => require("mongoose").Types.ObjectId }, id: { required: true, type: () => String }, email: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String } } }], [import("./broker/dto/broker-create.dto"), { "CreateBrokerDto": { email: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String } } }], [import("./broker/dto/broker-update.dto"), { "UpdateBrokerDto": {} }]], "controllers": [] }, "@nestjs/graphql": { "models": [] } };
};