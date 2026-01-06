import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/about'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Hero />
      <About />
    </main>
  )
}

export default App
