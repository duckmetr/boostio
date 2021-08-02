import axios from 'axios'
import { BASE_URL } from 'react-native-dotenv'

console.log(BASE_URL)

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${authToken}`
  }
})

export const fetchTasks = username => api.post('/tasks', username)
export const createTask = newTask => api.post('/tasks/create', newTask)
export const likeTask = data => api.post('/tasks/like', data)
export const deleteTask = id => api.post('/tasks/delete', id)

export const fetchOrders = username => api.post('/orders', username)

export const fetchProfileInfo = username => api.post('/profile', username)
