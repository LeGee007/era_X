import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MapPage from "./pages/MapPage";
import MissionsPage from "./pages/MissionsPage";
import ProfilePage from "./pages/ProfilePage";
import ClanPage from "./pages/ClanPage";
import MarketPage from "./pages/MarketPage";
import Navbar from "./components/Navbar";

const App: React.FC = () => (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/map" />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/clan" element={<ClanPage />} />
        <Route path="/market" element={<MarketPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;