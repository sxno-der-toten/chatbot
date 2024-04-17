export default ({
  id,
  img,
  nom,
  mssg
}) => (
  `
  <div class="listbot row">
    <div id="${id}" class="list container"> 
        <div class="row align-items-center">
            <div class="d-flex">
                <img src="${img}" alt="" class="m-3 rounded-circle" style="width: 70px; height: 70px;">
                <div class="text-container">
                    <div class="mt-3">
                        <h5>${nom}</h5>
                        <p class='messageTaille'>${mssg.length > 20 ? mssg.slice(0, 20) + '...' : mssg}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  `
);
