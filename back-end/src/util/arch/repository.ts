export interface IRepositoryMethod<Params, Result> {
  execute(params: Params): Promise<Result>
}
