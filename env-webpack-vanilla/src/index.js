import Router from './Router';
import chatbot from './controllers/chatbot';

import './index.scss';

const routes = [{
  url: '/',
  controller: chatbot
}];

new Router(routes);
