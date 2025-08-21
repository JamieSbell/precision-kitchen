addEventListener('DOMContentLoaded',function() {
    initializeButtons();
});

const pageData = {
    currentPage:''
}

const dataPrefab = 
{
    emptyIngredient: 
        {
            name:'',
            tags:'',
            unit:'g',
            amount:100,
            protein:0,
            carbs:0,
            fiber:0,
            fat:0,
            producer:'',
            id: getNewId('ingredients')
        },
    defaultImage:'url("resources/default.png")',
    draftRecipe: function(data) {
        return {
            name:data.name,
            description:data.description,
            image:data.image,
            ingredientsPlainText:[],
            ingredients:{},
            directions:[],
            startingWeight:0,
            finalWeight:0,
            id: getNewId('recipeDrafts')
        }
    }
}

function getNewId(item) {
    return JSON.parse(localStorage.getItem(item)).length;
}

const convert = {
    ozToGrams: function(oz) {return oz * 28.34952;},
    to100g: function(data) {
        data.protein = Math.floor(data.protein / data.amount * 1000) /10;
        data.carbs = Math.floor(data.carbs / data.amount * 1000) / 10;
        data.fiber = Math.floor(data.fiber / data.amount * 1000) / 10;
        data.fat = Math.floor(data.fat / data.amount * 1000) / 10;
        data.amount = 100;
        return data;
        },
    gramsToOz: function(g) {return g / 28.34952;},
    };

function initializeButtons()
{
    let buttonsArray = document.getElementsByTagName('button');
    for (let i = 0; i < buttonsArray.length; i++){

    let currentButton = buttonsArray[i];

    if (currentButton.getAttribute('class') === 'modal-cancel' || currentButton.getAttribute('class') === 'modal-x') {
        currentButton.addEventListener('click', function() {currentButton.closest('.modal').setAttribute('state','closed');
        toggleCurtain(false);
        })
    }
    if (currentButton.getAttribute('class') === 'modal-continue') {
        if (currentButton.closest('.modal').getAttribute('id') === 'new-recipe') {
                currentButton.addEventListener('click', function() {
                    let modal = this.closest('.modal');
                    let name = modal.getElementsByClassName('recipe-name')[0].value;
                    let description = modal.getElementsByClassName('recipe-description')[0].value;
                    let image = modal.getElementsByClassName('upload-image')[0].style.backgroundImage;
                        newDraftRecipe({
                            'name':name,
                            'description':description,
                            'image':image
                        })
                    closeModal('new-recipe');
                    })
            }
        }

        if (currentButton.getAttribute('class') === 'modal-save') {
            if (currentButton.closest('.modal').getAttribute('id') === 'edit-item') {
                currentButton.addEventListener('click', function() {saveIngredient(
                    {
                        target:currentButton.closest('.modal'),
                        name:0,
                        producer:0,
                        tags:0,
                        unit:0,
                        amount:0,
                        protein:0,
                        carbs:0,
                        fiber:0,
                        fat:0,
                        image:0,
                        id:currentButton.closest('.modal').getAttribute('item-id')
                    })})}}}
}

function toggleCurtain(mode){
    if (mode === false){
        document.body.removeChild(document.getElementById('curtain'));
    }

    if (mode === true){
        let curtain = document.createElement('div');
        curtain.setAttribute('id','curtain');
        document.body.appendChild(curtain);
    }
}

function showElement(element,data) {
    if (element === 'alert') {
        document.getElementById('alert').children[0].textContent = data.message;
        document.getElementById('alert').setAttribute('state','open');
    }
}

function openModal(modalData,prefillData) {
    let modal = document.getElementById(modalData.id);
    modal.setAttribute('item-id',prefillData.id);
    if (modalData.header !== undefined) {modal.getElementsByClassName('modal-label')[0].textContent = modalData.header}

    if (modalData.id === 'edit-item') {
        openModal_editItem(prefillData,modal);
    }

    if (modalData.id === 'new-recipe') {
        openModal_newRecipe(prefillData,modal);
    }
    
    modal.setAttribute('state','open');
    toggleCurtain(true);
}

function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.setAttribute('state','closed');
    toggleCurtain(false);
}
function getItemProperty(item,property) {
    let data = JSON.parse(item.getAttribute('item-data'));
    return data[property];
}

