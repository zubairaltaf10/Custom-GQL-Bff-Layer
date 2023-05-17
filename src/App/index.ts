import { Server } from 'http';
import { ApolloServer } from '@apollo/server';
import { Express } from 'express';
import configureServer from './configureServer';
import Process from '../lib/Process';

export default class App extends Process {
  public apollo?: ApolloServer;
  public express?: Express;
  public server?: Server;

  public async start(): Promise<void> {
    // Call Process.start() first to setup process.on() handlers
    await super.start();

    // Start your app
    await configureServer(this);

    // const { NODE_ENV, PACKAGE_NAME, PACKAGE_VERSION } = process.env;
  }

  public async exitGracefully(
    signal: NodeJS.Signals,
    code: number,
  ): Promise<void> {
    // Stop your app
    await this.apollo?.stop();
    this.server?.close();

    // Call Process.exitGracefully() last to facilitate process.exit()
    await super.exitGracefully(signal, code);
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public exitWithError(message: string, error?: any): void {
    // Log the error
    // Call Process.exitWithError() last to facilitate process.exit()
    super.exitWithError(message, error);
  }
}
