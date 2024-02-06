import * as R from '../api/definitions/repositories'

export class IPostgresRepository implements R.IPostgresRepository {
    constructor(
        private readonly getIds: R.IGetIds
    ) {}

    async get (params: R.GetIdsParams){
        return this.getIds.execute(params)
    }
}