//      INITIALIZE APP

const initializeApp = () => {
    createCategoriesTable();
}

//      RESPONSIVE DESIGN

const setStyleNone = (element) => {
    document.getElementById(element).classList.add('hidden');
}

const setStyleFlex = (element) => {
    document.getElementById(element).classList.remove('hidden');
    document.getElementById(element).classList.add('flex');
}

//      VALIDATE LOCAL STORAGE

const validateLocalStorage = (key, defaultValue) => {
    const storedData = localStorage.getItem(key);
    if (storedData !== null) {
        return JSON.parse(storedData);
    } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    }
};


//      FIND AN ELEMENT FOR ITS ID

const seekId = (id, elements) => {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].id === id) {
        return id
    };
}};  

const deleteId = (id, elements) => {
    return elements.filter((element) => element.id !== id)
}

//      ERROR

const error = (field, message) => {
    let errorText = document.createElement('p');
    errorText.classList.add('text-red-600');
    errorText.textContent = message;
    let inputElement = document.getElementById(`${field.id}`);
    inputElement.classList.add('outline', 'outline-red-600', 'outline-2')
    inputElement.parentNode.insertBefore(errorText, inputElement.nextSibling);
};

//      HIDE ERROR

const hideError = (field) => {
    let errorText = document.getElementById(`${field.id}`).nextSibling;
    let inputElement = document.getElementById(`${field.id}`);
    inputElement.classList.remove('outline', 'outline-red-600', 'outline-2')
    if (errorText && errorText.nodeType === 1 && errorText.classList.contains('text-red-600')) {

        errorText.remove();
    }
};
