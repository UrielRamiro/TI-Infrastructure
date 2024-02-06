import * as R from '../../repositories'
import { pgInfra } from '../../../../util/sql/databases'
import { PgHelper } from '../../../../util/sql/pg-helper'

export const makeStart = (pgGeniousParam: PgHelper) =>
  new R.StartTransaction(pgGeniousParam)

export const makeCommit = (pgGeniousParam: PgHelper) =>
  new R.CommitTransaction(pgGeniousParam)

export const makeRollbacl = (pgGeniousParam: PgHelper) =>
  new R.RollbackTransaction(pgGeniousParam)

export const makeExecute = (pgGeniousParam: PgHelper) =>
  new R.Transaction(pgGeniousParam)

export const makePgTransactionServices = (pgGeniousParam: PgHelper) =>
  new R.PgTransactionService(
    makeStart(pgGeniousParam),
    makeCommit(pgGeniousParam),
    makeRollbacl(pgGeniousParam),
    makeExecute(pgGeniousParam)
  )
