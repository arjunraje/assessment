import React from 'react'
import Layout from './Layout'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import SignInPage from './components/signIn'
import ResponsiveAppBar from './components/ResponsiveAppBar'


const App = () => {
  return (
    <>
   <ResponsiveAppBar/>
    <Routes>
      
      <Route path="/" element={<Products />} />
      
      {/* <Route path="/products/:id" element={<ProductDetail />} /> */}
      <Route path="/login" element={<SignInPage />} /> 
    </Routes>
    </>
   
  )
}

export default App
