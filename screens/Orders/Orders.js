import React from 'react'
import {} from 'react-native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import Coins from '../../components/Coins'
import OrdersList from './components/OrdersList'
import NewOrder from './NewOrder'

const Stack = createStackNavigator()

function Campaign() {
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

export default Campaign