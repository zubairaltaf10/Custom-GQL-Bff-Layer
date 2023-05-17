import { Connector, ConnectorType } from '../types/schema';

export const transform = (connector: Connector): Connector => {
  return {
    id: connector?.id,
    name: connector?.name,
    description: connector?.description,
    configured: connector?.configured,
    type: connector?.type?.toUpperCase() as ConnectorType,
    logo: connector?.logo,
  };
};
