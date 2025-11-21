import React from 'react'
import Hero from '../../components/students/Hero'
import CoursesSection from '../../components/students/CoursesSection'
import Footer from '../../components/students/Footer'

const Home = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <Hero/>
      <CoursesSection/>
    </div>
  )
}

export default Home