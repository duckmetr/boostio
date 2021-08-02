import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { StatusBar, View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { WebView } from  'react-native-webview'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useStoreon } from 'storeon/react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { TasksIcon, HeartPlusIcon, ShopingCartIcon, UserIcon } from './assets/icons'

import Tasks from './screens/Tasks/Tasks'
import Orders from './screens/Orders/Orders'
import Profile from './screens/Profile/Profile'
import Shop from './screens/Shop/Shop'

const Tab = createBottomTabNavigator()

function App() {
  const { dispatch, tasks, profile } = useStoreon('tasks', 'profile')
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    readItemFromStorage()

    // fetchProfile()
    // fetchTasks()
  }, [])

  // function fetchTasks() {
  //   tasks.length || dispatch('tasks/fetch-all')
  // }
  
  function fetchProfile() {
    dispatch('profile/fetch-info')
  }

  async function readItemFromStorage() {
    try {
      const is_auth = await AsyncStorage.getItem('isAuth')
      const cookies = await AsyncStorage.getItem('cookies')

      console.log(cookies)

      if (cookies !== null) {
        dispatch('profile/auth', cookies)
      }

      if(is_auth !== null) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    } catch(error) {
      console.log(error)
    }
  }
  // console.log('isAuth -> ', isAuth)

  const loginWithInstagram = async (cookies) => {
    if(cookies.includes('ds_user_id')) {
      setIsAuth(true)
      // dispatch('profile/auth', cookies)

      fetchProfile()




      await AsyncStorage.setItem('cookies', cookies)
      await AsyncStorage.setItem('username', username)
      await AsyncStorage.setItem('isAuth', 'true')
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
