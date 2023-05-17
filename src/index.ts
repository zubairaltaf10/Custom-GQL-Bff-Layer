import { config as dotenvCraConfig } from 'dotenv-cra';

import { getEnv } from './utils/getEnv';

async function init(): Promise<void> {
  // Load the appropriate config into process.env before anything else
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  dotenvCraConfig({ env: getEnv() });
  //   loadPackageEnv();

  /**
   * Manually import App after our config is loaded so that the tree of modules
   * that get instantiated (starting with App's imports) can assume process.env
   * is ready for them.
   */
  const App = (await import('./App')).default;
  const app = new App();

  try {
    await app.start();
  } catch (err) {
    console.log(err);
    app.exitWithError('Error during start()', err);
  }
}

/* istanbul ignore next */
export default init().catch((err) => {
  console.log(err);
  process.exit(1);
});
