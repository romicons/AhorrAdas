//                      FILTERS

const filterByType = () => {
    const typeOperation = document.getElementById('type-filter').value;
    const savedOperations = validateLocalStorage("operations", operations);
        if (typeOperation === 'Expense') {
            return console.log(savedOperations.filter((operation) => operation.type === 'Gasto'));
        }
        else if (typeOperation === 'Income') {
            return console.log(savedOperations.filter((operation) => operation.type === 'Ganancia'));
        }
       else {
           console.log(savedOperations);
        }
};


const filterByCategory = () => {
    console.log('soy tu filtro de categorias ejecutandose')
    const typeOperation = document.getElementById('category-type').value;
    const savedOperations = validateLocalStorage("operations", operations);
    for (let operation of savedOperations) {
        if (typeOperation === operation.category) {
            console.log(`devuelvo operaciones con categoria ${operation.category}`);
            return console.log(savedOperations.filter((operation) => operation.category === typeOperation));
        }
    }
};

/*
const filterByDate = () => {
    const typeOperation = document.getElementById('type-category').value;
    const savedOperations = validateLocalStorage("operations", operations);
        if (typeOperation === 'Expense') {
            console.log('devuelvo operaciones con tipo gasto');
            console.log(savedOperations.filter((operation) => operation.type === 'Gasto'));
        }
        else if (typeOperation === 'Income') {
            console.log('devuelvo operaciones con tipo ganancia');
            console.log(savedOperations.filter((operation) => operation.type === 'Ganancia'));
        }
       else {
           console.log(savedOperations);
        }
};*/

const filterByOrder = () => {
    console.log('soy tu funcion de filtro por orden ejecutandose')
    const typeOperation = document.getElementById('order-operation').value;
    const savedOperations = validateLocalStorage("operations", operations);
    const orderByAmount = (a, b) => {return a.amount - b.amount}
    const orderAlphabetycally = (a, b) => {
        // Ordenar de la A a la Z
        if (a.description < b.description) {
            return -1;
        }
        if (a.description > b.description) {
            return 1;
        }
        return 0;
    };
    

        if (typeOperation === 'Newest') {
            console.log('devuelvo la ultima operación');
            console.log(savedOperations.filter((operation) => operation.type === 'Gasto'));
        }/*
        else if (typeOperation === 'Oldest') {
            console.log('devuelvo la operación más antigua');
            console.log(savedOperations.filter((operation) => operation.type === 'Gasto'));
        }*/
        else if (typeOperation === 'Lowest Amount') {
            console.log('devuelvo la operación con el monto más bajo');
            savedOperations.sort(orderByAmount)
            return console.log(savedOperations)
        }
        else if (typeOperation === 'Highest Amount') {
            console.log('devuelvo la operación con el monto más alto');
            savedOperations.sort((a, b) => orderByAmount(b, a));
            return console.log(savedOperations);
        }
        else if (typeOperation === 'A/Z') {
            console.log('devuelvo operaciones ordenadas de la A a la Z');
            savedOperations.sort(orderAlphabetycally);
            return console.log(savedOperations);
        }
        else if (typeOperation === 'Z/A') {
            console.log('devuelvo operaciones ordenadas de la Z a la A');
            savedOperations.sort((a, b) => orderAlphabetycally(b, a));
            return console.log(savedOperations);
        }
};
