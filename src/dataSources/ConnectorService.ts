import { RESTDataSource } from '@apollo/datasource-rest';
import { ListResponse } from '../lib/ListResponse';
import { Connector } from '../types/schema';

export default class ConnectorService extends RESTDataSource {
  override baseURL = process.env.WC_CONNECTOR_SERVICE_URI;

  /**
   *
   */
  constructor() {
    super();
  }

  public async getConnectors(
    clientId: string,
  ): Promise<ListResponse<Connector> | void> {
    // TODO: Make call to API
    const connectors = await this.get<ListResponse<Connector>>(
      `users/${clientId}/connectors?page=1&pageSize=50`,
      {
        signal: AbortSignal.timeout(12000),
      },
    );
    return connectors;
  }
}
