import 'reflect-metadata';
import express, { Response, Request } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ConfigServer, PORT } from './config/config';

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = Number(PORT);

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(cors());

    this.dbConnect();

    this.listen();
  }

  public routers(): Array<express.Router> {
    return [];
  }

  public async dbConnect(): Promise<void> {
    try {
      await this.initConnect;
      console.log('Data Source has been initialized!');
    } catch (err) {
      console.error('Error during Data Source initialization', err);
    }
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('Server listening on port => ' + this.port);
    });
  }
}

new ServerBootstrap();
