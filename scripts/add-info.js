let submit = document.getElementById('submit');
submit.addEventListener('click',function() {submitInfo();})

let searchButton = document.getElementById('search-button');
let searchValue = document.getElementById('search');
searchButton.addEventListener('click',function() {searchOFF({search:searchValue.value});})

const convert = {
    ozToGrams: function(oz) {return oz * 28.34952;},
    To100g: function(data) {
        data.protein = Math.floor(data.protein / data.serving * 1000) /10;
        data.carbs = Math.floor(data.carbs / data.serving * 1000) / 10;
        data.fiber = Math.floor(data.fiber / data.serving * 1000) / 10;
        data.fat = Math.floor(data.fat / data.serving * 1000) / 10;
        data.serving = 100;
        return(data);
    },
};

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

    if (data.unit == 'imperial-weight') {
        data.serving = convert.ozToGrams(serving);
        data.protein = convert.ozToGrams(protein);
        data.carbs = convert.ozToGrams(carbs);
        data.fiber = convert.ozToGrams(fiber);
        data.fat = convert.ozToGrams(fat);
        data.unit = 'metric-weight';
    }

    data = convert.To100g(data);

    delete data.unit;

    let ingredientsData = JSON.parse(localStorage.getItem('ingredients'));
    let content = ingredientsData.content;
    ingredientsData.content = content.concat(data);
    localStorage.setItem('ingredients',JSON.stringify(ingredientsData));

    reset();
}

function reset() {
    let name = document.getElementById('name');
    let tags = document.getElementById('tags');
    let serving = document.getElementById('serving');
    let protein = document.getElementById('protein');
    let carbs = document.getElementById('carbs');
    let fiber = document.getElementById('fiber');
    let fat = document.getElementById('fat');

    name.value = '';
    tags.value = '';
    serving.value = '';
    protein.value = '';
    carbs.value = '';
    fiber.value = '';
    fat.value = '';

}

function searchOFF(data){
    if (data.search == '') {alert('You cannot perform an empty search.');}
    else {
        fetch('https://us.openfoodfacts.net/api/v2/search?product_type=food&categories_tags_en=' + data.search, {
    method: 'GET',
    headers: { 
        Authorization: 'Basic ' + btoa('off:off')
    },})
    .then(response => response.json())
    .then(json => displaySearchResults(json))
    }
}

function displaySearchResults(data) {
    localStorage.setItem('currentResults',data);
    let container = document.getElementById('search-results');
    delete document.getElementById('search-results').children;
    for (let i = 0; i < data.products.length; i++) {
        let product = data.products[i];
        console.log(product);
        let nutriments = product.nutriments;
        let itemInfo = {
            name: product.product_name,
            image: product.image_front_url,
            protein: nutriments.proteins_100g,
            carbs: nutriments.carbohydrates_100g,
            fiber: nutriments.fiber_100g,
            fat: nutriments.fat_100g,
        };
        let item = createSearchItem(itemInfo);
        container.appendChild(item);
    }
}

function createSearchItem(data) {
    let item = document.createElement('div');
    item.setAttribute('class','item');
    let icon = document.createElement('div');
    icon.setAttribute('class','icon');
    icon.style.backgroundImage = 'url("' + data.image + '")';
    let name = document.createElement('h3');
    name.appendChild(document.createTextNode(data.name));
    let addItem = document.createElement('button');
    addItem.setAttribute('type','button');
    addItem.setAttribute('class','add-item-button')
    let macros = document.createElement('div');
    macros.setAttribute('class','nutrients')
    let protein = document.createElement('h4');
    protein.setAttribute('class','macro');
    protein.appendChild(document.createTextNode('Protein: '));
    protein.appendChild(document.createTextNode(data.protein));
    let carbs = document.createElement('h4');
    carbs.setAttribute('class','macro');
    carbs.appendChild(document.createTextNode('Carbs: '));
    carbs.appendChild(document.createTextNode(data.carbs));
    let fiber = document.createElement('h4');
    fiber.setAttribute('class','macro');
    fiber.appendChild(document.createTextNode('Fiber: '));
    fiber.appendChild(document.createTextNode(data.fiber));
    let fat = document.createElement('h4');
    fat.setAttribute('class','macro');
    fat.appendChild(document.createTextNode('Fat: '));
    fat.appendChild(document.createTextNode(data.fat));
    macros.appendChild(protein);
    macros.appendChild(carbs);
    macros.appendChild(fiber);
    macros.appendChild(fat);

    //icon.appendChild(addItem);
    icon.appendChild(name);
    item.appendChild(icon);
    item.appendChild(macros);

    return(item);
}