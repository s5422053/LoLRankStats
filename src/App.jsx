import React, { useState } from 'react';
import axios from 'axios'; // axiosをインポート

function App() {

  const [riotId, setRiotId] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [stats, setStats] = useState(null);
  const [image,setImage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Netlify FunctionのURLを指定してリクエストを送信
      const response = await axios.get(`/.netlify/functions/api?gameName=${riotId}&tagLine=${tagLine}`);      
      const result = response.data;
      setStats(result);
      setError(null);
      setImage(`https://lolrankstatsimages.netlify.app/${result.tier}.png`);      
    } catch (error) {
      // エラーハンドリング
      setError('The player does not exist or does not play ranked games');
      setStats(null);
      console.error('Error fetching player stats:', error);
      
    }
  };

  return (

    <div className="App content-center">
      <header className='text-4xl h-16 bg-gray-700 text-center text-white pt-2'>League of Legends RankStats</header>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <form onSubmit={handleSubmit} className="sm:mx-auto sm:w-full sm:max-w-sm">
          <input
            type="text"
            placeholder="Riot ID"
            value={riotId}
            onChange={(e) => setRiotId(e.target.value)}
            className='pl-1 w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          <input
            type="text"
            placeholder="Tag Line"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            className='pl-1 w-1/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          <button type="submit" className='mt-2 w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"'>Search</button>
        </form>
      </div>
      <div className=''>
        {stats && (
          <div className='flex sm:mx-auto sm:w-full sm:max-w-fit  bg-blue-100 space-x-1 border-8 border-t-slate-600 border-l-slate-600 border-slate-800'>
            <div>
              <img src={image} className='flex-none'/>
            </div>
            <div className='flex-col mt-6 mb-8 pr-2'>
              <p className='h-1/3 text-2xl'>{riotId}</p>
              <p className='h-1/2 text-4xl '>{stats.tier} {stats.rank}</p>
              <p className='h-1/6 text-base' >{stats.wins}W {stats.losses}L  {Math.round(stats.wins * 100 / (stats.losses + stats.wins))}% WinRate</p>
              
            </div>
            
          </div>
        )}
      </div>
      {error && <p className='text-red-700 text-2xl sm:mx-auto sm:w-full sm:max-w-fit'>{error}</p>}
    </div>
  );
}

export default App;
