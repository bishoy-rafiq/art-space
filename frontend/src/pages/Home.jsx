import React, { useState, useEffect } from "react";
import Header from '../components/Header'
import Categories from './Categories'
import Artists  from '../components/Artists'
import UpComingEvents from '../components/UpComingEvents'
import Advertisements from '../components/Advertisements'
import SearchBar from "../components/SearchBar";
import AuctionsHome from "../components/AuctionsHome";
import ArtMarktHome from "../components/ArtMarktHome";


const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className='scroll-smooth'>
      <SearchBar/>
         {isSmallScreen ?<Advertisements/> :<Header/>}
        <Categories/>
       <Artists/>
       <AuctionsHome/>
       <ArtMarktHome/>
       <UpComingEvents/>
    </div>
  )
}

export default Home