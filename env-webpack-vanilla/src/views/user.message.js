export default (message, heure) => (`
<div class="col-5 mt-3 offset-7">
    <div id="aa" class="card offset">
        <div class='m-3'>
            <p>
                <p>${message}</p>
            </p>
        </div>
        <div class="m-3"><p>${heure}</p></div>
    </div>
</div>

`);
