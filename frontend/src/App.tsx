import React from 'react'
import Layout from './Layout'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import SignInPage from './components/signIn'


const App = () => {
  return (
   
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      
      {/* <Route path="/products/:id" element={<ProductDetail />} /> */}
      <Route path="/login" element={<SignInPage />} /> 
    </Routes>
   
  )
}

export default App
