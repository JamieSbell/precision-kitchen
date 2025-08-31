/**
* Data object to simplify references to data about the page & editing data being held.
* @currentPage The current page the user is on.
* @editingRecipe Data object holding information about the recipe the user is currently editing, where that recipe is located in storage, and whether the recipe editing panel is hidden or not.
*/
const pageData = {
    currentPage:'',
    editingRecipe: {
        isEditing: false, 
        recipeCategory:'', 
        recipeId:0,
        showRecipePanel:false
    },
    contextMenu:'closed'
};
/**
 * Basic data templates that can be referenced to make other code blocks less verbose & easier to read.
 * @emptyIngredient Template for ingredients 
 * @defaultImage The string value for the style.backgroundImage value of an element without an image. 
 * @draftRecipe Template for draft recipes
 */
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
            id: -1
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
            id: function() { return getNewId('recipeDrafts') }
        }
    }
};

/** Basically a reference table for different unit conversion formulas. To be expanded upon later.
 * @ozToGrams Function for converting a number value from ounces to grams.
 * @to100g Function for converting an ingredient's nutrientional information to its equivilant values, per 100 grams. 
 * @gramsToOz Function for converting a number value from grams to ounces.
 */

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

//Basic stuff to write in and reference when onboarding new users. 
const intro = {
    firstMessage: {
        header: 'Welcome!',
        content: "Welcome to Precision Kitchen, the first app designed to bring precise recipes and nutrition information to the public! In here you'll have access to a database full of millions of food products from all over the world, as well as precise recipes made by professionals, fantastic home chefs, and everyday cooks alike! Precision Kitchen was created out of a desire to have an app that brings people together to share recipes in the simplest, most honest, and most understandable way possible, so you can make meals that taste fantastic every time!"
    }
}