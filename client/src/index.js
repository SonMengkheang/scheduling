import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import 'react-perfect-scrollbar/dist/css/styles.css'
import * as serviceWorker from './serviceWorker'
import store from "./redux/store"
import App from './App'
import Preloading from "./components/loading/Preloading"
import {Provider} from "react-redux"

ReactDOM.render(
  <Provider store={store}>
      <Suspense fallback={ <Preloading/> }>
          <App />
      </Suspense>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.register()
