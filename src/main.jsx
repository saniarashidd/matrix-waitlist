import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import posthog from 'posthog-js'

posthog.init('phc_DRRXjkLb8XC0YsppMih7vCsQmEXy70cvu9aDhUcg0MS', {
  api_host: 'https://us.i.posthog.com'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
