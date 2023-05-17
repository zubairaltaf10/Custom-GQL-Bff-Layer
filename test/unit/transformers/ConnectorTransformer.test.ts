import { ConnectorTransformer } from '../../../src/transformers/index';
import { ConnectorType } from '../../../src/types/schema';

describe('TransformConnectors', () => {
  test('should return transformed connector', () => {
    const connector = {
      id: 'connector_123123123',
      name: 'Service Titan Connector',
      description: 'Service Titan Connector Description',
      configured: false,
      type: ConnectorType.Commercial,
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAyCAYAAAAEA2g/AAAFS0lEQVR42u1aa4hWRRie/fZLjTQ2sSTNH2pmFpuUYYmVlxDXMLGLUZgSVn8qwmijUlxTkvKyaqnkpWiX',
    };

    const transformedConnectors = ConnectorTransformer(connector as never);
    expect(transformedConnectors).toHaveProperty('id', connector.id);
    expect(transformedConnectors).toHaveProperty('name', connector.name);
    expect(transformedConnectors).toHaveProperty(
      'description',
      connector.description,
    );
    expect(transformedConnectors).toHaveProperty(
      'configured',
      connector.configured,
    );
    expect(transformedConnectors).toHaveProperty('type', connector.type);
    expect(transformedConnectors).toHaveProperty('logo', connector.logo);
  });
});
