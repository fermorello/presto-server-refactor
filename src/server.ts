import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

class ServerBootstrap {
  public app: express.Application = express();

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.listen();
  }

  public listen(): void {
    this.app.listen(3000, () => {
      console.log('Server listening on port => ' + 3000);
    });
  }

}

new ServerBootstrap();
