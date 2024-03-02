//      FILTER BY TYPE

const filterByType = () => {
    const typeOperation = document.getElementById('type-filters').value;
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
