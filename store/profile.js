// import * as api from '../api'
import { ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Instagram from '../libs/Instagram'

const initProfileState = {
  profile_pic_url: '',
  username: 'username',
  posts: 0,
  followers: 0,
  following: 0,
  coins: 0,
  orders: 0,
  likes: '∞',
  isAuth: false
}

export function profile(store) {
  store.on('@init', () => {
    return {profile: initProfileState}
  })

  store.on('@dispatch', (state, [event, data]) => {
    // console.log(`Storeon: ${event} with`, data)
    console.log('::STATE::', state)
  })
  
  //fetch
  store.on('profile/fetch-info', async ({ profile }) => {
    try {
      const client = new Instagram(null, null, profile.cookies)
      const profileInfo = await client.getProfileInfo()

      store.dispatch('profile/as-set-cookies', profile.cookies)
      store.dispatch('profile/update', {
        profile_pic_url: profileInfo.profile_pic_url,
        username: profileInfo.username,
        id: profileInfo.id,
        followers: profileInfo.edge_followed_by.count,
        following: profileInfo.edge_follow.count,
        posts: profileInfo.edge_owner_to_timeline_media.count,
        client
      })
    } catch (error) {
      console.error(error)
      ToastAndroid.show(error.message, ToastAndroid.SHORT)
    }
  })

  //async storage
  // store.on('profile/as-auth-true', async () => {
  //   try {
  //     await AsyncStorage.setItem('isAuth', 'true')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // store.on('profile/as-auth-false', async () => {
  //   try {
  //     await AsyncStorage.removeItem('isAuth')
  //     await AsyncStorage.removeItem('cookies')
  //   } catch (error) {
  //     console.log(error)
  //   }  })

  // store.on('profile/as-set-cookies', async (_, cookies) => {
  //   try {
  //     await AsyncStorage.setItem('cookies', cookies)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // store.on('profile/as-get-cookies', async () => {
  //   try {
  //     const cookies = await AsyncStorage.getItem('cookies')
  //     store.dispatch('profile/auth', cookies)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  //local
  store.on('profile/update', ({ profile }, data) => {
    return {profile: {...profile, ...data}}
  })

  store.on('profile/auth', ({ profile }, cookies) => {
    // store.dispatch('profile/as-auth-true')
    return {profile: {...profile, isAuth: true, cookies}}
  })

  store.on('profile/logout', () => {
    // store.dispatch('profile/as-auth-false')
    return {profile: initProfileState}
  })

  store.on('profile/newurl', ({ profile }, newurl) => {
    return {profile: {...profile, newurl}}
  })

  store.on('profile/newid', ({ profile }, mediaId) => {
    return {profile: {...profile, mediaId}}
  })

  store.on('profile/coinsadd', ({ profile }, count) => {
    ToastAndroid.show(`+${count}`, ToastAndroid.SHORT)
    return {profile: {...profile, coins: profile.coins + count}}
  })
}