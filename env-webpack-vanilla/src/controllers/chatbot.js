import userNavbar from '../views/user_navbar';
import { bots } from '../views/list-bot';
import viewBotUserContainer from '../views/bot_user_container';
import acceuil from '../views/acceuil';
import bot_message from '../views/botmessage';
import user_message from '../views/user.message';
import message_bar from '../views/message_bar';

class Chatbot {
  constructor(params) {
    this.el = document.querySelector('#root');
    this.params = params;
    this.isClicked = false;
    this.botUrl = '';
    this.botName = '';

    this.run();
  }

  handleItemClick = (event) => {
    const clickedList = event.target.closest('.list');
    const closestListbot = event.target.closest('.listbot');

    if (clickedList && closestListbot) {
      const itemId = clickedList.id;
      const foundBot = bots.find((bot) => bot.id.toString() === itemId);

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
      const message = document.getElementById('message-input').value;
      this.renderUserMessage(message);
    }
  }

  renderUserMessage(message) {
    const messageContainer = document.querySelector('.message-container');
    const userMessageElement = user_message(message);
    messageContainer.insertAdjacentHTML('beforeend', userMessageElement);

    document.getElementById('message-input').value = '';
  }

  render() {
    let content = '';
    let usernav = '';
    let botmssg = '';
    let messgbar = '';

    if (!this.isClicked) {
      content = acceuil();
    } else {
      usernav = userNavbar(this.botUrl, this.botName);
      botmssg = bot_message(this.botUrl);
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
                ${botmssg} 
                <!-- Les messages utilisateur seront ajoutés ici -->
            </div>
            ${messgbar}
        </div>
    </div>
    `;

    this.el.innerHTML = html;

    if (this.isClicked) {
      document.getElementById('message-input').addEventListener('keyup', this.handleEnterKeyPress.bind(this));
    }
  }

  run() {
    this.render();
    document.addEventListener('click', this.handleItemClick);
  }
}

export default Chatbot;
