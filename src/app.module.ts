import { Logger, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import ms from 'ms';

import { ItemModule } from './item/item.module';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const logger = new Logger('MongooseModule');
        return {
          uri: 'mongodb://app:app@localhost:27017/app?directConnection=true&authSource=admin',

          connectTimeoutMS: ms('10s'),
          socketTimeoutMS: ms('120s'),
          serverSelectionTimeoutMS: ms('10s'),
          retryAttempts: 3,

          // Connection factory is used to instantiate connections and allows us
          // to set up hooks that are useful for pretty printing the queries
          // which in turn gives us better visibility.
          connectionFactory: (connection: Connection) => {
            connection.set(
              'debug',
              (
                collection: string,
                method: string,
                args: Record<string, unknown>,
              ) => {
                logger.debug(
                  `${collection}.${method}(${JSON.stringify(args)})`,
                );
              },
            );

            return connection;
          },
        };
      },
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),

    NestjsQueryGraphQLModule.forRoot({
      dataLoader: {
        batchScheduleFn: (callback: () => void) => {
          return setTimeout(callback, 250);
        },
      },
    }),

    ItemModule,
  ],
})
export class AppModule {}
