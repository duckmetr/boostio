import React from 'react'
import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'
import { StoreContext } from 'storeon/react'

import { store } from './store'
import App from './App'

function Store() {
  return (
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  )
}

AppRegistry.registerComponent(appName, () => Store)
