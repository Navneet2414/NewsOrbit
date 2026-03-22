import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedNews from './components/FeaturedNews'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <FeaturedNews />
      <Footer />
    </div>
  )
}

export default App