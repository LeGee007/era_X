import React, { useEffect, useState } from "react";
import axios from "axios";

interface Region {
  _id: string;
  owner: { username: string; clan: string };
  coordinates: { x: number; y: number };
  area: number;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const MapPage: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/regions`).then((res) => setRegions(res.data));
  }, []);

  return (
    <div style={{ padding: "20px", marginBottom: "60px" }}>
      <h2>Continent Map</h2>
      {/* This is a placeholder for a 2D map. Expand with SVG or Canvas for real map */}
      <svg width={400} height={400} style={{ background: "#efe" }}>
        {regions.map((r, i) => (
          <circle
            key={r._id}
            cx={20 + r.coordinates.x * 5}
            cy={20 + r.coordinates.y * 5}
            r={8}
            fill={i % 3 === 0 ? "blue" : i % 3 === 1 ? "green" : "white"}
            stroke="#333"
            strokeWidth={2}
          >
            <title>
              {r.owner.username} ({r.area} km²)
            </title>
          </circle>
        ))}
      </svg>
      <p style={{ marginTop: 20 }}>
        Click on a region for details (future feature).
      </p>
    </div>
  );
};

export default MapPage;