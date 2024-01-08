import React, { useState } from 'react';
import axios from 'axios'; // axiosをインポート

function App() {

  const [riotId, setRiotId] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [stats, setStats] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Netlify FunctionのURLを指定してリクエストを送信
      const response = await axios.get(`/.netlify/functions/api?gameName=${riotId}&tagLine=${tagLine}`);
      const result = response.data;
      setStats(result);
      console.log(`${result.body}`);
    } catch (error) {
      // エラーハンドリング
      console.error('Error fetching player stats:', error);
    }
  };

  return (
    <div className="App">
      <h1>League of Legends Stats</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Riot ID" 
          value={riotId} 
          onChange={(e) => setRiotId(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Tag Line" 
          value={tagLine} 
          onChange={(e) => setTagLine(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
      {stats && (
        <div>
          <h2>{stats.summonerName}</h2>
          <h3>{stats.tier} {stats.rank}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
