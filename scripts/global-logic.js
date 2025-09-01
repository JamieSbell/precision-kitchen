let context;

const PK = {
    currentPage:'',
    currentIngredient:0,
    currentRecipe:0,
    context: {
        action: (action) => {
            
        },
        saveName: () => {
            oldData = JSON.parse(localStorage.getItem('ingredients'));
            newName = context.getElementsByClassName('ingredient-name-input')[0].value;
            oldData[PK.context.data.id].name = newName;
            PK.context.data.name = newName;
            localStorage.setItem('ingredients', JSON.stringify(oldData));
            refreshElement(document.getElementsByClassName('item')[PK.context.data.id],PK.context.data);
            contextMenu({
                menu:'closed',
                elementData:''
                }
            );
        },
        delete: () => { 
            oldData = JSON.parse(localStorage.getItem('ingredients'));
            oldData.splice(PK.context.data.id,1);
            localStorage.setItem('ingredients', JSON.stringify(oldData));
            refreshElement(document.getElementsByClassName('item')[PK.context.data.id],{id:PK.context.data.id,delete:'delete'});
            contextMenu({
                menu:'closed',
                elementData:''
                }
            );
        },
        edit: () => { 
            openModal({id:'edit-item',header:'Edit Ingredient'},PK.context.data)
        },
        addToRecipe: () => { 

        },
        menu:0,
        data:0,
        },
    data: {
        ingredient:0,
        recipe:0,
        meal:0,
        },
    element: {
        navbar: () => {
            let nav = document.createElement('div');
            let home = document.createElement('a');
            let ingredients = document.createElement('a');
            let recipes = document.createElement('a');
            let meals = document.createElement('a');
            let hamburger = document.createElement('a');

            nav.className = 'navbar';

            home.className = 'home-button';
            home.href = 'home.html';
            home.textContent = 'Precision Kitchen';

            ingredients.href = 'ingredients.html';
            ingredients.textContent = 'Ingredients';

            recipes.href = 'recipes.html';
            recipes.textContent = 'Recipes';

            meals.href = 'meals.html';
            meals.textContent = 'Meals';

            hamburger.className = 'hamburger';
            hamburger.textContent = '|||';

            nav.append(home,ingredients,recipes,meals,hamburger);
            return nav;
        },
        alert:0,
        footer:0,
        panel:0,
        search:0,
        context:{

            createMenu: () => {
                let container = document.createElement('div');
                container.id = 'context-menu';
                container.setAttribute('state','closed');

                container.append(PK.element.context.ingredient(),PK.element.context.body());
                return container;
            },
            ingredient: () => {
                let menu = document.createElement('div');
                menu.className = 'item-context';
                
                let label = document.createElement('input');
                label.type = 'text';
                label.className = 'ingredient-name-input';
                
                let labelButton = document.createElement('button');
                labelButton.type = 'button';
                labelButton.className = 'save-ingredient-name';
                labelButton.onclick = () => {PK.context.saveName()};
                labelButton.textContent = 'Save';
                labelButton.setAttribute('fx','context-item');
                
                labelContainer = document.createElement('div');
                labelContainer.className = 'ingredient-name';
                labelContainer.append(label,labelButton);

                let button1 = document.createElement('button');
                button1.type = 'button';
                button1.className = 'add-to-recipe';
                button1.setAttribute('fx','context-item');
                button1.textContent = 'Add to recipe';

                let button2 = document.createElement('button');
                button2.type = 'button';
                button2.setAttribute('fx','context-item');
                button2.setAttribute('class','duplicate');
                button2.textContent = 'Duplicate';

                let button3 = document.createElement('button');
                button3.type = 'button';
                button3.className = 'edit-ingredient';
                button3.setAttribute('fx','context-item');
                button3.onclick = () => {PK.context.edit()};
                button3.textContent = 'Edit';

                let button4 = document.createElement('button');
                button4.type = 'button';
                button4.className = 'delete-ingredient';
                button4.setAttribute('fx','context-item');
                button4.onclick = () => {PK.context.delete()};
                button4.textContent = 'Delete';

                menu.append(labelContainer,document.createElement('hr'),button1,button2,button3,document.createElement('hr'),button4);
                return menu;
                },
            body: () => {
                let menu = document.createElement('div');
                menu.className = 'body-context';

                let button1 = document.createElement('button');
                button1.type = 'button';
                button1.className = 'new-ingredient';
                button1.setAttribute('fx','context-item');
                button1.textContent = 'New ingredient';
                button1.onclick = () => {openModal({id:'edit-item',header:'New Ingredient'},dataPrefab.emptyIngredient)};

                let button2 = document.createElement('a');
                button2.setAttribute('fx','context-item');
                button2.setAttribute('class','search-ingredients');
                button2.href = 'ingredient-search.html';
                button2.textContent = 'Search for ingredients';

                menu.append(button1 ,button2);
                return menu;
            },
            recipe:0,
            meal:0,

            },
        button: {

            construct: (data) => {
                let button = document.createElement('button');
                button.type = button;
                button.className = data.class;
                if (data.fx !== '') { button.setAttribute('fx',data.fx); }
                if (data.action !== '') {
                    button.addEventListener('click', function() {
                        addButtonAction(data.action); 
                        })
                    }
                return button;
            },
            modalX: () => {
                let button = document.createElement('button');
                button.setAttribute('type','button');
                button.setAttribute('class','x');
                return button;
                },
            modalClose: () => {
                let button = document.createElement('button');
                button.setAttribute('type','button');
                button.setAttribute('class','close');
                button.appendChild(document.createTextNode('Close'));
                return button;
                },
            modalSave: () => {
                let button = document.createElement('button');
                button.setAttribute('type','button');
                button.setAttribute('class','save');
                button.appendChild(document.createTextNode('Save'));
                return button;
                },
            modalNext: () => {
                let button = document.createElement('button');
                button.setAttribute('type','button');
                button.setAttribute('class','next');
                button.appendChild(document.createTextNode('Next'));
                return button;
                },
        },
        hero:0,
        modal: {
            empty: (id) => {
                let modal = document.createElement('div');
                modal.setAttribute('class','modal');
                modal.setAttribute('state','closed');
                modal.setAttribute('id',id);

                let header = document.createElement('div');
                header.setAttribute('class','header');

                let content = document.createElement('div');
                content.setAttribute('class','content');

                let footer = document.createElement('div');
                footer.setAttribute('class','footer');
                footer.appendChild(PK.element.button.modalClose);

                let headerLabel = document.createElement('h2');
                headerLabel.setAttribute('class','label');

                let xButton = PK.element.button.modalX();

                modal.appendChild(header);
                modal.appendChild(content);
                modal.appendChild(footer);

                header.appendChild(headerLabel);
                header.appendChild(xButton);

                return modal;
                },
            },
        item:0,
        ingredientResult:0,
        recipeResult:0,
        ingredientItem:0,
        recipeItem:0,
        mealResult:0,
        mealItem:0,
        },
    emptyIngredient:0,
    draftRecipe:0,
    missingIngredientImage:0,
    missingRecipeImage:0,
    missingMealImage:0,
    missingUserImage:0,
    theme: {
        light:0,
        dark:0,
    },

};

