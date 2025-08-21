addEventListener('DOMContentLoaded',function() {
    initializeButtons();
})

const convert = {
    ozToGrams: function(oz) {return oz * 28.34952;},
    to100g: function(data) {
        data.protein = Math.floor(data.protein / data.serving * 1000) /10;
        data.carbs = Math.floor(data.carbs / data.serving * 1000) / 10;
        data.fiber = Math.floor(data.fiber / data.serving * 1000) / 10;
        data.fat = Math.floor(data.fat / data.serving * 1000) / 10;
        data.serving = 100;
        return data;
        },
    gramsToOz: function(g) {return g / 28.34952;},
    };

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
                        image:0
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

function showElement(element,data) {
    if (element == 'alert') {
        document.getElementById('alert').children[0].textContent = data.message;
        document.getElementById('alert').setAttribute('state','open');
    }
}

function openModal(modalId,data) {
    let modal = document.getElementById(modalId);
    let container1 = modal.getElementsByClassName('container')[0];
    let container2 = modal.getElementsByClassName('container')[2];
    console.log(data.image);
    if (data.image !== undefined) {
        container1.getElementsByClassName('upload-image')[0].style.backgroundImage = 'url("' + data.image + '")';
    }

    container2.getElementsByClassName('item-name')[0].value = data.name;
    container2.getElementsByClassName('tag')[0].value = data.tags;
    container2.getElementsByClassName('amount')[0].value = data.amount;
    container2.getElementsByClassName('unit')[0].value = data.unit;
    container2.getElementsByClassName('protein')[0].value = data.protein;
    container2.getElementsByClassName('carbs')[0].value = data.carbs;
    container2.getElementsByClassName('fiber')[0].value = data.fiber;
    container2.getElementsByClassName('fat')[0].value = data.fat;

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
    data.serving = data.target.getElementsByClassName('amount')[0].value;
    data.unit = data.target.getElementsByClassName('unit')[0].value;
    data.protein = data.target.getElementsByClassName('protein')[0].value;
    data.carbs = data.target.getElementsByClassName('carbs')[0].value;
    data.fiber = data.target.getElementsByClassName('fiber')[0].value;
    data.fat = data.target.getElementsByClassName('fat')[0].value;
    data.image = data.target.getElementsByClassName('upload-image')[0].style.backgroundImage;
    delete data.target;

    let oldData = JSON.parse(localStorage.getItem('ingredients'));
    data = [data];
    if (oldData === null) {
        localStorage.setItem('ingredients', JSON.stringify(data));
    }
    else {
        localStorage.setItem('ingredients', JSON.stringify(oldData.concat(data)));
    }
    document.getElementById('edit-item').setAttribute('state','closed');
    toggleCurtain(false);
}

function updateChooserImage() {
    console.log(document.getElementsByClassName('upload-image')[0].files[0]);

    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementsByClassName('upload-image')[0].style.backgroundImage = 'url("' + e.target.result + '")';
    };
    reader.readAsDataURL(document.getElementsByClassName('upload-image')[0].files[0]);
}