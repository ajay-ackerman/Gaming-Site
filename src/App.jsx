import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import { useGSAP } from '@gsap/react'
import Features from './components/Features'
import Story from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Products from './components/Products'
function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden bg-orange-50'>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Products />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
