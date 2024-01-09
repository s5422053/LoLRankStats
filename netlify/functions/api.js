// netlify/functions/api.js

const axios = require('axios');

const API_KEY = 'RGAPI-04d556db-9b34-40af-ba69-a211e30054e3';

exports.handler = async (event, context) => {
  try {
    const gameName = event.queryStringParameters.gameName;
    const tagLine = event.queryStringParameters.tagLine;

    const response1 = await axios.get(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
      headers: {
        'X-Riot-Token': API_KEY
      }
    });
    const puuid = response1.data.puuid;

    const response2 = await axios.get(`https://jp1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
      headers: {
        'X-Riot-Token': API_KEY
      }
    });
    const summonerId = response2.data.id;

    const response3 = await axios.get(`https://jp1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
      headers: {
        'X-Riot-Token': API_KEY
      }
    });
    const wins = response3.data[0].wins;
    const losses = response3.data[0].losses;
    const tier = response3.data[0].tier;
    const rank = response3.data[0].rank;
    const summonerName = response3.data[0].summonerName;

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
