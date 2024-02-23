import bot_message from './botmessage';
import user_message from './user.message';
import user_navbar from './user_navbar';
import message_bar from './message_bar';

export default () => (`
<!-- Barre haut -->
${user_navbar()}
<!-- Fin barre haut -->

<!-- Contenu des messages utilisateur et bot -->

<div class="message-container">
  ${bot_message()} 
  ${user_message()} 
</div>

<!-- Fin des messages utilisateur et bot -->

<!-- Barre de messages -->

${message_bar()}

<!-- Fin de la barre de messages -->
`);
