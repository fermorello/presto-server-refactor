import 'reflect-metadata';
import express, { Response, Request } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ConfigServer, PORT } from './config/config';
import { LoginStrategy } from './auth/strategies/login.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { UserRouter, CategoryRouter, ExpenseRouter, AuthRouter, UserCategoryRouter } from '.';
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
    this.passportUse();

    this.app.use('/api', this.routers());
    this.listen();
  }

  public routers(): Array<express.Router> {
    return [
      new UserRouter().router,
      new CategoryRouter().router,
      new ExpenseRouter().router,
      new AuthRouter().router,
      new UserCategoryRouter().router,
    ];
  }

  passportUse() {
    return [new LoginStrategy().use, new JwtStrategy().use];
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
