import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

function FloatButton() {
  return (
    <TouchableOpacity style={styles.btn}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7760B4',
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  text: {
    color: '#fff'
  }
})

export default FloatButton