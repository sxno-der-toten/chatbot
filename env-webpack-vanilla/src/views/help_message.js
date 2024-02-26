import { help_1 } from './help';
import { help_2 } from './help';
import { help_3 } from './help';

export default (image, heure, help_num) => {
    let helpArray;
    
    // Assign the appropriate help array based on help_num
    if (help_num === '1') {
        helpArray = help_1;
    } else if (help_num === '2') {
        helpArray = help_2;
    } else if (help_num === '3') {
        helpArray = help_3;
    } else {
        // Handle if help_num is invalid
        return '<div>Error: Invalid help number</div>';
    }

    // Construct the HTML content
    return `
    <div class="col-5 m-3">
        <div class="mssga">
            <div class="mb-1 d-flex">
                <img src="${image}" alt="" class="rounded-circle" style="width: 50px; height: 50px;">
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="card" style="width: 18rem;">
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
