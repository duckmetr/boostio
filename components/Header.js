import React from 'react'
import { StatusBar, View, Text, StyleSheet } from 'react-native'
// import { useSelector } from 'react-redux'

import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5'

function Header() {
  // const coinsCount = useSelector(state => state.main.coins)

  return (
    <View>
      {/* <StatusBar backgroundColor="#5c4a8c" /> */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.appName}>LikeHub</Text>
        <View style={styles.coins}>
          <FontAwesome5Icons
            name="coins"
            color="#ffa532"
            size={16}
          />
          <Text style={styles.text}>0</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
    // backgroundColor: '#7760B4',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: "#ddd",
    borderBottomWidth: 1
  },
  coins: {
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  text: {
    marginLeft: 5,
    color: '#222'
  },
  appName: {
    // fontFamily: 'serif'
    fontFamily: 'monospace'
  }
})

export default Header