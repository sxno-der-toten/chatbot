import viewPage from '../views/page';

const Home = class {
  constructor(params) {
    this.el = document.querySelector('#root');
    this.params = params;

    this.run();
  }

  render() {
    return `
      ${viewPage(`
        <h1>Hello Home</h1>
      `)}
    `;
  }

  run() {
    this.el.innerHTML = this.render();
  }
};

export default Home;