function saveIngredient(data) {
    let target = data.target;
    let container = target.getElementsByClassName('container')[2];
    data.name = container.getElementsByClassName('item-name')[0].value;
    data.tags = data.target.getElementsByClassName('tag')[0].value;
    data.amount = data.target.getElementsByClassName('amount')[0].value;
    data.unit = data.target.getElementsByClassName('unit')[0].value;
    data.protein = data.target.getElementsByClassName('protein')[0].value;
    data.carbs = data.target.getElementsByClassName('carbs')[0].value;
    data.fiber = data.target.getElementsByClassName('fiber')[0].value;
    data.fat = data.target.getElementsByClassName('fat')[0].value;
    data.image = data.target.getElementsByClassName('upload-image')[0].style.backgroundImage;
    delete data.target;

    if (data.unit !== 'g') {
        data.amount = convert.ozToGrams(amount);
        data.protein = convert.ozToGrams(protein);
        data.carbs = convert.ozToGrams(carbs);
        data.fiber = convert.ozToGrams(fiber);
        data.fat = convert.ozToGrams(fat);
        data.unit = 'g';
    }
    data = convert.to100g(data);

    let oldData = JSON.parse(localStorage.getItem('ingredients'));
    data = [data];
    if (oldData === null) {
        localStorage.setItem('ingredients', JSON.stringify(data));
    }
    if (data[0].id === oldData.length) {
        localStorage.setItem('ingredients', JSON.stringify(oldData.concat(data)));
    }
    else {
        if (pageData.currentPage === 'ingredients') {
            refreshElement(document.getElementsByClassName('item')[data[0].id],data[0]);
        }
        oldData[data[0].id] = data[0];
        delete oldData[data[0].id].id;
        localStorage.setItem('ingredients', JSON.stringify(oldData));
    }
    document.getElementById('edit-item').setAttribute('state','closed');
    toggleCurtain(false);
}

function updateChooserImage() {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementsByClassName('upload-image')[0].style.backgroundImage = 'url("' + e.target.result + '")';
    };
    reader.readAsDataURL(document.getElementsByClassName('upload-image')[0].files[0]);
}

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

function refreshElement(element,data) {
    if (element === undefined) {
        document.getElementById('item-grid').appendChild(createItem(data,data.id));
    }

    else if (element.getAttribute('class') === 'item') {
        document.getElementsByClassName('item')[data.id].replaceWith(createItem(data,data.id));
    }
}

function searchLocalDatabase(data) {
    if (data.category == 'ingredients') {searchLocalIngredients(data)}
}

function searchLocalIngredients(data) {
    let ingredients = JSON.parse(localStorage.getItem('ingredients'));
    let item = ingredients.find((obj) => data.searchTerm == obj.name);
}

function openModal_editItem(prefillData,modal) {
    let container1 = modal.getElementsByClassName('container')[0];
    let container2 = modal.getElementsByClassName('container')[2];
    if (prefillData.image !== undefined) {
        container1.getElementsByClassName('upload-image')[0].style.backgroundImage = prefillData.image;
    }
    else {
        container1.getElementsByClassName('upload-image')[0].style.backgroundImage = dataPrefab.defaultImage;
        container1.getElementsByClassName('upload-image')[0].files[0] = undefined;
    }

    container2.getElementsByClassName('item-name')[0].value = prefillData.name;
    container2.getElementsByClassName('tag')[0].value = prefillData.tags;
    container2.getElementsByClassName('amount')[0].value = prefillData.amount;
    container2.getElementsByClassName('unit')[0].value = prefillData.unit;
    container2.getElementsByClassName('protein')[0].value = prefillData.protein;
    container2.getElementsByClassName('carbs')[0].value = prefillData.carbs;
    container2.getElementsByClassName('fiber')[0].value = prefillData.fiber;
    container2.getElementsByClassName('fat')[0].value = prefillData.fat;

}

function openModal_newRecipe(prefillData) {
    
}

function newDraftRecipe(data) {
    let oldData = JSON.parse(localStorage.getItem('recipeDrafts'));
    if (oldData === null) {
        oldData = '[]';
        localStorage.setItem('recipeDrafts',oldData);
    }

    if (oldData !== null) {
        newData = [dataPrefab.draftRecipe(data)];
        localStorage.setItem('recipeDrafts',JSON.stringify(JSON.parse(oldData).concat(newData)));
    }

    localStorage.setItem('currentRecipe',JSON.stringify({category:'recipeDrafts',id:JSON.parse(localStorage.getItem('recipeDrafts')).length}));
}