import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  BrowserRouter
} from "react-router-dom";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheets/style.scss'




ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
