import bot_message from "./botmessage";
import user_message from "./user.message";

export default () => (`
    <!--barre haut -->
    <div class="col-12">
        <div class="user row align-items-center">
            <div class="col-md-1">
                <img src="https://img.freepik.com/free-photo/portrait-young-businessman-with-mustache-glasses-3d-rendering_1142-51509.jpg?t=st=1708592714~exp=1708596314~hmac=1a841d989467e4d72792e0f9db33ed4b5e1c8e8e28bec45d0f32a1be56ee9537&w=996" alt="" class="rounded-circle" style="width: 70px; height: 70px;">
            </div>
            <div class="col-md-8">
                <h5>David</h5>
            </div>
        </div>
    </div>
    <!--fin barre haut -->

    <!--message user + bot -->
    <div class="message-container">
        ${bot_message()}
        <div id='date' class="d-flex justify-content-center">
            <p id='date'>5min Ago</p>
        </div>
        ${user_message()}
    
    <!--fin mssg user bot -->

    <!--barre mssg -->
    <div class="mssg col-12 pe-0 mx-0">
        <div class="container mt-3">
            <div class="input-group mb-3">
                <input id="message-input" type="text" class="form-control" placeholder="Type your message..." aria-label="Message" aria-describedby="send-button">
                <button id="send-button" class="btn btn-outline-primary" type="button">
                    <i class="fas fa-paper-plane"></i> 
                </button>
            </div>
        </div>
    </div>
    </div>
    <!--fin barre mssg -->
    
`);
