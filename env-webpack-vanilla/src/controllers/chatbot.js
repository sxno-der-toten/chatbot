import axios from 'axios';
import userNavbar from '../views/user_navbar';
import { fetchBotsFromAPI } from '../views/list-bot';
import viewBotUserContainer from '../views/bot_user_container';
import acceuil from '../views/acceuil';
import bot_message from '../views/botmessage';
import user_message from '../views/user.message';
import message_bar from '../views/message_bar';
import help_message from '../views/help_message';
import { HELP_1, HELP_2, HELP_3 } from '../views/help';
import loader from '../views/loaderMessage';



class Chatbot {
  constructor(params) {
    this.el = document.querySelector('#root');
    this.params = params;
    this.isClicked = false;
    this.botUrl = '';
    this.botName = '';
    this.itemId = '';

    this.run();
  }

  getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    const heure = `${hours}:${minutes}`;
    return heure;
  }

  handleItemClick = async (event) => {
    const clickedList = event.target.closest('.list');
    const closestListbot = event.target.closest('.listbot');

    if (clickedList && closestListbot) {
      this.itemId = clickedList.id;
      try {
        const data = await fetchBotsFromAPI(); // Utilisez la fonction fetchBotsFromAPI ici
        const foundBot = data.find((bot) => bot.id.toString() === this.itemId);
        if (foundBot) {
          this.botUrl = foundBot.img;
          this.botName = foundBot.nom;
          this.isClicked = true;
          this.render();
        }
      } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des données des bots :', error);
      }
    }
  };

  handleSearch() {
  
  }
  

  handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
      const message = document.getElementById
      ('message-input').value.trim();
      const type = 1 ;
      const url = '';
      if (message !== '') {
        const heure = this.getCurrentTime();
        this.renderUserMessage(message, heure);
        this.helpCommandeShow(message, heure, this.itemId);
        this.actionResponse(message, heure, this.itemId);
        this.sendMessageToServer(message, heure, type ,url);

        if (message.toLowerCase().startsWith('wiki:') || message.toLowerCase().startsWith('wiki :')) {
          const query = message.slice(message.indexOf(':') + 1).trim();
          this.handleMultipleWikiQueries(query, heure);
        } 

        if (message.toLowerCase().startsWith('ytb:') || message.toLowerCase().startsWith('ytb :')) {
          const query = message.slice(message.indexOf(':') + 1).trim();
          this.handleYtbQuery(query, heure); 
        } 
        if (message.toLowerCase().startsWith('joke:') || message.toLowerCase().startsWith('joke :')) {
          const query = message.slice(message.indexOf(':') + 1).trim();
          this.handleJokeQuery(query);
        } 
      } else {
        // message pas envoyé car vide
      }
    }
  }

  botPresentationMessage() {
    const message = `🤖 Bonjour ! Je suis ${this.botName}, votre assistant virtuel dédié à rendre votre expérience plus agréable et plus efficace.<br> 💬 N'hésitez pas à m'envoyer vos questions et requêtes, et je ferai de mon mieux pour vous offrir les réponses les plus utiles et pertinentes.<br>🛠️ Pour voir les actions spécifiques, veuillez écrire : 'help'.`;
    const heure = this.getCurrentTime();

    return bot_message(this.botUrl, message, heure);
  }

  helpCommandeShow(message, heure, itemId) {
    if (message === 'help') {
      const helpnum = itemId;
      const messageContainer = document.querySelector('.message-container');
      const loaderElement = loader();
      messageContainer.insertAdjacentHTML('beforeend', loaderElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
      const type = 0 ;
      const url = this.botUrl;

      setTimeout(() => {
        const userMessageElement = help_message(this.botUrl, heure, helpnum);
        messageContainer.removeChild(messageContainer.lastElementChild);
        messageContainer.insertAdjacentHTML('beforeend', userMessageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
        this.sendMessageToServer(message, heure, type ,url);
      }, 2000);
    }
  }

  async actionResponse(message, heure, itemId) {
    const num = itemId;
    const helpNum = `HELP_${num.toString()}`;
    const type = 0 ;
    const url = this.botUrl;

    let helpArray;
    switch (helpNum) {
      case 'HELP_1':
        helpArray = HELP_1;
        break;
      case 'HELP_2':
        helpArray = HELP_2;
        break;
      case 'HELP_3':
        helpArray = HELP_3;
        break;
      default:
        helpArray = null;
        break;
    }

    if (helpArray) {
      let messageFound = '';
      for (let i = 0; i < helpArray.length; i += 1) {
        if (message === helpArray[i].message) {
          messageFound = helpArray[i].response;

          const messageContainer = document.querySelector('.message-container');
          const loaderElement = loader();
          messageContainer.insertAdjacentHTML('beforeend', loaderElement);
          messageContainer.scrollTop = messageContainer.scrollHeight;
          setTimeout(() => {
            const botMessageElement = bot_message(this.botUrl, messageFound, heure);
            messageContainer.removeChild(messageContainer.lastElementChild);
            messageContainer.insertAdjacentHTML('beforeend', botMessageElement);
            messageContainer.scrollTop = messageContainer.scrollHeight;
            this.sendMessageToServer(messageFound , heure, type ,url);
          }, 2000);

          break;
        }
      }

      if (!messageFound) {
        // Gérer le cas où aucun message correspondant n'est trouvé
      }
    }
  }

  renderUserMessage(message, heure) {
    const messageContainer = document.querySelector('.message-container');
    const userMessageElement = user_message(message, heure);
    messageContainer.insertAdjacentHTML('beforeend', userMessageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    
    const messageInput = document.getElementById('message-input');
    if (messageInput !== null) {
        messageInput.value = '';
    } else {
        console.error("L'élément avec l'ID 'message-input' n'est pas trouvé dans le DOM.");
    }
}


async handleMultipleWikiQueries(message, heure) {
  const queries = message.split(' ');
  for (const query of queries) {
    await this.handleWikiQuery(query, heure);
  }
}

async handleWikiQuery(query, heure) {
  try {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const apiUrl = `https://fr.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&titles=${query}`;
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const type = 0 ;
    const url = this.botUrl;
    const data = await response.json();

    const jsonData = JSON.parse(data.contents);

    const pageId = jsonData.query && jsonData.query.pages ? Object.keys(jsonData.query.pages)[0] : null;
    const page = pageId ? jsonData.query.pages[pageId] : null;
    const wikiExtract = page ? page.extract || 'Aucun résultat trouvé sur Wikipédia.' : 'Aucun résultat trouvé sur Wikipédia.';

    
    const botMessageElement = bot_message(this.botUrl, wikiExtract, heure);
    const messageContainer = document.querySelector('.message-container');
    messageContainer.insertAdjacentHTML('beforeend', botMessageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    this.sendMessageToServer(wikiExtract, this.getCurrentTime(), type, this.botUrl);
  } catch (error) {
    console.error('Erreur lors de la recherche sur Wikipédia :', error);
  }
}

async  getYtbVideos(query) {
  try {
    const apiKey = 'AIzaSyBN3rlHPlzu9BihMlplYvFeBra7l4lM0KI';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&q=${query}`;
    const response = await axios.get(apiUrl);
    
    if (response.status !== 200) {
      throw new Error('Erreur lors de la récupération des données de l\'API YouTube');
    }

    return response.data.items;
  } catch (error) {
    console.error('Une erreur est survenue lors de la récupération des vidéos musicales :', error);
    return null;
  }
}

async handleYtbQuery(query) {
  try {
    const musicVideos = await this.getYtbVideos(query); 
    if (musicVideos) {
      this.renderYtbVideos(musicVideos); 
    } else {
      console.log('Aucune vidéo YouTube trouvée.');
    }
  } catch (error) {
    console.error('Une erreur est survenue lors de la recherche de vidéos YouTube :', error);
  }
}

async renderYtbVideos(ytbVideos) {
  const messageContainer = document.querySelector('.message-container');
  ytbVideos.forEach(item => {
    const videoTitle = item.snippet.title;
    const videoId = item.id.videoId;
    const videoElement = document.createElement('div');
    videoElement.classList.add('video-container');

    videoElement.innerHTML = ` 
    <div class="ytbimg">
    <img src="${this.botUrl}" alt="">
    </div>
    <div class='allFrame'>
    <h2 class="frameTitle">${videoTitle}</h2>
      <iframe class="ytb_iframe" width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      <p class='ytbheure'> ${this.getCurrentTime()}</p>
      </div>
      `
    ;
    messageContainer.appendChild(videoElement);
  });
  messageContainer.scrollTop = messageContainer.scrollHeight;
  
}


async handleJokeQuery(query) {
  try {
    const url = `https://v2.jokeapi.dev/joke/Any?lang=fr&amount=${query}`;
    const response = await axios.get(url);

    if (response.data) {
      this.renderJokes(response.data);
    } else {
      console.error('Aucune blague trouvée.');
    }
  } catch (error) {
    console.error('Une erreur est survenue lors de la récupération des données :', error);
  }
}


async renderJokes(jokeData) {
  const messageContainer = document.querySelector('.message-container');

  if (jokeData && !jokeData.error) {
    if (jokeData.jokes) {
      // Cas où vous avez plusieurs blagues
      jokeData.jokes.forEach(joke => {
        this.renderSingleJoke(joke, messageContainer);
      });
    } else {
      // Cas où vous avez une seule blague
      this.renderSingleJoke(jokeData, messageContainer);
    }

    messageContainer.scrollTop = messageContainer.scrollHeight;
  } else {
    console.error('Une erreur est survenue lors de la récupération des blagues.');
  }
}

renderSingleJoke(joke, container) {
  let jokeHTML = '';

  if (joke.type === 'twopart') {
    jokeHTML = `
    <div class="jokemessage">
    <div class="jokeimg">
    <img src="${this.botUrl}" alt="">
    </div>
      <div class="joke">
        <p class="joke-setup">${joke.setup}
          <span class="joke-toggle" onclick="toggleAnswer(this)"><i class="fa-solid fa-angle-down"></i></span>
        </p>
        <p class="joke-answer" style="display: none;">Réponse: ${joke.delivery}</p>

        <p class='jokeheure'> ${this.getCurrentTime()}</p>
      </div>
      </div>
    `;
  } else {
    jokeHTML = `
      <div class="joke">
        <p class="joke-setup">${joke.setup}</p>
        <p class="joke-answer" style="display: none;">Réponse: ${joke.joke}</p>
      </div>
    `;
  }

  
  container.insertAdjacentHTML('beforeend', jokeHTML);
}


 
  async collectMessage() {
    try {
      const response = await axios.get(`http://localhost/messages/${this.itemId}`);
      if (response.status !== 200) {
        throw new Error('Erreur lors de la récupération des données de l\'API');
      }

      return response.data; 
    } catch (error) {
      console.error(error);
      return null; 
    }
  }


  async sendMessageToServer(message, heure, type, url) {
    try {
      if (type === 1) {
        const response = await axios.post(`http://localhost/messages/${this.itemId}`, {
          message: message,
          heure: heure,
          type: type 
        });
  
        if (response.status === 200) {
          console.log('Message envoyé avec succès !');
        } else {
          throw new Error('La requête a retourné un code de statut inattendu : ' + response.status);
        }
      } else {
        const response = await axios.post(`http://localhost/messages/${this.itemId}`, {
          message: message,
          heure: heure,
          type: type ,
          url: url
        });
  
        if (response.status === 200) {
          console.log('Message envoyé avec succès !');
        } else {
          throw new Error('La requête a retourné un code de statut inattendu : ' + response.status);
        }
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'envoi du message :', error.message);
    }
  }
  


  async render() {
    let content = '';
    let usernav = '';
    let messgbar = '';
    let messageContainer ='';
    

    if (!this.isClicked) {
      content = acceuil();
      
    } else {
      usernav = userNavbar(this.botUrl, this.botName);
      messgbar = message_bar();
      messageContainer = ` <div class="message-container">
      <!-- Les messages utilisateur, du bot et API seront ajoutés ici -->
    </div>`;
     
    }

    async function BotDisplay() {
      const botUserContainerHTML = await viewBotUserContainer();
      return botUserContainerHTML;
    }

    const html = `
    <div id="page" class="row col-12">
      <div class="gauche col-3">
        ${await BotDisplay()} <!-- Insérer le HTML généré par viewBotUserContainer() -->
      </div>
      <div class="droites col-9">
        ${content}
        ${usernav}
        ${messageContainer}
        ${messgbar}
      </div>
    </div>
    `;
    this.el.innerHTML = html;




    if (this.isClicked) {
      document.getElementById('message-input').addEventListener('keyup', this.handleEnterKeyPress.bind(this));
      const messageContainer = document.querySelector('.message-container');
    
      
      const messageList = await this.collectMessage();
    
      if (messageList && messageList.length > 0) {
        
        messageList.forEach(message => {
          if (message.type === 1) {
            this.renderUserMessage(message.message, message.heure);
          } else {
           
            const botMessageElement = bot_message(message.image, message.message, message.heure);
            messageContainer.insertAdjacentHTML('beforeend', botMessageElement);
            messageContainer.scrollTop = messageContainer.scrollHeight;
          }
        });
      }
    
      
      const loaderElement = loader();
      messageContainer.insertAdjacentHTML('beforeend', loaderElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    
      
      setTimeout(async () => {
        messageContainer.removeChild(messageContainer.lastElementChild);
        const botPresentationElement = this.botPresentationMessage();
        messageContainer.insertAdjacentHTML('beforeend', botPresentationElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }, 1500);
    } else {
      
      document.getElementById('message-input').addEventListener('keyup', this.handleEnterKeyPress.bind(this));
      const messageContainer = document.querySelector('.message-container');
    
      const loaderElement = loader();
      messageContainer.insertAdjacentHTML('beforeend', loaderElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    
      setTimeout(async () => {
        messageContainer.removeChild(messageContainer.lastElementChild);
        const botPresentationElement = this.botPresentationMessage();
        messageContainer.insertAdjacentHTML('beforeend', botPresentationElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }, 1500);
    }
    


    

    if (this.isClicked && window.innerWidth < 900) {
      const droites = document.querySelector('.droites');
      const gauches = document.querySelector('.gauche');

      droites.style.display = 'block';
      gauches.style.display = 'none';
      droites.style.width = '100%';
    }
  }

  async run() {
    this.render();
    document.addEventListener('click', this.handleItemClick);
    this.handleSearch();
  }
}

export default Chatbot;
