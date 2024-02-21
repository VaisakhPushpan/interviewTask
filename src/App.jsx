import React from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@splidejs/splide/css';
import { useSelector } from 'react-redux'
import Layout from './Layout/Layout'
const App = () => {
  const data = useSelector((state)=> console.log(state.auth))
  return (
    <Layout />
  )
}

export default App
