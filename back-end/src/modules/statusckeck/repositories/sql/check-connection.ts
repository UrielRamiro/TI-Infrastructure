
import e from "express";
import { SqlLog, SqlRepositoryMethod } from "../../../../util/arch/sql-method";
import { IPgHelper } from "../../../../util/sql/pg-interfaces";


export class CheckDatabaseStatus extends SqlRepositoryMethod<any> {
    constructor(pgHelper: IPgHelper) {
        super(pgHelper, __filename)
    }

    async execute(): Promise<any> {
        try {
            const pgClient = await this.pgHelper.connectClient()
            this.log.debug('Client', pgClient)
            if (pgClient) return true
            else false
        } catch (e) {
            console.log(e)
            return false
        }

    }
}