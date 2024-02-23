import userNavbar from '../views/user_navbar';
import { bots } from '../views/list-bot';
import viewBotUserContainer from '../views/bot_user_container';
import viewMessageContainer from '../views/message_container';
import acceuil from '../views/acceuil';

class Chatbot {
  constructor(params) {
    this.el = document.querySelector('#root');
    this.params = params;
    this.isClicked = false;

    this.run();
  }

  handleItemClick = () => {
    document.addEventListener('click', (event) => {
      const clickedList = event.target.closest('.list');
      const closestListbot = event.target.closest('.listbot');

      if (clickedList && closestListbot) {
        const itemId = clickedList.id;
        const foundBot = bots.find((bot) => bot.id.toString() === itemId);

        if (foundBot) {
          const botUrl = foundBot.img.toString();
          const botName = foundBot.nom.toString();
          this.isClicked = true;

          userNavbar(botUrl, botName);
          this.render();
        }
      }
    });
  };

  render() {
    let content = '';
    if (!this.isClicked) {
      content = acceuil();
    } else {
      content = viewMessageContainer();
    }

    const html = `
      <div id="page" class="row col-12">
        <div class="gauche col-3 ">
          ${viewBotUserContainer()}
        </div>
        <div class="droites col-9 ">
          ${content}
        </div>
      </div>
    `;

    this.el.innerHTML = html;
  }

  run() {
    this.render();
    this.handleItemClick();
  }
}

export default Chatbot;
