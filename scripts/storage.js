let ingredientsDB = 0;
let recipesDB = 0;
let mealsDB = 0;





addEventListener('DOMContentLoaded',function(){PM.loadDbs()});

const PM = {
    loadDbs: function() {
        ingredientsDB = JSON.parse(localStorage.getItem('ingredients'));
        recipesDB = JSON.parse(localStorage.getItem('recipes'));
        mealsDB = JSON.parse(localStorage.getItem('meals'));


    },
    saveDb: function() {
        
    }
} 