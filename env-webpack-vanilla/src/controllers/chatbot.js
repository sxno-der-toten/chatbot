import userNavbar from '../views/user_navbar';
import { bots } from '../views/list-bot';
import viewBotUserContainer from '../views/bot_user_container';
import acceuil from '../views/acceuil';
import bot_message from '../views/botmessage';
import user_message from '../views/user.message';
import message_bar from '../views/message_bar';
import help_message from '../views/help_message';
import { HELP_1, HELP_2, HELP_3 } from '../views/help';

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

  handleItemClick = (event) => {
    const clickedList = event.target.closest('.list');
    const closestListbot = event.target.closest('.listbot');

    if (clickedList && closestListbot) {
      this.itemId = clickedList.id;
      const foundBot = bots.find((bot) => bot.id.toString() === this.itemId);

      if (foundBot) {
        this.botUrl = foundBot.img;
        this.botName = foundBot.nom;
        this.isClicked = true;
        this.render();
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
      const userMessageElement = help_message(this.botUrl, heure, helpnum);
      messageContainer.insertAdjacentHTML('beforeend', userMessageElement);
    }
  }

  actionResponse(message, heure, itemId) {
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
        // Rien à afficher
        break;
    }

    if (helpArray) {
      let messageFound = '';
      for (let i = 0; i < helpArray.length; i += 1) {
        if (message === helpArray[i].message) {
          messageFound = helpArray[i].response;

          const messageContainer = document.querySelector('.message-container');
          const userMessageElement = bot_message(this.botUrl, messageFound, heure);
          messageContainer.insertAdjacentHTML('beforeend', userMessageElement);
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
    document.getElementById('message-input').value = '';
  }

  render() {
    let content = '';
    let usernav = '';
    let messgbar = '';
    let botmssg = '';

    if (!this.isClicked) {
      content = acceuil();
    } else {
      usernav = userNavbar(this.botUrl, this.botName);
      botmssg = this.botPresentationMessage();
      messgbar = message_bar();
    }

    const html = `
    <div id="page" class="row col-12">
        <div class="gauche col-3 ">
            ${viewBotUserContainer()}
        </div>
        <div class="droites col-9 ">
            ${content}
            ${usernav}
            <div class="message-container">
                
                <!-- Les messages utilisateur et du bot  seront ajoutés ici -->
            </div>
            ${messgbar}
        </div>
    </div>
    `;

    this.el.innerHTML = html;

    if (this.isClicked) {
      document.getElementById('message-input').addEventListener('keyup', this.handleEnterKeyPress.bind(this));
      setTimeout(() => {
        botmssg = this.botPresentationMessage();
        const messageContainer = document.querySelector('.message-container');
        messageContainer.innerHTML = botmssg;
      }, 1000);
    }

    if (this.isClicked && window.innerWidth < 900) {
      const droites = document.querySelector('.droites');
      const gauches = document.querySelector('.gauche');

      droites.style.display = 'block';
      gauches.style.display = 'none';
      droites.style.width = '100%';
    }
  }

  run() {
    this.render();
    document.addEventListener('click', this.handleItemClick);
  }
}

export default Chatbot;
