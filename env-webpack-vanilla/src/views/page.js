import viewBotUserContainer from './bot_user_container';
import viewMessageContainer from './message_container';

export default () => (`
<div id="page" class="row col-12">
<div class="gauche col-3 ">
${viewBotUserContainer()}
</div>
<div class="droites col-9 ">
${viewMessageContainer()}
</div>

</div>
`);
