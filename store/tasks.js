import * as api from '../api'
import { ToastAndroid } from 'react-native'

export function tasks(store) {
  store.on('@init', () => {
    return {tasks: []}
  })

  //fetch
  // store.on('tasks/fetch-all', async ({ profile }, tasks) => {
  //   try {
  //     const res = await api.fetchTasks({ username: profile.username })
  //     store.dispatch('tasks/update', res.data.tasks)

  //     // console.log(res.data)
  //     // ToastAndroid.show(`load ${res.data.length} tasks`, ToastAndroid.SHORT)
  //   } catch (error) {
  //     //console.error(error)
  //     ToastAndroid.show(error.message, ToastAndroid.SHORT)
  //   }
  // })

  // store.on('tasks/fetch-create', async ({ tasks }, newTask) => {
  //   try {
  //     await api.createTask(newTask)
  //   } catch (error) {
  //     //console.error(error)
  //     ToastAndroid.show(error.message, ToastAndroid.SHORT)
  //   }
  // })

  // store.on('tasks/fetch-like', async ({ profile }, { mediaId, username }) => {
  //   try {
  //     store.dispatch('tasks/like', mediaId)
  //     await profile.client.like({ mediaId })
  //     await api.likeTask({mediaId, username})
  //   } catch (error) {
  //     console.log(error)
  //     ToastAndroid.show(error.message, ToastAndroid.SHORT)
  //   }
  // })

  // store.on('tasks/fetch-delete', async (_, id) => {
  //   try {
  //     store.dispatch('tasks/delete', id)
  //     await api.deleteTask({id})
  //     ToastAndroid.show('deleted', ToastAndroid.SHORT)
  //   } catch (error) {
  //     //console.error(error)
  //     ToastAndroid.show(error.message, ToastAndroid.SHORT)
  //   }
  // })

  //local
  store.on('tasks/update', ({ tasks }, data) => {
    if (Array.isArray(data)) {
      return {tasks: [...tasks, ...data]}
    } else {
      return {tasks: [...tasks, data]}
    }
  })

  store.on('tasks/like', ({ tasks }, mediaId) => {
    store.dispatch('profile/coinsadd', 1)
    return {tasks: tasks.filter(task => task.mediaId !== mediaId)}
  })

  store.on('tasks/delete', ({ tasks }, mediaId) => {
    return {tasks: tasks.filter(task => task.mediaId !== mediaId)}
  })
}
