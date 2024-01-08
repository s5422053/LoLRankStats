// netlify/functions/api.js

const axios = require('axios');

const API_KEY = 'RGAPI-9c437aa7-ad14-4c7e-a5c8-1378e91fa1fe';
const BASE_URL = 'https://jp1.api.riotgames.com/lol/';

exports.handler = async (event, context) => {
  try {
    const gameName = event.queryStringParameters.gameName;
    const tagLine = event.queryStringParameters.tagLine;

    const response1 = await axios.get(`${BASE_URL}riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
      headers: {
        'X-Riot-Token': API_KEY
      }
    });
    const puuid = response1.data.puuid;

    const response2 = await axios.get(`${BASE_URL}summoner/v4/summoners/by-puuid/${puuid}`, {
      headers: {
        'X-Riot-Token': API_KEY
      }
    });
    const summonerId = response2.data.id;

    const response3 = await axios.get(`${BASE_URL}lol/league/v4/entries/by-summoner/${summonerId}`, {
      headers: {
        'X-Riot-Token': API_KEY
      }
    });
    const wins = response3.data.wins;
    const losses = response3.data.losses;
    const tier = response3.data.tier;
    const rank = response3.data.rank;
    const summonerName = response3.data.summonerName;

    return {
      statusCode: 200,
      body: JSON.stringify({ summonerName, wins, losses, tier, rank })
    };
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch player stats' })
    };
  }
};
