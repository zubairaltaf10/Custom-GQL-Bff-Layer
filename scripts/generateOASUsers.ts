// Run 'generate-oas-users' to generate the latest OAS users from services listed in spec_descriptors.json
import * as path from 'path';

const shell = require('shelljs');
const specs = require('./spec_descriptors.json');

export interface SpecFile {
  service: string;
  url: string;
  serviceName: string;
  generatorName: string;
}

(async () => {
  let specFiles: Array<SpecFile> = specs['specs'];

  for (const specFile of specFiles) {
    const clientPath = path.normalize(
      path.join(__dirname + '/../src/lib/services/' + specFile.serviceName),
    );

    shell.exec(
      `npx @openapitools/openapi-generator-cli generate \
      -i ${specFile.url} \
      -g ${specFile.generatorName} \
      -o ${clientPath} \
      --additional-properties=supportsES6=true`,
    );
  }
})().catch((err) => {
  console.error(err);
});
