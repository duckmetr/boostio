import React, { useEffect } from 'react'
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { useStoreon } from 'storeon/react'

import { TrashIcon, HeartIcon, DotsIcon } from '../../../assets/icons'
import EmptyTasksList from './EmptyTasksList'

import * as api from '../../../api'

function TasksList() {
  const { dispatch, tasks, profile } = useStoreon('tasks', 'profile')
  const { username, instapi } = profile

  async function fetchLike({mediaId, username}) {
    try {
      dispatch('tasks/like', mediaId)
      await instapi.like({ mediaId })
      await api.likeTask({mediaId, username})
    } catch (error) {
      console.log(error)
      ToastAndroid.show(error.message, ToastAndroid.SHORT)
    }
  }

  function handleLike(mediaId) {
    fetchLike({mediaId, username})
  }
  
  // function handleDelete(mediaId) {
  //   dispatch('tasks/fetch-delete', id)
  // }

  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        {/* <View style={styles.header}>
          <TouchableOpacity>
          <DotsIcon />
          </TouchableOpacity>
        </View> */}
        <View style={styles.logo} >
          <Image
            resizeMode='contain'
            style={styles.logoimg}
            source={{uri: item.displayUrl}}
          />
        </View>
        <View style={styles.buttons}>
          <Text style={styles.name}>@{item.username}</Text>
          {/* <TouchableOpacity onPress={() => handleDelete(item.id)} >
            <TrashIcon style={styles.icon} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => handleLike(item.mediaId)} >
            <HeartIcon style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container} >
      <FlatList
        data={tasks}
        numColumns='1'
        renderItem={renderItem}
        keyExtractor={item => item.mediaId}
        ListEmptyComponent={EmptyTasksList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    height: 300,
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
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    color: '#000',
    fontSize: 16,
    padding: 10
  },
  logo: {
    flex: 4,
    padding: 15,
  },
  logoimg: {
    flex: 1
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default TasksList
