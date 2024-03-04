//      INITIALIZE APP

const initializeApp = () => {
    createCategoriesTable();
    createOperationsTable();
}

//      RESPONSIVE DESIGN

const setStyleNone = (element) => {
    document.getElementById(element).classList.add('hidden');
}

const setStyleFlex = (element) => {
    document.getElementById(element).classList.remove('hidden');
    document.getElementById(element).classList.add('flex');
};

const toggleMobileNav = () => {
    document.getElementById('nav-items').classList.toggle('hidden');
    if (document.getElementById('nav-items').classList.contains('hidden')) {
        document.getElementById('nav-btn').innerHTML = '<i class="fa-solid fa-bars"></i>';
    } else {
        document.getElementById('nav-btn').innerHTML = '<i class="fa-solid fa-xmark"></i>';
    };
};

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

//      FORMAT DATE

const formatDate = (dateString) => {
    const formattedDate = new Date(dateString);
    return `${formattedDate.getDate()}/${
      formattedDate.getMonth() + 1
    }/${formattedDate.getFullYear()}`;
}

//      FIND AN OBJECT FOR ITS ID

const seekId = (array, id) => {
    console.log('estoy buscando tu id')
    return array.find(element => element.id === id);
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