addEventListener('DOMContentLoaded',function() {
    document.body.insertBefore(PK.element.navbar(),document.body.firstChild);
    document.body.append(PK.element.context.createMenu());
    initializeButtons();
    PK.context.menu = document.getElementById('context-menu');
    context = PK.context.menu;
    }
);
addEventListener('contextmenu',function() { rightClick({}); });
addEventListener('click',function(e) {
    if ( !Array.from(document.querySelectorAll(':hover')).includes(context) && pageData.contextMenu !== 'closed')
        contextMenu({
            menu:'closed',
            elementData:''
            }
        );
    }
);

function getNewId(item) {
    return JSON.parse(localStorage.getItem(item)).length;
}

function initializeButtons()
{
    let buttonsArray = document.getElementsByTagName('button');
    for (let i = 0; i < buttonsArray.length; i++){

    let currentButton = buttonsArray[i];

    if (currentButton.getAttribute('class') === 'modal-cancel' || currentButton.getAttribute('class') === 'modal-x') {
        currentButton.addEventListener('click', function() {
            currentButton.closest('.modal').setAttribute('state','closed');
            toggleCurtain(false);
            }
        );
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

    if (data.id == -1) {
        data.id = getNewId('ingredients');
    }

    if (data.unit != 'g') {
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
    if (data[0].id == oldData.length) {
        localStorage.setItem('ingredients', JSON.stringify(oldData.concat(data)));
    }
    else {
        oldData[data[0].id] = data[0];
        delete oldData[data[0].id].id;
        localStorage.setItem('ingredients', JSON.stringify(oldData));
    }
    if (pageData.currentPage === 'ingredients') {
        refreshElement(document.getElementsByClassName('item')[data[0].id],data[0]);
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

function refreshElement(element,data) {
    if (element === undefined) {
        element = createItem(data,data.id)
        document.getElementById('item-grid').appendChild(element);
    }

    if (element.getAttribute('class') === 'item' && data.delete !== 'delete') {
        document.getElementsByClassName('item')[data.id].replaceWith(createItem(data,data.id));
    }

    if (element.getAttribute('class') === 'item' && data.delete === 'delete') {
        document.getElementById('item-grid').removeChild(document.getElementsByClassName('item')[data.id]);
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

function rightClick(data) {
    let e = window.event;
    data = topContextElement(document.querySelectorAll(':hover'));
    if (pageData.contextMenu !== data.menu) {
        e.preventDefault();
        contextMenu(data);
    }
    else {
        contextMenu({
            menu:'closed',
            elementData:''
            }
        );
    }
}

function topContextElement(elements) {
    let canRightClick = ['item'];
    let pickedElement = '';
    let itemData;
    for (let i = elements.length - 1; i > 0 && pickedElement === '' ; i--) {
        if (canRightClick.includes(elements[i].getAttribute('class'))) {
            pickedElement = elements[i].getAttribute('class') + '-context';
            if (elements[i].getAttribute('item-data') !== null) {
                itemData = elements[i].getAttribute('item-data');
                itemData.id = i;
            }
        }
    }
    

    if (pickedElement !== '')
    {
        let returnData = {
            menu:pickedElement,
            elementData:JSON.parse(itemData)
            }
        return returnData;
    }
    else {
        return {
            menu:'body-context',
            elementData:''
        }
    }
}

function contextMenu(data) {
    context.style.left = window.event.clientX + 'px';
    context.style.top = window.event.clientY + 'px';
    pageData.contextMenu = data.menu;
    context.setAttribute('state',data.menu);
    PK.context.data = data.elementData;
    for (let i = 0; i < context.children.length; i++)
    {
        let child = context.children[i];
        if (child.getAttribute('class') !== data.menu) {
            child.style.display = "none";
            }
        else {
            child.style.display = "flex";
            if (child.getElementsByClassName('ingredient-name-input')[0] !== null) {
                child.getElementsByClassName('ingredient-name-input')[0].value = PK.context.data.name;
                }
            }
    }
}

function addButtonAction(action) {
    if (action.type === 'openModal') {
        openModal(action.data,PK.context.data);
    }
}