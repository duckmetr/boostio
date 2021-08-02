import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5'

import Coins from '../../components/Coins'

const Stack = createStackNavigator()

const goods = [
  {id: '455348', name: 100, prize: 49.99},
  {id: '267604', name: 250, prize: 89.99},
  {id: '667719', name: 500, prize: 159.99},
  {id: '885674', name: 1000, prize: 269.99},
  {id: '904787', name: 2500, prize: 599.99},
  {id: '903453', name: 5000, prize: 799.99},
  {id: '904090', name: 10000, prize: 1199.99}
]

function Shop() {
  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.horizontal}>
          <View style={styles.horizontal}>
            <FontAwesome5Icons
              name="coins"
              color="#ffa532"
              size={16}
            />
            <Text style={styles.name}>{item.name} coins</Text>
          </View>
          <Button title={`${item.prize} грн`} />
        </View>
      </View>
    )
  }

  function Shop() {
    return (
      <View>
        <FlatList
          data={goods}
          numColumns='1'
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // ListEmptyComponent={EmptyTasksList}
        />
      </View>
    )
  }

  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={{headerRight: () => <Coins />}}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    // height: 300,
    padding: 15,
    justifyContent: 'space-between',
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    marginLeft: 10
  }
})

export default Shop
