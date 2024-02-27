import { HELP_1 } from './help';
import { HELP_2 } from './help';
import { HELP_3 } from './help';

export default (image, heure, help_num) => {
  let helpArray;

  if (help_num === '1') {
    helpArray = HELP_1;
  } else if (help_num === '2') {
    helpArray = HELP_2;
  } else if (help_num === '3') {
    helpArray = HELP_3;
  } else {
    return '<div>Error: Invalid help number</div>';
  }

  return `
  <div class="col-5 m-3">
      <div class="mssga">
          <div class="mb-1 d-flex">
              <img src="${image}" alt="" class="rounded-circle" style="width: 50px; height: 50px;">
          </div>
          <div class="card">
              <div class="card-body">
                  <div class="card">
                      <div class="card-header">
                          Help commande
                      </div>
                      <ul class="list-group list-group-flush">
                          ${helpArray.map(item => `<li class="list-group-item">${item.message}</li>`).join('')}
                      </ul>
                  </div>
                  <div class="d-flex justify-content-end">
                      <div class="mt-2"><p>${heure}</p></div>
                  </div>
              </div>
          </div>
      </div>
  </div>
 `;
};
