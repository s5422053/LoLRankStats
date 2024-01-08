import React, { useState } from 'react';
import { getPlayerStats } from './api';

function App() {
  const [riotId, setRiotId] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [stats, setStats] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await getPlayerStats(riotId,tagLine);
      setStats(result);
      console.log(`${stats.tier}`);
    } catch (error) {
      // エラーハンドリング
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
          {/* ここにランク戦の勝率と最も使用しているチャンピオンを表示するコードを追加 */}
        </div>
      )}
    </div>
  );
}

export default App;
