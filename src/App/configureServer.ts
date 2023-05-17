/* eslint-disable @typescript-eslint/no-explicit-any */
import http from 'http';

import { ApolloServer } from '@apollo/server';
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

import { ConnectorService } from '../dataSources';
import { internalServerError, notFound } from '../lib/middleware';
import { logInternalServerError } from '../middleware';
import schema from '../schema';
import App from './';
import { RootController } from '../Controller';
import winston from 'winston';
import { expressMiddleware } from '@apollo/server/express4';
const { EXPRESS_DEBUG } = process.env;
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServerPlugin, BaseContext } from '@apollo/server';
import type { DataSource } from 'apollo-datasource';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
export default async function (app: App): Promise<void> {
  app.express = express();
  app.server = http.createServer(app.express);
  app.apollo = buildApolloServer(app.server);

  app.express.use(bodyParser.json());

  /* istanbul ignore next */
  if (EXPRESS_DEBUG === 'true') {
    app.express.use(morgan('combined', { stream: { write: winston.debug } }));
  }

  await app.apollo.start();

  const port = Number(process.env.PORT);
  app.express.set('port', port);
  app.server.listen(port);

  app.server.keepAliveTimeout = Number(process.env.KEEP_ALIVE_TIMEOUT_MS);
  app.server.headersTimeout = Number(process.env.HEADERS_TIMEOUT_MS);

  // Health check endpoint
  app.express.use('/', new RootController().router);
  app.express.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(app.apollo, {
      context: async ({ req }) => ({
        clientId: req.headers['clientid'],
      }),
    }),
  );

  app.express.use(notFound);
  app.express.use(logInternalServerError, internalServerError);
}

type DataSources = Record<string, DataSource>;
type DataSourcesFn = () => DataSources;

interface ContextWithDataSources extends BaseContext {
  dataSources?: DataSources;
}

export const ApolloDataSources = (options: {
  dataSources: DataSourcesFn;
}): ApolloServerPlugin<ContextWithDataSources> => ({
  requestDidStart: async (requestContext) => {
    const dataSources = options.dataSources();
    const initializers = Object.values(dataSources).map(async (dataSource) => {
      if (dataSource.initialize)
        dataSource.initialize({
          cache: requestContext.cache,
          context: requestContext.contextValue,
        });
    });

    await Promise.all(initializers);

    requestContext.contextValue.dataSources = dataSources;
  },
});

function buildApolloServer(server: any): ApolloServer {
  return new ApolloServer({
    plugins: [
      ApolloDataSources({
        dataSources: (): any => {
          return {
            connectorService: new ConnectorService(),
          };
        },
      }),
      ApolloServerPluginDrainHttpServer({ httpServer: server }),
    ],
    schema,
  });
}
