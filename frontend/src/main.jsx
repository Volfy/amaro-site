import React from 'react'
import ReactDOM from 'react-dom/client'
import { Helmet } from 'react-helmet'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Helmet>
      <html lang='en' className={localStorage.theme}></html>
    </Helmet>
    <App />
  </>
   
)
