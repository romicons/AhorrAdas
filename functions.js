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

const deleteId = (id, elements) => {
    return elements.filter((element) => element.id !== id)
}

//      ERROR

const error = (field, message) => {
    let errorText = document.createElement('p');
    errorText.classList.add('text-red-600');
    errorText.textContent = message;
    let inputElement = document.getElementById(`${field.id}`);
    inputElement.parentNode.insertBefore(errorText, inputElement.nextSibling);
};

//      HIDE ERROR

const hideError = (field) => {
    let errorText = document.getElementById(`${field.id}`).nextSibling;
    if (errorText && errorText.nodeType === 1 && errorText.classList.contains('text-red-600')) {
        errorText.remove();
    }
};
