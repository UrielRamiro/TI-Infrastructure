import { SqlLog, SqlRepositoryMethod } from "../arch/sql-method"
import { pgInfra } from "./databases"
import { PgHelper } from "./pg-helper"
import { IPgHelper } from "./pg-interfaces"

type logs = {
    path: string
    route: string
    data: any
}

export async function InserLogs(params: logs) {

    const values = {
        path: params.path,
        route: params.route,
        data: params.data
    }

    const aux = new GetIds(pgInfra)

    const result2 = await aux.execute(values)
}


export class GetIds extends SqlRepositoryMethod<any>{
    constructor(pgHelper: IPgHelper) {
        super(pgHelper, __filename)
    }

    async execute(params: logs): Promise<any> {
        const text = `insert into logs (path, route, data, timeStamp) values ($path, $route, $data, now())`
        const values = {}
        const result = await this.query({ text, values }, SqlLog.All)

        return result
    }
}