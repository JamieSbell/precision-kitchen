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
//Search Open Food Facts db
//Make sure to change url to .org when MVP is launched
function searchOFF(data){
    if (data.search == '') {alert('You cannot perform an empty search.');}
    else {
        fetch('https://us.openfoodfacts.net/api/v2/search?product_type=food&categories_tags_en=' + data.search, {
    method: 'GET',
    headers: { 
        Authorization: 'Basic ' + btoa('off:off'),
        //Custom_User_Agent: 'JamieSBell/Precision.Kitchen (jamie.samantha.bell@gmail.com)'
    },})
    .then(response => response.json())
    .then(json => displaySearchResults(json))
    }
}
//Iterates the data from OFF and builds an element for each entry
function displaySearchResults(data) {
    localStorage.setItem('currentResults',data);
    let oldContainer = document.getElementById('search-results');
    document.body.removeChild(oldContainer);
    let container = document.createElement('div');
    container.setAttribute('id','search-results');
    container.setAttribute('state','load');
    document.body.appendChild(container);
    for (let i = 0; i < data.products.length; i++) {
        let product = data.products[i];
        console.log(product);
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
    icon.style.backgroundImage = 'url("' + data.image + '")';

    let textContainer = document.createElement('div');
    textContainer.setAttribute('class','container');

    let label = document.createElement('button');
    label.setAttribute('type','button');
    label.setAttribute('class','label');
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

        let addButton = document.createElement('button');
        addButton.setAttribute('type','button');
        addButton.setAttribute('class','add');

    item.appendChild(icon);
    textContainer.appendChild(label);
    textContainer.appendChild(tags);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(addButton);
    item.appendChild(textContainer);
    item.appendChild(buttonContainer);

    return(item);
}