import fetchMock from 'fetch-mock';
import { Connector, ConnectorType } from '../../../src/types/schema';
import { ListResponse } from '../../../src/lib/ListResponse';
import { ConnectorService } from '../../../src/dataSources';

const mockedResult: ListResponse<Connector> = {
  totalCount: 1,
  data: [
    {
      description: 'My Connector Description',
      id: 'connector_123123123',
      configured: false,
      name: 'My Connector',
      type: ConnectorType.Commercial,
    },
  ],
};

describe('ConnectorService', () => {
  test('should fetch connectors from the API', async () => {
    const spy = jest
      .spyOn(ConnectorService.prototype, 'getConnectors')
      .mockResolvedValueOnce(mockedResult);
    const service = new ConnectorService();
    const connectors = await service.getConnectors('10');

    expect(connectors?.data).toHaveLength(1);
    expect(connectors).toEqual(mockedResult);
    expect(connectors?.totalCount).toEqual(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    fetchMock.restore();
  });
});
