import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import { ConfigContext } from './context/ConfigContext';
import ConfigPage from './pages/ConfigPage';
import DynamicPage from './pages/DynamicPage';
import Navigation from './components/Navigation';
import Rating from './components/Rating';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Hardwood from './pages/Hardwood';
import Laminate from './pages/Laminate';
import Vinyl from './pages/Vinyl';
import Services from './pages/Services';
import Gallery from './pages/Gallery';

// Imported Services
import AcrylicSportsFlooringService from './pages/services/AcrylicSportsFlooringService';
import EpdmRunningTracksService from './pages/services/EpdmRunningTracksService';
import EpoxyFlooringService from './pages/services/EpoxyFlooringService';
import GymFlooringService from './pages/services/GymFlooringService';
import HeatResistantAndUvProtectedFlooringService from './pages/services/HeatResistantAndUvProtectedFlooringService';
import IndoorBadmintonCourtsFlooringService from './pages/services/IndoorBadmintonCourtsFlooringService';
import IndoorBasketballCourtsFlooringService from './pages/services/IndoorBasketballCourtsFlooringService';
import IndoorFutsalFlooringService from './pages/services/IndoorFutsalFlooringService';
import IndoorPaddleTennisFlooringService from './pages/services/IndoorPaddleTennisFlooringService';
import IndoorPickleballFlooringService from './pages/services/IndoorPickleballFlooringService';
import IndoorVolleyballCourtFlooringService from './pages/services/IndoorVolleyballCourtFlooringService';
import MultiPurposeCourtsFlooringService from './pages/services/MultiPurposeCourtsFlooringService';
import OutdoorBasketballCourtsFlooringService from './pages/services/OutdoorBasketballCourtsFlooringService';
import OutdoorFutsalFlooringService from './pages/services/OutdoorFutsalFlooringService';
import OutdoorPaddleTennisFlooringService from './pages/services/OutdoorPaddleTennisFlooringService';
import OutdoorPickleballFlooringService from './pages/services/OutdoorPickleballFlooringService';
import OutdoorTennisCourtsFlooringService from './pages/services/OutdoorTennisCourtsFlooringService';
import OutdoorVolleyballCourtFlooringService from './pages/services/OutdoorVolleyballCourtFlooringService';
import PlayAreaFlooringService from './pages/services/PlayAreaFlooringService';
import PolyurethaneFloorService from './pages/services/PolyurethaneFloorService';
import PolyurethanePuSportsFlooringService from './pages/services/PolyurethanePuSportsFlooringService';
import RubberGymFlooringService from './pages/services/RubberGymFlooringService';
import RubberSportsFlooringService from './pages/services/RubberSportsFlooringService';
import RunningTrackService from './pages/services/RunningTrackService';
import ShockAbsorbingFlooringService from './pages/services/ShockAbsorbingFlooringService';
import SportsCourtsService from './pages/services/SportsCourtsService';
import SportsFlooringService from './pages/services/SportsFlooringService';

import './styles/App.css';

function App() {
  const { config } = useContext(ConfigContext);

  return (
    <div className="App">
      <Navigation />
      <Rating />
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/products/hardwood" element={<Hardwood />}/>
          <Route path="/products/laminate" element={<Laminate />}/>
          <Route path="/products/vinyl" element={<Vinyl />}/>
          <Route path="/services" element={<Services />}/>
          <Route path="/gallery" element={<Gallery />}/>
          
          <Route path="/services/acrylic-sports-flooring" element={<AcrylicSportsFlooringService />}/>
          <Route path="/services/epdm-running-tracks" element={<EpdmRunningTracksService />}/>
          <Route path="/services/epoxy-flooring" element={<EpoxyFlooringService />}/>
          <Route path="/services/gym-flooring" element={<GymFlooringService />}/>
          <Route path="/services/heat-resistant-and-uv-protected-flooring" element={<HeatResistantAndUvProtectedFlooringService />}/>
          <Route path="/services/indoor-badminton-courts-flooring" element={<IndoorBadmintonCourtsFlooringService />}/>
          <Route path="/services/indoor-basketball-courts-flooring" element={<IndoorBasketballCourtsFlooringService />}/>
          <Route path="/services/indoor-futsal-flooring" element={<IndoorFutsalFlooringService />}/>
          <Route path="/services/indoor-paddle-tennis-flooring" element={<IndoorPaddleTennisFlooringService />}/>
          <Route path="/services/indoor-pickleball-flooring" element={<IndoorPickleballFlooringService />}/>
          <Route path="/services/indoor-volleyball-court-flooring" element={<IndoorVolleyballCourtFlooringService />}/>
          <Route path="/services/multi-purpose-courts-flooring" element={<MultiPurposeCourtsFlooringService />}/>
          <Route path="/services/outdoor-basketball-courts-flooring" element={<OutdoorBasketballCourtsFlooringService />}/>
          <Route path="/services/outdoor-futsal-flooring" element={<OutdoorFutsalFlooringService />}/>
          <Route path="/services/outdoor-paddle-tennis-flooring" element={<OutdoorPaddleTennisFlooringService />}/>
          <Route path="/services/outdoor-pickleball-flooring" element={<OutdoorPickleballFlooringService />}/>
          <Route path="/services/outdoor-tennis-courts-flooring" element={<OutdoorTennisCourtsFlooringService />}/>
          <Route path="/services/outdoor-volleyball-court-flooring" element={<OutdoorVolleyballCourtFlooringService />}/>
          <Route path="/services/play-area-flooring" element={<PlayAreaFlooringService />}/>
          <Route path="/services/polyurethane-floor" element={<PolyurethaneFloorService />}/>
          <Route path="/services/polyurethane-pu-sports-flooring" element={<PolyurethanePuSportsFlooringService />}/>
          <Route path="/services/rubber-gym-flooring" element={<RubberGymFlooringService />}/>
          <Route path="/services/rubber-sports-flooring" element={<RubberSportsFlooringService />}/>
          <Route path="/services/running-track" element={<RunningTrackService />}/>
          <Route path="/services/shock-absorbing-flooring" element={<ShockAbsorbingFlooringService />}/>
          <Route path="/services/sports-courts" element={<SportsCourtsService />}/>
          <Route path="/services/sports-flooring" element={<SportsFlooringService />}/>
          
          <Route path="/admin/config" element={<ConfigPage />} />
          {config.customLinks && config.customLinks.map((link, idx) => (
            <Route key={idx} path={link.path} element={<DynamicPage path={link.path} />} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;