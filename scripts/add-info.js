addEventListener('DOMContentLoaded',function() {
    initializeButtons();
})

let searchButton = document.getElementsByClassName('search-button')[0];
searchButton.addEventListener('click',function() {
    searchOFF({search:document.getElementsByClassName('search-field')[0].value});
});
//The convert object is basically just a table of formulas and functions for converting unit values or formatting.
    const convert = {
        ozToGrams: function(oz) {return oz * 28.34952;},
        to100g: function(data) {
            data.protein = Math.floor(data.protein / data.serving * 1000) /10;
            data.carbs = Math.floor(data.carbs / data.serving * 1000) / 10;
            data.fiber = Math.floor(data.fiber / data.serving * 1000) / 10;
            data.fat = Math.floor(data.fat / data.serving * 1000) / 10;
            data.serving = 100;
            return(data);
        },
        gramsToOz: function(g) {return oz / 28.34952;},
    };
//Save ingredient to local storage with the data in the add-ingredient modal
function submitInfo() {
    let data = {
        name: document.getElementById('name').value,
        tags: document.getElementById('tags').value.split(','),
        serving: Number(document.getElementById('serving').value),
        protein: Number(document.getElementById('protein').value),
        carbs: Number(document.getElementById('carbs').value),
        fiber: Number(document.getElementById('fiber').value),
        fat: Number(document.getElementById('fat').value),
        unit: document.getElementById('unit').value,
    };
    //convert ounces to grams
    if (data.unit == 'oz') {
        data.serving = convert.ozToGrams(serving);
        data.protein = convert.ozToGrams(protein);
        data.carbs = convert.ozToGrams(carbs);
        data.fiber = convert.ozToGrams(fiber);
        data.fat = convert.ozToGrams(fat);
        data.unit = 'g';
    }
    data = convert.to100g(data);
    delete data.unit;

    let ingredientsData = JSON.parse(localStorage.getItem('ingredients'));
    let content = ingredientsData.content;
    ingredientsData.content = content.concat(data);
    localStorage.setItem('ingredients',JSON.stringify(ingredientsData));

    reset();
}

function reset() {
    document.getElementById('name').value = '';
    tags = document.getElementById('tags').value = '';
    serving = document.getElementById('serving').value = '';
    protein = document.getElementById('protein').value = '';
    carbs = document.getElementById('carbs').value = '';
    fiber = document.getElementById('fiber').value = '';
    fat = document.getElementById('fat').value = '';
}
//Search Open Food Facts db
//Make sure to change url to .org when MVP is launched
function searchOFF(data){
    if (data.search == '') {alert('You cannot perform an empty search.');}
    else {
        fetch('https://us.openfoodfacts.net/api/v2/search?product_type=food&categories_tags_en=' + data.search, {
    method: 'GET',
    headers: { 
        Authorization: 'Basic ' + btoa('off:off'),
    },})
    .then(response => response.json())
    .then(json => displaySearchResults(json))
    }
}
//Iterates the data from OFF and builds an element for each entry
function displaySearchResults(data) {
    //Saving the OFF data to local storage for future use. Items will refer back to this data.
    //This data should also be an array, saving each page in a search to an index to reduce OFF requests and improve loading time.
    localStorage.setItem('currentResults',data);
    document.body.removeChild(document.getElementById('search-results'));
    let container = document.createElement('div');
    container.setAttribute('id','search-results');
    container.setAttribute('state','load');
    document.body.appendChild(container);
    for (let i = 0; i < data.products.length; i++) {
        let product = data.products[i];
        let nutriments = product.nutriments;
        let itemInfo = {
            name: product.product_name,
            producer: 'Placeholder Producer',
            image: product.image_front_url,
            protein: nutriments.proteins_100g,
            carbs: nutriments.carbohydrates_100g,
            fiber: nutriments.fiber_100g,
            fat: nutriments.fat_100g,
            tags:['Placeholder','uwu daddy']
        };
        let item = createSearchItem(itemInfo);
        container.appendChild(item);
    }
    container.setAttribute('state','loaded');
}
//Constructs an item element with data passed from displaySearchResults()
function createSearchItem(data) {
    let item = document.createElement('div');
    item.setAttribute('class','item');

    let icon = document.createElement('button');
    icon.setAttribute('type','button');
    icon.setAttribute('class','icon');
    icon.setAttribute('fx','hover-fx');
    icon.style.backgroundImage = 'url("' + data.image + '")';

    let textContainer = document.createElement('div');
    textContainer.setAttribute('class','container');

    let label = document.createElement('button');
    label.setAttribute('type','button');
    label.setAttribute('class','label');
    label.setAttribute('fx','hover-fx');
    label.appendChild(document.createTextNode(data.name));

    let tags = document.createElement('div');
    tags.setAttribute('class','tags');
        for (let i = 0; i < data.tags.length; i++) {
            let tag = document.createElement('span');
            tag.setAttribute('class','tag');
            tag.appendChild(document.createTextNode(data.tags[i]));
            tags.appendChild(tag);
        }
    
    let buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class','container');

        let editButton = document.createElement('button');
        editButton.setAttribute('type','button');
        editButton.setAttribute('class','edit');
        editButton.setAttribute('fx','hover-fx');
        editButton.addEventListener('click',function() {openModal('edit-item',{name:'hi',tags:'wawa',amount:10,protein:1,carbs:2,fiber:1,fat:3})
        });

        let addButton = document.createElement('button');
        addButton.setAttribute('type','button');
        addButton.setAttribute('class','add');
        addButton.setAttribute('fx','hover-fx');

    item.appendChild(icon);
    item.appendChild(textContainer);
    item.appendChild(buttonContainer);
    textContainer.appendChild(label);
    textContainer.appendChild(tags);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(addButton);

    return(item);
}

