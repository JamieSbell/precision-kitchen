let searchButton = document.getElementsByClassName('search-button')[0];
searchButton.addEventListener('click',function() {
    searchOFF({search:document.getElementsByClassName('search-field')[0].value});
});

//Save ingredient to local storage with the data in the add-ingredient modal
function submitInfo() {
    let data = {
        name: document.getElementById('name').value,
        tags: document.getElementById('tags').value.split(','),
        amount: Number(document.getElementById('amount').value),
        protein: Number(document.getElementById('protein').value),
        carbs: Number(document.getElementById('carbs').value),
        fiber: Number(document.getElementById('fiber').value),
        fat: Number(document.getElementById('fat').value),
        unit: document.getElementById('unit').value,
    };
    //convert ounces to grams
    if (data.unit == 'oz') {
        data.amount = convert.ozToGrams(amount);
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
    amount = document.getElementById('amount').value = '';
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
    localStorage.setItem('currentResults',JSON.stringify(data));
    document.body.removeChild(document.getElementById('search-results'));
    let container = document.createElement('div');
    container.setAttribute('id','search-results');
    container.setAttribute('state','load');
    document.body.appendChild(container);
    for (let i = 0; i < data.products.length; i++) {
        let product = data.products[i];
        let nutriments = product.nutriments;
        let itemInfo = {
            name: product.product_name_en,
            amount:100,
            unit:'g',
            producer: product.brands,
            image: product.image_front_url,
            protein: nutriments.proteins_100g,
            carbs: nutriments.carbohydrates_100g,
            fiber: nutriments.fiber_100g,
            fat: nutriments.fat_100g,
            tags: product.categories_tags
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
    item.setAttribute('item-data',JSON.stringify(data));

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
        editButton.addEventListener('click',function() {openModal({id:'edit-item',header:'Edit Ingredient'},{
            name:getItemProperty(editButton.closest('.item'),'name'),
            tags:getItemProperty(editButton.closest('.item'),'tags'),
            unit:getItemProperty(editButton.closest('.item'),'unit'),
            amount:getItemProperty(editButton.closest('.item'),'amount'),
            protein:getItemProperty(editButton.closest('.item'),'protein'),
            carbs:getItemProperty(editButton.closest('.item'),'carbs'),
            fiber:getItemProperty(editButton.closest('.item'),'fiber'),
            fat:getItemProperty(editButton.closest('.item'),'fat'),
            image:'url("' + getItemProperty(editButton.closest('.item'),'image') + '")',
            producer:getItemProperty(editButton.closest('.item'),'producer')
        })
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