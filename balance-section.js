//                      FILTERS

const filterByType = () => {
    const typeOperation = document.getElementById('type-filters').value;
    const savedOperations = validateLocalStorage("operations", operations);
        if (typeOperation === 'Expense') {
            console.log(savedOperations.filter((operation) => operation.type === 'Gasto'));
        }
        else if (typeOperation === 'Income') {

            console.log(savedOperations.filter((operation) => operation.type === 'Ganancia'));
        }
       else {
           console.log(savedOperations);
        }
};

/*
const filterByCategory = () => {
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
};
*/
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
/*
const filterByOrder = () => {
    const typeOperation = document.getElementById('type-category').value;
    const savedOperations = validateLocalStorage("operations", operations);
        if (typeOperation === 'Newest') {
            console.log('devuelvo la ultima operación');
            console.log(savedOperations.filter((operation) => operation.type === 'Gasto'));
        }
        else if (typeOperation === 'Oldest') {
            console.log('devuelvo la operación más antigua');
            console.log(savedOperations.filter((operation) => operation.type === 'Gasto'));
        }
        else if (typeOperation === 'Highest Amount') {
            console.log('devuelvo la operación con el monto más alto');
            console.log(savedOperations.filter((operation) => operation.type === 'Gasto'));
        }
        else if (typeOperation === 'Lowest Amount') {
            console.log('devuelvo la operación con el monto más bajo');
            console.log(savedOperations.filter((operation) => operation.type === 'Gasto'));
        }
        else if (typeOperation === 'Z/A') {
            console.log('devuelvo operaciones ordenadas de la Z a la A');
            console.log(savedOperations.filter((operation) => operation.type === 'Gasto'));
        }
        else if (typeOperation === 'A/Z') {
            console.log('devuelvo operaciones ordenadas de la A a la Z');
            console.log(savedOperations.filter((operation) => operation.type === 'Ganancia'));
        }
       else {
           console.log(savedOperations);
        }
};
*/