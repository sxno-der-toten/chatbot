let isClicked = false;

function BotenCours(id) {

    isClicked = true;

    let element = document.getElementById(id);

    
    if (element) {
   
        let imageUrl = element.querySelector('img').getAttribute('src');
        let name = element.querySelector('h5').innerText;

        return { imageUrl, name };
    }
}

localStorage.setItem('isClicked', isClicked);

export default () => (`
<div class="col-12">
    <div class="user row align-items-center">
        <div class="col-md-1">
            <img src="${BotenCours('id').imageUrl}" alt="" class="rounded-circle" style="width: 70px; height: 70px;">
        </div>
        <div class="col-md-8">
            <h5>${BotenCours('id').name}</h5>
        </div>
    </div>
</div>
`); 

