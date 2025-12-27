import DarkVeil from './components/DarkVeil';
import Header from './components/Header';
import Hero from './components/Hero';
import TaskSection from './components/TaskSection'

import AOS from 'aos'
import 'aos/dist/aos.css'

import { useEffect } from 'react';

export default function App() {

  useEffect(() =>{
    AOS.init()
  },[])

  return (
    <>

      <div style={{ width: '100%', height: '600px', position: "absolute", zIndex: "-1"}}>
        <DarkVeil />
      </div>

      <Header />  
      <Hero />
      <TaskSection />

    </>
  )
}