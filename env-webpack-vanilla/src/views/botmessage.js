export default (image, message, heure) => (`
<div class=" col-5">
    <div class="mssga">
        <div class="mb-1 d-flex">
            <img src="${image}" alt="" class="rounded-circle" style="width: 50px; height: 50px;">
        </div>
        <div class="card">
            <div class="card-body">
                <div>
                    <p>
                        <p>${message}</p>
                    </p>
                </div>
                <div class="d-flex justify-content-end">
                    <div class="mt-2"><p>${heure}</p></div>
                </div>
            </div>
        </div>
    </div>
</div>



`);
