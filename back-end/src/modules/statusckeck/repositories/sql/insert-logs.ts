import { SqlLog, SqlRepositoryMethod } from "../../../../util/arch/sql-method";
import { IPgHelper } from "../../../../util/sql/pg-interfaces";
import { ILogs } from "../../api/definitions/repositories";


export class InsertLogs extends SqlRepositoryMethod<ILogs> {
    constructor(pgHelper: IPgHelper) {
        super(pgHelper, __filename)
    }

    async execute(params: any): Promise<any> {
        const text = `insert into logs (path, route, data, "timeStamp") values ($path, $route, $data, now())`
        const values = {
            path: params.path,
            route: params.route,
            data: JSON.stringify(params.data)
        }
        const result = await this.query({ text, values }, SqlLog.All)

        return result
    }
}