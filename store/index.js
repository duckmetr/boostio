import { createStoreon } from 'storeon'

import { tasks } from './tasks'
import { orders } from './orders'
import { profile } from './profile'

export const store = createStoreon([tasks, orders, profile])
