import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { BrokerModule } from './broker/broker.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://app:app@localhost:27017/app'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    BrokerModule,
  ],
})
export class AppModule {}
