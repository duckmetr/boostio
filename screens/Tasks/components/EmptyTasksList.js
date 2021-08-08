import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
// import { useStoreon } from 'storeon/react'

import { CheckCircleOutlineIcon } from '../../../assets/icons'

function EmptyTasksList() {
  // const { dispatch } = useStoreon('tasks')

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <CheckCircleOutlineIcon size={42} color="#bbb" />
        <Text style={styles.empty}>all tasks completed</Text>
        {/* <Button style={styles.button} title="update" onPress={fetchTasks} /> */}
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    marginTop: '60%',
    alignItems: 'center'
  },
  button: {
    width: 200
  },
  empty: {
    textAlign: 'center',
    marginVertical: 25,
    color: "#bbb"
  }
})

export default EmptyTasksList