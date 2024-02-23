import { afficher } from './list-bot';

export default (id) => {
  const resultat = afficher(id);

  const nomDuBot = resultat.nomBot;
  const urlDuBot = resultat.urlBot;

  return (`
    <div class="col-12" id="user_navbar">
      <div class="user row align-items-center">
        <div class="col-md-1">
          <img src="${urlDuBot}" alt="" class="rounded-circle" style="width: 70px; height: 70px;">
        </div>
        <div class="col-md-8">
          <h5>${nomDuBot}</h5>
        </div>
      </div>
    </div>
  `);
};
