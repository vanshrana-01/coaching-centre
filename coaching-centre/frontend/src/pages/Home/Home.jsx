import React from 'react'
import Hero from '../../components/Hero/Hero'
import PopularCourses from '../../components/PopularCourses/PopularCourses'
import WhychooseUs from '../../components/WhychooseUs/WhychooseUs'
import Teachers from '../../components/Teachers/Teachers'
import Categories from '../../components/Categories/Categories'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Categories/>
      <PopularCourses/>
      <WhychooseUs/>
      <Teachers/>

    </div>
  )
}

export default Home


