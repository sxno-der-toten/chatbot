import viewNav from './nav';

export default (view) => (`
  <div class="container">
    <div class="row">
      <div class="col-12">${viewNav()}</div>
    </div>
    ${view}
  </div>
`);
