import { Logger, Module } from '@nestjs/common';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { GraphQLModule } from '@nestjs/graphql';
import { InjectModel, MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import ms from 'ms';

import { ItemModule } from './item/item.module';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { Item, ItemModel, ItemSchema } from './item/item.model';

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
            connection.set('debug', (collection: string, method: string, args: Record<string, unknown>) => {
              logger.debug(`${collection}.${method}(${JSON.stringify(args)})`);
            });

            return connection;
          },
        };
      },
    }),

    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])],
      inject: [getModelToken(Item.name)],
      useFactory: (itemModel: ItemModel) => {
        // const logger = new Logger('MercuriusGraphQLModule');
        return {
          autoSchemaFile: 'schema.gql',
          ide: 'graphiql',
          queryDepth: 11,
          cache: true,
          jit: 1,

          // Examples:
          // https://dev.to/tugascript/how-to-solve-the-graphql-n1-problem-in-nestjs-with-dataloaders-and-mikroorm-for-both-apollo-and-mercurius-3klk
          loaders: {
            Item: {
              subItems: {
                async loader(queries) {
                  const allItems = queries.map(({ obj }) => obj);
                  const allSubItems = await itemModel.find({
                    parent: { $in: allItems.map((si) => si.parent).filter((si) => !!si) },
                  });

                  const resp = allItems.map((i) => {
                    return {
                      edges: allSubItems
                        .filter((si) => {
                          return si.parent.equals(i._id);
                        })
                        .map((si) => ({ node: si })),
                    };
                  });

                  return resp;
                },
                opts: {
                  cache: false,
                },
              },
            },
          },
        };
      },
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
