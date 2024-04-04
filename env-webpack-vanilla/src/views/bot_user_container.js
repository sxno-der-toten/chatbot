import listBots from './list-bot';

export default async function botUserContainer() {
  const botListHTML = await listBots();
  return `
    <!--partie gauche -->
    <div class='lgo'>
      <img class='logo' src='https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA0L3Y5MzItbmluZy01NS5wbmc.png' alt='logo'>
    </div>
    <div class='dis'>
      <h2 class=''>Discussions</h2>
      <div id='rech' class='container mt-2'>
        <form class='d-flex'>
          <input class='form-control me-2' type='search' placeholder='Search' aria-label='Search'>
          <button class='btn btn-outline-primary' type='submit'>
            <i class='fas fa-search'></i> 
          </button>
        </form>
      </div>
    </div>
    ${botListHTML} <!-- Insérer le HTML des bots une fois la promesse résolue -->
    <!-- fin partie gauche -->
  `;
}
