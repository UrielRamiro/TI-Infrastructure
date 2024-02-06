import * as R from '../../repositories'
import { pgInfra } from '../../../../util/sql/databases'


export const makeGetIds = () => new R.GetIds(pgInfra)



export const makePostgresRepository =() =>
    new R.IPostgresRepository (
        makeGetIds()
    )
