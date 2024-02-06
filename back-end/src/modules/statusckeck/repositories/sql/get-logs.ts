import { SqlLog, SqlRepositoryMethod } from "../../../../util/arch/sql-method";
import { IPgHelper } from "../../../../util/sql/pg-interfaces";
import { GetLogsParams, IGetLogs, ILogs, LogsParams } from "../../api/definitions/repositories";


export class GetLogs extends SqlRepositoryMethod<IGetLogs> {
    constructor(pgHelper: IPgHelper) {
        super(pgHelper, __filename)
    }

    async execute(params: GetLogsParams): Promise<any> {
        const limit = params.limit
        const text = `SELECT * FROM logs ORDER BY "timeStamp" DESC LIMIT $limit`
        const values = { limit }
        const result = await this.query({ text, values }, SqlLog.All)

        return result
    }
}