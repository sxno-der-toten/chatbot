import bot_message from './botmessage';
import user_message from './user.message';
import user_navbar from './user_navbar';
import message_bar from './message_bar';
import acceuil from './acceuil';

let content;

const isClicked = false;

if (isClicked) {
  content = `
    <!-- Barre haut -->
    ${user_navbar()}
    <!-- Fin barre haut -->

    <!-- Contenu des messages utilisateur et bot -->
    <div class="message-container">
      ${bot_message()} <!-- Affichage du message du bot -->
      ${user_message()} <!-- Affichage du message de l'utilisateur -->
    
    <!-- Fin des messages utilisateur et bot -->

    <!-- Barre de messages -->
    ${message_bar()}
    <!-- Fin de la barre de messages -->
  `;
} else {
  content = `
    <div class="message-container">
      ${acceuil()}
    </div>
  `;
}

export default () => content;
