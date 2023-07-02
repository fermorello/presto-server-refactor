import 'reflect-metadata';
import express, { Response, Request } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './config/config';

class ServerBootstrap {
  public app: express.Application = express();
  private port: number = Number(PORT);

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(cors());

    this.listen();
  }

  public routers(): Array<express.Router> {
    return [];
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('Server listening on port => ' + this.port);
    });
  }
}

new ServerBootstrap();
