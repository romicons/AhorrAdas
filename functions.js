//      RESPONSIVE DESIGN

const setStyleNone = (element) => {
    document.getElementById(element).classList.add('hidden');
}

const setStyleFlex = (element) => {
    document.getElementById(element).classList.remove('hidden');
    document.getElementById(element).classList.add('flex');
}

//      CREATE DEFAULT CATEGORIES 


//      FIND AN ELEMENT FOR ITS ID

const seekId = (id, elements) => {
    return elements.find(element => element.id === id);
};
