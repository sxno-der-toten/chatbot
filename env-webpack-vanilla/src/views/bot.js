export default ({ img, nom, mssg }) => (`
<div class="row">
  <div class="list container">
    <div class="row align-items-center">
      <div class="col-2  image-container">
        <img src="${img}" alt="" class="m-3 rounded-circle" style="width: 70px; height: 70px;">
      </div>
      <div class="col-9">
        <div class="row text-container">
          <div class="mt-3">
            <h5>${nom}</h5>
            <p>${mssg}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
