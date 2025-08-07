
let menu = {
    screen: 'food',
    tab: 'ingredients',
    page: 1,
    changeTab:  function(newTab){
        let currentTab = localStorage.getItem[localStorage.findIndex(item => item.name == newTab)];
        let tabElements = currentTab.filter(item => item.type == 'item');
        let maxElements = 20;
        for (let i = 0; i < tabElements.length && i < maxElements; i++){
            Protomeal.build(tabElements[i]);
        }
    },
    previousPage: function(){},
    nextPage: function(){},

}