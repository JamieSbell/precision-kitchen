/**
 * A data object that stores prefabs of HTML elements that are used throughout Precision Kitchen. Currently empty, but it's being stored for future use.
 */
const elementPrefeb = {
    modal:0,
    alert:0,
    savedIngredient:0,
    savedRecipe:0,
    ingredientSearchResult:0,
    recipeSearchResult:0,
    searchBox:0,
    navBar:0,
    pageFooter:0,
    panel:0,
    hero:0,
    button:0,
}

/**
 * A function that creates an HTML element representing an ingredient from the user's localStorage.
 * @param {object} data a data object containing all the information needed to create a new item
 * @param {number} id a number that indicates where in the localStorage ingredients array this ingredient is located.
 * @returns a single ingredient element.
 */
function createItem(data,id) {
    
    data.id = id;
    let container = document.createElement('div');
    container.setAttribute('class','item');
    container.setAttribute('item-data',JSON.stringify(data));

    let icon = document.createElement('button');
    icon.setAttribute('type','button');
    icon.setAttribute('class','item-icon');
    icon.setAttribute('fx','button-fx');
    icon.addEventListener('click', function() {openModal({id:'edit-item',header:'Edit Ingredient'},JSON.parse(container.getAttribute('item-data')))});
    icon.style.backgroundImage = data.image;

    let label = document.createElement('h4');

    label.appendChild(document.createTextNode(data.name));
    container.appendChild(icon);
    icon.appendChild(label);
    return(container);
}

/**
 * Calls a function to create a modal element if the current page doesn't have the requested modal. If the page contains the requested modal, then the modal is opened instead.
 * @param {object} data A data object containing all the data to create or open a modal.
 */
function openTheModal(data) {
    if (document.getElementById(data.modalId) === undefined) {
        document.body.appendChild(createModal(data));
    }
        let modal = document.getElementById(data.modalId);

}

function createModal(data) {
    let modal = document.createElement('div');
    modal.setAttribute('class','modal');
    modal.setAttribute('id',data.modalId);
    modal.setAttribute('state','closed');

    let header = document.createElement('div');
    header.setAttribute('class','header');

    let content = document.createElement('div');
    content.setAttribute('class','content');

    let footer = document.createElement('div');
    footer.setAttribute('class','footer');

    let headerLabel = document.createElement('h2');
    headerLabel.setAttribute('class','label');

    let xButton = document.createElement('button');
    xButton.setAttribute('type','button');

    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);

    header.appendChild(headerLabel);
    header.appendChild(xButton);

    modal = fillModal(data, modal, header, content, footer);
    return data.modal;
}

function fillModal(data, modal, header, content, footer) {
    header.getElementsByClassName('label')[0].textContent = data.headerText;
    let button1 = document.createElement('button');
    button1.setAttribute('type','button');
    let button2 = button1;
    button1.setAttribute('class','primary');
    button2.setAttribute('class','secondary');


}

