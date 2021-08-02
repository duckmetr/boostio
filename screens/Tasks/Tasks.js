import React, { useEffect } from 'react'
import { useStoreon } from 'storeon/react'
import { createStackNavigator } from '@react-navigation/stack'

import TasksList from './components/TasksList'
import Coins from '../../components/Coins'

const Stack = createStackNavigator()

function Tasks() {
  const { dispatch, tasks } = useStoreon('tasks')

  useEffect(() => {
    fetchTasks()
  }, [])

  function fetchTasks() {
    tasks.length || dispatch('tasks/fetch-all')
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