function initializeButtons()
{
    let buttonsArray = document.getElementsByTagName('button');
    for (let i = 0; i < buttonsArray.length; i++){

    let currentButton = buttonsArray[i];

    if (currentButton.getAttribute('class') == 'modal-cancel' || currentButton.getAttribute('class') == 'modal-x') {
        currentButton.addEventListener('click', function() {currentButton.closest('.modal').setAttribute('state','closed');
        toggleCurtain(false);
        })
    }

        if (currentButton.getAttribute('class') == 'modal-save') {
            if (currentButton.closest('.modal').getAttribute('id') == 'edit-item') {
                currentButton.addEventListener('click', function() {saveIngredient(
                    {
                        target:currentButton.closest('.modal'),
                        name:0,producer:0,tags:0,unit:0,serving:0,protein:0,carbs:0,fiber:0,fat:0,
                        images:{front:0,barcode:0,nutritionLabel:0,back:0,ingredients:0}
                    })})}}}
}


function toggleCurtain(mode){
    if (mode == false){
        document.body.removeChild(document.getElementById('curtain'));
    }

    if (mode == true){
        let curtain = document.createElement('div');
        curtain.setAttribute('id','curtain');
        document.body.appendChild(curtain);
    }
}
function saveIngredient(data) {
    let target = data.target;
    let container = target.getElementsByClassName('container')[2];
    data.name = container.getElementsByClassName('item-name')[0].value;
    data.tags = data.target.getElementsByClassName('tag')[0].value;
    data.serving = data.target.getElementsByClassName('amount')[0].value;
    data.unit = data.target.getElementsByClassName('unit')[0].value;
    data.protein = data.target.getElementsByClassName('protein')[0].value;
    data.carbs = data.target.getElementsByClassName('carbs')[0].value;
    data.fiber = data.target.getElementsByClassName('fiber')[0].value;
    data.fat = data.target.getElementsByClassName('fat')[0].value;

    document.getElementById('edit-item').setAttribute('state','closed');
    toggleCurtain(false);
    showElement('alert',{message:'Ingredient saved successfully!'});
}

function showElement(element,data) {
    if (element == 'alert') {
        document.getElementById('alert').children[0].textContent = data.message;
        document.getElementById('alert').setAttribute('state','open');
    }
}

function openModal(modalId,data) {
    let modal = document.getElementById(modalId);
    let container = modal.getElementsByClassName('container')[2];

    container.getElementsByClassName('item-name')[0].value = data.name;
    container.getElementsByClassName('tag')[0].value = data.tags;
    container.getElementsByClassName('amount')[0].value = data.amount;
    container.getElementsByClassName('unit')[0].value = data.unit;
    container.getElementsByClassName('protein')[0].value = data.protein;
    container.getElementsByClassName('carbs')[0].value = data.carbs;
    container.getElementsByClassName('fiber')[0].value = data.fiber;
    container.getElementsByClassName('fat')[0].value = data.fat;

    modal.setAttribute('state','open');
    toggleCurtain(true);




}

function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.setAttribute('state','closed');
    toggleCurtain(false);
}