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
        document.getElementById('item-grid').appendChild(createItem(ingredients[i],i));
    }
}



document.getElementsByClassName('new-ingredient')[0].addEventListener('click',function() {openModal({id:'edit-item',header:'New Ingredient'},dataPrefab.emptyIngredient)});