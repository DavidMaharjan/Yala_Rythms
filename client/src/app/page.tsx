'use client'
import Navbar from '@/components/ui/navbar'
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const {email} = useSelector(state=>state.user)
  return (
    <div>
      {/* <NavigationMenuDemo></NavigationMenuDemo> */}
       {email}
      <Navbar></Navbar>
      Home</div>
  )
}

export default Home