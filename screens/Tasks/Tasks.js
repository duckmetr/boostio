import React, { useEffect } from 'react'
import { ToastAndroid } from 'react-native'
import { useStoreon } from 'storeon/react'
import { createStackNavigator } from '@react-navigation/stack'

import TasksList from './components/TasksList'
import Coins from '../../components/Coins'

import * as api from '../../api'

const Stack = createStackNavigator()

function Tasks() {
  const { dispatch, tasks, profile } = useStoreon('tasks', 'profile')
  const { username } = profile

  useEffect(() => {
    fetchTasks()
  }, [username])

  async function fetchTasks() {
    if (!tasks.length && username !== 'username') {
      try {
        console.log('FETCH TASKS:', username)

        const res = await api.fetchTasks({username})
        dispatch('tasks/update', res.data.tasks)
  
        console.log(res.data)
      } catch (error) {
        console.log(error)
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
    }
  }

  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Tasks"
        component={TasksList}
        options={{headerRight: () => <Coins />}}
      />
    </Stack.Navigator>
  )
}

export default Tasks
