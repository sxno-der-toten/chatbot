import axios from 'axios';
import bot from './bot';

export  async function fetchBotsFromAPI() {
  try {
    const response = await axios.get('http://localhost/bot');
    if (response.status !== 200) {
      throw new Error('Erreur lors de la récupération des données de l\'API');
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

async function createBotComponents() {
  const data = await fetchBotsFromAPI();
  const botComponents = data.map(botData => bot(botData)).join('');
  return botComponents;
};


export default async function listBots() {
  const botListHTML = await createBotComponents();
  return `<div class="bot-container mt-3">${botListHTML}</div>`;
};
