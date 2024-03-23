//      INITIALIZE APP

const initializeApp = () => {
    const savedCategories = getCategories(); 
    createCategoriesTable(savedCategories);
    const savedOperations = getOperations();
    createOperationsTable(savedOperations);
    const savedReports = getReports();
    createTableForReports(savedReports);
    getBalance();
};

//      RESPONSIVE DESIGN

const setStyleNone = (element) => {
    document.getElementById(element).classList.add('hidden');
};

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

//      PUT UPPERCASE ON THE FIRST LETTER OF A STRING

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

//      FORMAT DATE

const formatDate = (dateString) => {
  const formattedDate = new Date(dateString);
  formattedDate.setDate(formattedDate.getDate()); // Añadir 1 día a la fecha
  return `${formattedDate.getDate()}/${
    formattedDate.getMonth() + 1
  }/${formattedDate.getFullYear()}`;
};

//      FIND AN OBJECT FOR ITS ID

const seekId = (array, id, cut) => {
    return array.find(element => element.id === id.slice(cut));
}

//      ERROR

const error = (field, message) => {
    let errorText = document.createElement('p');
    errorText.classList.add('text-red-600');
    errorText.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${message}`;
    let inputElement = document.getElementById(`${field.id}`);
    inputElement.classList.add('outline', 'outline-red-600', 'outline-2');
    inputElement.parentNode.insertBefore(errorText, inputElement.nextSibling);
};

const hideError = (field) => {
    let inputElement = document.getElementById(`${field.id}`);
    if (inputElement) {
        let errorText = inputElement.nextSibling;
        inputElement.classList.remove('outline', 'outline-red-600', 'outline-2');
        if (errorText && errorText.nodeType === 1 && errorText.classList.contains('text-red-600')) {
            errorText.remove();
        }
    }
};




