import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useStoreon } from 'storeon/react'

import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5'

function Coins() {
  const { profile } = useStoreon('profile')

  return (
    <View style={styles.coins}>
      <FontAwesome5Icons
        name="coins"
        color="#ffa532"
        size={16}
      />
      <Text style={styles.text}>{profile.coins}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  coins: {
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  text: {
    marginLeft: 5,
    marginRight: 10,
    color: '#222'
  }
})

export default Coins
