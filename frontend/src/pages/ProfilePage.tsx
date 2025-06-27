import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  username: string;
  area: number;
  coins: number;
  soldiers: { type: string; count: number }[];
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // For demo, use a static telegramId; in production, get this from Telegram Web App init data
    axios.get(`${API_URL}/user/123456`).then((res) => setUser(res.data));
  }, []);

  return (
    <div style={{ padding: "20px", marginBottom: "60px" }}>
      <h2>Profile</h2>
      {user ? (
        <div>
          <div>
            <b>{user.username}</b>
          </div>
          <div>
            Area: <b>{user.area} km²</b>
          </div>
          <div>
            Coins: <b>{user.coins}</b>
          </div>
          <div>
            Soldiers:
            <ul>
              {user.soldiers.map((s) => (
                <li key={s.type}>
                  {s.type}: {s.count}
                </li>
              ))}
            </ul>
          </div>
          <button>Go to War (feature soon)</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;