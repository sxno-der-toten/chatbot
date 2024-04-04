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

  handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
      const message = document.getElementById('message-input').value.trim();
      if (message !== '') {
        const heure = this.getCurrentTime();
        this.renderUserMessage(message, heure);
        this.helpCommandeShow(message, heure, this.itemId);
        this.actionResponse(message, heure, this.itemId);
        this.sendMessageToServer(message, heure, this.itemId);
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

      setTimeout(() => {
        const userMessageElement = help_message(this.botUrl, heure, helpnum);
        messageContainer.removeChild(messageContainer.lastElementChild);
        messageContainer.insertAdjacentHTML('beforeend', userMessageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }, 2000);
    }
  }

  async actionResponse(message, heure, itemId) {
    const num = itemId;
    const helpNum = `HELP_${num.toString()}`;

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


  async sendMessageToServer(message, heure, itemId) {
    try {
      const response = await axios.post(`http://localhost/send/${this.itemId}`, {
        message: message,
        heure: heure,
        type: '1' 
      });
  
      if (response.status === 200) {
        console.log('Message envoyé avec succès !');
      } else {
        throw new Error('La requête a retourné un code de statut inattendu : ' + response.status);
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'envoi du message :', error.message);
    }
  }
  

  async render() {
    let content = '';
    let usernav = '';
    let messgbar = '';
    let botmssg = '';

    if (!this.isClicked) {
      content = acceuil();
      
    } else {
      usernav = userNavbar(this.botUrl, this.botName);
      messgbar = message_bar();
     
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
        <div class="message-container">
          <!-- Les messages utilisateur, du bot et API seront ajoutés ici -->
        </div>
        ${messgbar}
      </div>
    </div>
    `;
    this.el.innerHTML = html;

    if (this.isClicked) {
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
      }, 2000);

      setTimeout(async () => {
        const messageList = await this.collectMessage();
        if (!messageList) return;
        messageList.forEach(message => this.renderUserMessage(message.message, message.heure));
      }, 2000); 
    
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
  }
}

export default Chatbot;
