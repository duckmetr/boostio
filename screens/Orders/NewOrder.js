import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Modal, TouchableOpacity, Image } from 'react-native'
import { useStoreon } from 'storeon/react'
import { useNavigation } from '@react-navigation/native'

import ModalPosts from './components/ModalPosts'
import { AddPhotoIcon } from '../../assets/icons'

import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5'

function New() {
  const [likes, setLikes] = useState('1')
  const [modalVisible, setModalVisible] = useState(false)
  const [posts, setPosts] = useState([])

  const navigation = useNavigation()
  const { dispatch, profile } = useStoreon('profile')

  useEffect(() => {
    fetchPosts(profile.id)
  }, [])

  async function fetchPosts(id) {
    const res = await profile.client.getUserIdPhotos({id})
    setPosts(res.user.edge_owner_to_timeline_media.edges)
  }

  function createOrder() {
    const { mediaId, username, newurl } = profile
    const campaign = {id: mediaId, mediaId, username, displayUrl: newurl, likes, whoLiked: [], completed: false}

    dispatch('tasks/fetch-create', campaign)
    dispatch('orders/create', campaign)
    setLikes('1')

    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Posts</Text>
            <TouchableOpacity style={styles.hideModal} onPress={() => setModalVisible(false)} >
              <Text style={styles.hideModalText}>x</Text>
            </TouchableOpacity>
            <ModalPosts posts={posts} setModalVisible={setModalVisible} />
          </View>
        </View>
      </Modal>
      <View style={styles.card}>
        <TouchableOpacity style={styles.selectPost} onPress={() => {setModalVisible(true)}} >
          {
            profile.newurl ? <Image style={styles.logoImg} source={{uri: profile.newurl }} />
            : <AddPhotoIcon />
          }
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
          <Text>like count</Text>
          <TextInput
            style={styles.input}
            placeholder="30"
            value={likes}
            onChangeText={setLikes}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.coins}>
          <Text>amount  </Text>
          <FontAwesome5Icons
            name="coins"
            color="#ffa532"
            size={16}
          />
          <Text style={{marginBottom: 15}}> {likes * 2}</Text>
        </View>

        <Button
          color="#7760B4"
          title="create"
          onPress={createOrder}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  coins: {
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  logoImg: {
    flex: 1,
    borderRadius: 14,
    padding: 50
  },
  t: {
    color: '#888',
    textAlign: 'center'
  },
  selectPost: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hideModal: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ddd',
    position: 'absolute',
    right: 10,
    top: 10
  },
  hideModalText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'

  },
  newOrderBtn: {
    marginVertical: 10
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,

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
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: "white",
    width: '98%',
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#222'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})

export default New
