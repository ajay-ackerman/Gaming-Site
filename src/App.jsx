import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/about'
import Navbar from './components/Navbar'
import { useGSAP } from '@gsap/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden bg-violet-50'>
      <Navbar />
      <Hero />
      <About />
    </main>
  )
}

export default App
