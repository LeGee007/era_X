import React, { useEffect, useState } from "react";
import axios from "axios";

interface Mission {
  key: string;
  description: string;
  type: string;
  reward: { area?: number; coins?: number; soldiers?: number };
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const MissionsPage: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/missions`).then((res) => setMissions(res.data));
  }, []);

  return (
    <div style={{ padding: "20px", marginBottom: "60px" }}>
      <h2>Missions</h2>
      <div>
        {missions.map((mission) => (
          <div key={mission.key} style={{ marginBottom: 15, border: "1px solid #ccc", padding: 10 }}>
            <div>
              <b>{mission.description}</b>
              <div>
                Reward:{" "}
                {mission.reward.area ? `${mission.reward.area} km² ` : ""}
                {mission.reward.coins ? `${mission.reward.coins} coins ` : ""}
                {mission.reward.soldiers ? `${mission.reward.soldiers} soldiers` : ""}
              </div>
              <button style={{ marginTop: 5 }}>Complete</button>
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ marginTop: 30 }}>Referral System</h3>
      <p>Invite your friends and get extra rewards!</p>
    </div>
  );
};

export default MissionsPage;