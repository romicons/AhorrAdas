//                      FILTERS

const filterByType = () => {
    const typeOperation = document.getElementById('type-filter').value;
    const savedOperations = validateLocalStorage("operations", operations);
        if (typeOperation === 'Expense') {
            console.log(savedOperations.filter((operation) => operation.type === "Gasto"));
            return savedOperations.filter((operation) => operation.type === 'Gasto');
        }
        else if (typeOperation === 'Income') {
            console.log( savedOperations.filter((operation) => operation.type === "Ganancia"));
            return savedOperations.filter((operation) => operation.type === 'Ganancia');
        }
       else {
           console.log(savedOperations);
           return savedOperations
        }
};


const filterByCategory = () => {
    const typeOperation = document.getElementById('category-type').value;
    const savedOperations = validateLocalStorage("operations", operations);
    for (let operation of savedOperations) {
        if (typeOperation === operation.category) {
            console.log(savedOperations.filter((operation) => operation.category === typeOperation));
            return savedOperations.filter((operation) => operation.category === typeOperation);
        }
    }
};


const filterOperationsFromDate = () => {
  const fromDate = document.getElementById("operation-date-from").value;
  const savedOperations = validateLocalStorage("operations", operations);
  const filteredOperations = savedOperations.filter(
    (operation) => operation.date >= fromDate
  );
  console.log(filteredOperations);
  return filteredOperations;
};


const filterOperationsUntilDate = () => {
  const untilDate = document.getElementById("operation-date-until").value;
  const savedOperations = validateLocalStorage("operations", operations);
  const filteredOperations = savedOperations.filter(
    (operation) => operation.date <= untilDate
  );
  console.log(filteredOperations);
  return filteredOperations;
};

 
const filterByOrder = () => {
    const typeOperation = document.getElementById('order-operation').value;
    const savedOperations = validateLocalStorage("operations", operations);
    const orderByAmount = (a, b) => {return a.amount - b.amount}
    const orderAlphabetycally = (a, b) => {
        if (a.description < b.description) {
            return -1;
        }
        if (a.description > b.description) {
            return 1;
        }
        return 0;
    };
    const orderByDate = (a,b) =>{
        const dateA  = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA.getTime() - dateB.getTime()
    }
    
    if (typeOperation === 'Newest') {
        savedOperations.sort((a, b) => orderByDate(b, a));
        console.log(savedOperations)
        return savedOperations;
    }
    else if (typeOperation === 'Oldest') {
        savedOperations.sort(orderByDate);
        console.log(savedOperations)
        return savedOperations;
    }
    else if (typeOperation === 'Lowest Amount') {
        savedOperations.sort(orderByAmount)
        console.log(savedOperations);
        return savedOperations;
    }
    else if (typeOperation === 'Highest Amount') {
        savedOperations.sort((a, b) => orderByAmount(b, a));
        console.log(savedOperations);
        return savedOperations;
    }
    else if (typeOperation === 'A/Z') {
        savedOperations.sort(orderAlphabetycally);
        console.log(savedOperations);
        return savedOperations;
    }
    else if (typeOperation === 'Z/A') {
        savedOperations.sort((a, b) => orderAlphabetycally(b, a));
        console.log(savedOperations);
        return savedOperations;
    }
};
