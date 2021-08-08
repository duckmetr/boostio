import React, { useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useStoreon } from 'storeon/react'
import ActionButton from '@logvinme/react-native-action-button'

import { TrashIcon  } from '../../../assets/icons'

import EmptyOrdersList from './EmptyOrdersList'

function OrdersList() {
  const { dispatch, orders } = useStoreon('orders')
  const navigation = useNavigation()

  // useEffect(() => {
  //   fetchOrders()
  // }, [])
  
  function handleDelete() {
    console.log('delete')
  }

  // function fetchOrders() {
  //   dispatch('orders/fetch-all')
  // }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.r} >
          <View style={styles.l} >
            <Image style={styles.m} source={{uri: item.displayUrl}} />
          </View>
          <View>
            <Text>{item.whoLiked.length} / {item.likes} likes</Text>
          </View>
        </View>
        <View>
          <TrashIcon onDelete={handleDelete} id={item.mediaId} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container} >
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.mediaId}
        ListEmptyComponent={EmptyOrdersList}
      />
      <ActionButton
        buttonColor="#318dfe"
        onPress={() => navigation.navigate('NewOrder')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  newOrderBtn: {
    marginVertical: 10
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
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
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderColor: '#7760B4'
  },
  r: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  l: {
    marginRight: 10,
    width: 75,
    height: 75
  },
  m: {
    height: '100%',
    borderRadius: 10
  }
})

export default OrdersList
