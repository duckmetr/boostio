import * as api from '../api'
import { ToastAndroid } from 'react-native'

export function orders(store) {
  store.on('@init', () => ({orders: []}))

  //fetch
  store.on('orders/fetch-all', async ({ profile }) => {

    console.log(profile.username)

    try {
      const res = await api.fetchOrders({username: profile.username})
      // console.log(res.data)
      store.dispatch('orders/update', res.data.orders)
    } catch (error) {
      console.error(error)
      ToastAndroid.show(error.message, ToastAndroid.SHORT)
    }
  })

  //local
  store.on('orders/update', ({ orders }, data) => {

    if (Array.isArray(data)) {
      return {orders: [...orders, ...data]}
    } else {
      return {orders: [...orders, data]}
    }
  })

  store.on('orders/create', ({ orders }, newOrder) => {
    return {orders: [...orders, newOrder]}
  })
}