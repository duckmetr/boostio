import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useStoreon } from 'storeon/react'
import { createStackNavigator } from '@react-navigation/stack'

import Infobar from './components/Infobar'
import Coins from '../../components/Coins'

const Stack = createStackNavigator()

function Profile() {
  const { dispatch, profile } = useStoreon('profile')

  useEffect(() => {
    fetchProfileFromInstagram(profile.instapi)
  }, [])

  function handleLogout() {
    dispatch('profile/logout')
  }

  async function fetchProfileFromInstagram(instapi) {
    try {
      const {
        profile_pic_url,
        username,
        id,
        edge_followed_by,
        edge_follow,
        edge_owner_to_timeline_media
      } = await instapi.getProfileInfo()

      const profileInfo = {profile_pic_url, username, id, followers: edge_followed_by.count, following: edge_follow.count, posts: edge_owner_to_timeline_media.count}
      dispatch('profile/update', profileInfo)
    } catch (error) {
      console.log(error)
      ToastAndroid.show(error.message, ToastAndroid.SHORT)
    }
  }

  const ProfileCard = () => (
    <View style={styles.card}>
      <Image style={styles.avatar} source={{uri: profile.profile_pic_url}} />
      <Text style={styles.title}>{profile.username}</Text>
      <Infobar />
    </View>
  )

  function Profile() {
    return (
      <View style={styles.container}>
        <ProfileCard />
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerRight: () => <Coins />}}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
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
  title: {
    fontWeight: 'bold',
    marginVertical: 10
  },
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 50
  },
  infobar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  },
  logoutBtn: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    color: '#FF6666'
  }

})

export default Profile