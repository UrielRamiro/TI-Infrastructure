export interface GetIdsParams { id:number}

export interface IGetIds {
    execute(params: GetIdsParams): Promise<any>
}

export interface IPostgresRepository {
    get: IGetIds['execute']
}