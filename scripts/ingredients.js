localStorage.setItem('ingredients',JSON.stringify([{name:'hi'},{name:'no'}]));

function searchLocalDatabase(data) {
    if (data.category == 'ingredients') {searchLocalIngredients(data)}
}

function searchLocalIngredients(data) {
    let ingredients = JSON.parse(localStorage.getItem('ingredients'));
    let item = ingredients.find((obj) => data.searchTerm == obj.name);

}

if (document.getElementById('item-grid').getAttribute('state') == 'default-empty') {
    let ingredients = JSON.parse(localStorage.getItem('ingredients'));
    for (let i = 0; i < ingredients.length; i++) {
        document.getElementById('item-grid').appendChild(createItem(ingredients[i]));
    }
}

function createItem(data) {
    let container = document.createElement('div');
    container.setAttribute('class','item');

    let icon = document.createElement('button');
    icon.setAttribute('type','button');
    icon.setAttribute('class','item-icon');
    icon.setAttribute('fx','button-fx');

    let label = document.createElement('h4');

    label.appendChild(document.createTextNode(data.name));
    container.appendChild(icon);
    container.appendChild(label);
    return(container);
}