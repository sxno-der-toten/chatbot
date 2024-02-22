import viewPage from '../views/page';

const Home = class {
  constructor(params, pageView) {
    this.el = document.querySelector('#root');
    this.params = params;
    this.pageView = pageView;

    this.run();
  }

  render() {
    return viewPage(`
    `);
  }

  run() {
    const content = this.render();
    this.el.innerHTML = content;
  }
};

export default Home;
