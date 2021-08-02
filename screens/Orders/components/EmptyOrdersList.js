import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { StickerRemoveOutlineIcon } from '../../../assets/icons'

function EmptyOrdersList() {
  return (
    <View style={styles.card}>
      <StickerRemoveOutlineIcon size={42} color="#bbb" />
      <Text style={styles.empty}>no orders yet</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60%'
  },
  empty: {
    textAlign: 'center',
    marginVertical: 25,
    color: "#bbb"
  }
})

export default EmptyOrdersList