import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useStoreon } from 'storeon/react'

function Infobar() {
  const { profile, orders } = useStoreon('profile', 'orders')

  return (
    <View>
      <View style={styles.infobar}>
        <View style={styles.infobarItem}>
          <Text style={styles.infobarItemCount}>{profile.posts}</Text>
          <Text style={styles.infobarItemName}>posts</Text>
        </View>
        <View style={styles.infobarItem}>
          <Text style={styles.infobarItemCount}>{profile.followers}</Text>
          <Text style={styles.infobarItemName}>followers</Text>
        </View>
        <View style={styles.infobarItem}>
          <Text style={styles.infobarItemCount}>{profile.following}</Text>
          <Text style={styles.infobarItemName}>following</Text>
        </View>
      </View>

      <View style={styles.infobar}>
        <View style={styles.infobarItem}>
          <Text style={styles.infobarItemCount}>{profile.coins}</Text>
          <Text style={styles.infobarItemName}>coins</Text>
        </View>
        <View style={styles.infobarItem}>
          <Text style={styles.infobarItemCount}>{orders.length}</Text>
          <Text style={styles.infobarItemName}>orders</Text>
        </View>
        <View style={styles.infobarItem}>
          <Text style={styles.infobarItemCount}>∞</Text>
          <Text style={styles.infobarItemName}>likes</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infobar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  infobarItem: {
    flexBasis: '25%',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  infobarItemCount: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  infobarItemName: {
    textAlign: 'center',
    color: '#555'
  }
})

export default Infobar
