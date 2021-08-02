import React from 'react'
import { Image, View, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native'
import { useStoreon } from 'storeon/react'

function ModalPosts({ posts, setModalVisible }) {
  const { dispatch } = useStoreon()

  function selectPost(node) {
    setModalVisible(false)
    dispatch('profile/newurl', node.display_url)
    dispatch('profile/newid', node.id)
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.photosGrid} onPress={() => selectPost(item.node)} >
        <Image
          source={{uri: item.node.display_url}}
          style={styles.photo}
        />
      </TouchableOpacity>
    )
  }

  function EmptyPostsList() {
    return (
      <View>
        <Text>no post</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.node.id}
      ListEmptyComponent={EmptyPostsList}
      numColumns={3}
    />
  )
}

const styles = StyleSheet.create({
  photosGrid: {
    flex: 1
  },
  photo: {
    padding: 50,
    margin: 5
  }
})

export default ModalPosts
