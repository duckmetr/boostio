import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { StatusBar, View, ActivityIndicator, StyleSheet, ToastAndroid } from 'react-native'
import { WebView } from  'react-native-webview'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useStoreon } from 'storeon/react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { TasksIcon, HeartPlusIcon, ShopingCartIcon, UserIcon } from './assets/icons'

// import * as api from './api'
import Instagram from './libs/Instagram'

import Tasks from './screens/Tasks/Tasks'
import Orders from './screens/Orders/Orders'
import Profile from './screens/Profile/Profile'
import Shop from './screens/Shop/Shop'

const Tab = createBottomTabNavigator()

function App() {
  const [isAuth, setIsAuth] = useState(null)
  const { dispatch, profile } = useStoreon('profile')

  useEffect(() => {
    checkAuth()
  }, [])
  
  async function checkAuth() {
    const is_auth = await AsyncStorage.getItem('isAuth')
    // console.log('IS_AUTH_FROM_A_STORAGE', is_auth)

    if(is_auth) {
      setIsAuth(true)
      const cookies = await AsyncStorage.getItem('cookies')
      const profileInfoJson = await AsyncStorage.getItem('profile')
      const profileInfo = JSON.parse(profileInfoJson)
      profileInfo.instapi = new Instagram({ cookies })
 
      dispatch('profile/update', profileInfo)
    } else {
      setIsAuth(false)
    }
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

      const profileInfo = {profile_pic_url, username, id, followers: edge_followed_by.count, following: edge_follow.count, posts: edge_owner_to_timeline_media.count, instapi}
      // dispatch('profile/update', profileInfo)

      return profileInfo
    } catch (error) {
      console.log(error)
      ToastAndroid.show(error.message, ToastAndroid.SHORT)
    }
  }

  const loginWithInstagram = async (cookies) => {
    if(cookies.includes('ds_user_id')) {
      const instapi = new Instagram({ cookies })
      // console.log(instapi.login.toString())

      try {
        const profileInfo = await fetchProfileFromInstagram(instapi)
        // console.log('PROFILE_INFO_AUTH', profileInfo)

        dispatch('profile/update', profileInfo)

        await AsyncStorage.setItem('profile', JSON.stringify(profileInfo))
        await AsyncStorage.setItem('cookies', cookies)
        await AsyncStorage.setItem('isAuth', 'true')
        
        setIsAuth(true)
      } catch (error) {
        console.log(error)
      }
    }
  } 

  if (isAuth === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7760B4" />
      </View>
    )
  }

  if (isAuth === false) {
    const runFirst = `
      window.ReactNativeWebView.postMessage(document.cookie)
      true
    `
    return (
      <WebView
        style={{height: 200}}
        source={{uri: 'https://www.instagram.com/accounts/login/'}}
        injectedJavaScript={runFirst}
        onMessage={(event) => {
          loginWithInstagram(event.nativeEvent.data)
        }}
      />
    )
  }

  if (isAuth === true) {
    return (
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Tab.Navigator tabBarOptions={{activeTintColor: '#7760B4', style: {paddingBottom: 4}}}>
          
          <Tab.Screen
            name="Tasks"
            component={Tasks}
            options={{
              tabBarLabel: 'Tasks',
              tabBarIcon: ({ color, size }) => <TasksIcon color={color} size={16} />,
              // tabBarBadge: '3'
            }}
          />

          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{
              tabBarLabel: 'Orders',
              tabBarIcon: ({ color, size }) => <HeartPlusIcon color={color} size={size} />
            }}
          />

          <Tab.Screen
            name="Shop"
            component={Shop}
            options={{
              tabBarLabel: 'Shop',
              tabBarIcon: ({ color, size }) => <ShopingCartIcon color={color} size={size} />
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => <UserIcon color={color} size={size} />
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})


export default App
