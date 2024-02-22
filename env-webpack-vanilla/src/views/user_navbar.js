// 'isClicked' is declared but not used in this file, so we'll remove it
// let isClicked = false;

function BotenCours(id) {
  // Since 'isClicked' is no longer used, we don't need to set it here
  // isClicked = true;
  const element = document.getElementById(id);
  if (element) {
    const imageUrl = element.querySelector('img').getAttribute('src');
    const name = element.querySelector('h5').innerText;
    return { imageUrl, name };
  }
}

export default (id) => {
  const user = BotenCours(id);
  if (!user) return '';
  // Since 'isClicked' is no longer used, we'll remove the assignment to it
  // localStorage.setItem('isClicked', true);
  return `
    <div class="col-12">
      <div class="user row align-items-center">
        <div class="col-md-1">
          <img src="${user.imageUrl}" alt="" class="rounded-circle" style="width: 70px; height: 70px;">
        </div>
        <div class="col-md-8">
          <h5>${user.name}</h5>
        </div>
      </div>
    </div>
  `;
};
