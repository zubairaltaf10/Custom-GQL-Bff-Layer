import { ConnectorTransformer } from '../../transformers';
import { GraphQlContext } from '../../types';
import { ConnectorsResponse, QueryResolvers } from '../../types/schema';

const connectors: QueryResolvers['connectors'] = async (
  _: object,
  { limit, offset },
  context: GraphQlContext,
): Promise<ConnectorsResponse> => {
  try {
    const { connectorService } = context.dataSources;
    if (!context.clientId) {
      throw new Error('You are not authorized to perform this action');
    }

    const connectors = await connectorService.getConnectors(context.clientId);
    const totalCount = connectors?.totalCount || 0;
    const items = connectors?.data.map((conector) =>
      ConnectorTransformer(conector),
    );
    return {
      limit,
      offset,
      totalCount,
      items,
    };
  } catch (e) {
    throw e;
  }
};

export default {
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  Query: {
    connectors,
  },
};
