import { AsyncLocalStorage } from 'async_hooks'
import { AlsStore } from '../util/http/http'

export const als = new AsyncLocalStorage<AlsStore>()
