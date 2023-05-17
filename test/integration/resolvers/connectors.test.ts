/* eslint-disable @typescript-eslint/no-use-before-define */
import { Server } from 'http';

import { Express } from 'express';
import { print } from 'graphql/language/printer';
import request from 'supertest';

import App from '../../../src/App';
import { ConnectorService } from '../../../src/dataSources';
import { ConnectorType, Connector } from '../../../src/types/schema';
import { ListResponse } from '../../../src/lib/ListResponse';
import { gql } from 'graphql-tag';

jest.mock('../../../src/lib/Process');

let app: App;
let express: Express | undefined;

const connectors: ListResponse<Connector> = {
  totalCount: 1,
  data: [
    {
      description: 'My Connector Description',
      id: 'connector_123123123',
      configured: false,
      name: 'My Connector',
      type: ConnectorType.Commercial,
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAyCAYAAAAEA2g/AAAFS0lEQVR42u1aa4hWRRie/fZLjTQ2sSTNH2pmFpuUYYmVlxDXMLGLUZgSVn8qwmijUlxTkvKyaqnkpWiX',
    },
  ],
};
describe('ConnectorResolver', () => {
  beforeAll(async () => {
    const listenSpy = jest
      .spyOn(Server.prototype, 'listen')
      .mockImplementation();
    app = new App();
    await app.start();
    express = app.express;
    listenSpy.mockRestore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await app.exitGracefully('SIGINT', 130);
  });

  test('should return connectors', async () => {
    const getConnectorsSpy = jest
      .spyOn(ConnectorService.prototype, 'getConnectors')
      .mockResolvedValue({
        data: connectors.data,
        totalCount: connectors.totalCount,
      });

    const res = await request(express)
      .post('/graphql')
      .set('content-type', 'application/json')
      .set('clientid', '10')
      .send({
        query: print(gql`
          query {
            connectors {
              items {
                description
                id
                configured
                name
                type
                logo
              }
              totalCount
            }
          }
        `),
      });

    const body = res.body;
    const data = body.data?.connectors;

    expect(getConnectorsSpy).toBeCalledTimes(1);
    expect(data).toHaveProperty('items');
    expect(data).toHaveProperty('totalCount', 1);
  });
});
