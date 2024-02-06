

export interface ICheckStatus {
    execute(): Promise<any>
}


export interface ICheckDatabaseStatus {
    execute(): Promise<any>
}

export interface LogsParams {
    path: string
    route: string
    data: any
}

export interface ILogs {
    execute(params: any): Promise<any>
}

export interface GetLogsParams {
    limit: number
}

export interface IGetLogs {
    execute(params: GetLogsParams): Promise<any>
}