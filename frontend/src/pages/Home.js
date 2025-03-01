import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top`s Airpodes"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Popular Earphones"}/>

      <HorizontalCardProduct category={"watches"} heading={"Watch collection"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Top`s Mobile"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera"}/>
      <VerticalCardProduct category={"telivisions"} heading={"Telivision"}/>
      <VerticalCardProduct category={"speakers"} heading={"Speakers"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>

      <VerticalCardProduct category={"printers"} heading={"Printers"}/>





    </div>
  )
}

export default Home
