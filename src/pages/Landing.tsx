import Hero from '@/components/landing/Hero'
import Navbar from '@/components/layout/Navbar'
import Wrapper from '@/components/layout/Wrapper'
import React from 'react'

function Landing() {
  return (
   <Wrapper>
     <div>
        <Navbar/>

        <Hero/>
    </div>
   </Wrapper>
  )
}

export default Landing