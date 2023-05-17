/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express';
import Controller from '../lib/Controller';

export default class RootController extends Controller {
  public async healthCheck(req: Request, res: Response): Promise<void> {
    res.status(200).send({
      app: process.env.PACKAGE_NAME,
      version: process.env.PACKAGE_VERSION,
      env: {
        node_env: process.env.NODE_ENV,
        se_env: process.env.SE_ENV || null,
      },
      log_level: process.env.LOG_LEVEL,
    });
  }

  protected setupRoutes(): void {
    this.router.get('/', this.healthCheck);
  }
}
