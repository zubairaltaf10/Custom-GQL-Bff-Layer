import { ConnectorService } from '../dataSources';

export default interface GraphQlContext {
  dataSources: {
    connectorService: ConnectorService;
  };
  clientId: string;
}
