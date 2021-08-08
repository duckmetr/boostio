import React, { useEffect } from 'react'
import { ToastAndroid } from 'react-native'
import { useStoreon } from 'storeon/react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import * as api from '../../api'

import Coins from '../../components/Coins'
import OrdersList from './components/OrdersList'
import NewOrder from './NewOrder'

const Stack = createStackNavigator()

function Orders() {
  const { dispatch, orders, profile } = useStoreon('orders', 'profile')
  const { username } = profile

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    console.log('FETCH ORDERS', username)
    if (!orders.length && username !== 'username') {
      try {
        const res = await api.fetchOrders({ username })
        dispatch('orders/update', res.data.orders)
      } catch (error) {
        console.error(error)
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
    }
  }

  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Orders"
        component={OrdersList}
        options={{headerRight: () => <Coins />}}
      />
      <Stack.Screen
        name="NewOrder"
        component={NewOrder}
        options={{
          title: 'New order',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  )
}

export default Orders