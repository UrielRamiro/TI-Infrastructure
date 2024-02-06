
import { SqlLog, SqlRepositoryMethod } from "../../../../util/arch/sql-method";
import { IPgHelper } from "../../../../util/sql/pg-interfaces";
import { GetIdsParams, IGetIds } from "../../api/definitions/repositories";


export class GetIds extends SqlRepositoryMethod<IGetIds>{
    constructor(pgHelper: IPgHelper) {
        super(pgHelper, __filename)
    }
    async execute(params: GetIdsParams): Promise<any> {
        const text = 'create table logs ("path" varchar(256), "route" varchar(256), "data" varchar(256), "timeStamp" timestamp)'
        const values = {}
        const result = await this.query({ text, values }, SqlLog.All)

        return result
    }
}