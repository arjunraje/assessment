import React from 'react'
import Layout from './Layout'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import SignInPage from './components/signIn'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import CreateSale from './pages/CreateSale'
import PurchasePage from './pages/Purchase';


const App = () => {
  return (
    <>
   <ResponsiveAppBar/>
    <Routes>
      
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<SignInPage />} /> 
      <Route path="/sale" element={<CreateSale/>} /> 
      <Route path="/purchase" element={<PurchasePage/>} /> 
    </Routes>
    </>
   
  )
}

export default App
