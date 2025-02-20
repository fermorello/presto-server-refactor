import { EntityTarget, Repository, ObjectLiteral } from 'typeorm';
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

export class BaseService<T extends BaseEntity> extends ConfigServer {
    public execRepository: Promise<Repository<T>>;
    
    constructor(private getEntity: EntityTarget<T>) {
        super();
        this.execRepository = this.initRepository(getEntity)
    }

    async initRepository<T extends ObjectLiteral>(e: EntityTarget<T>): Promise<Repository<T>> {
        const getConn = await this.initConnect;
        return getConn.getRepository(e);
      }
}