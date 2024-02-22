import bot from './bot';

const bots = [
  {
    id :1,
    img:'https://img.freepik.com/free-photo/portrait-young-businessman-with-mustache-glasses-3d-rendering_1142-51509.jpg?t=st=1708592714~exp=1708596314~hmac=1a841d989467e4d72792e0f9db33ed4b5e1c8e8e28bec45d0f32a1be56ee9537&w=996',
    nom: 'David',
    mssg: 'yes, I am here'
  },
  {
    id :2,
    img:'https://img.freepik.com/free-photo/portrait-young-woman-wearing-glasses-3d-rendering_1142-43632.jpg?t=st=1708592681~exp=1708596281~hmac=b239405300f7d0868c3151b8057711e22659240ec8bca65d9b0e58332fc3e4f7&w=996',
    nom: 'Sarah',
    mssg: 'yes'
  },
  {
    id :3,
    img:'https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-stylish-hairstyle-glasses_1142-40217.jpg?t=st=1708592739~exp=1708596339~hmac=e9804009dfaf7bd25bc5c0a04081cfaed52e4ead05eac9236e1ed84c97429091&w=996',
    nom: 'Alexa',
    mssg: 'I am here'
  }
];

export default () => (
  `<div class="bot-container mt-3">
    ${bots.map(botData => bot(botData)).join('')}
  </div>`
);