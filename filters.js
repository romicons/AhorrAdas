//                      FILTERS

const filterByType = (type, array) => {
    if (type === 'Todas') {
        return array; 
    } else {
        return array.filter((operation) => operation.type === type);
    }
};


const filterByCategory = (category, array) => {
    return array.filter((operation) => operation.category === category);
};

const filterOperationsByCategory = (filteredOperations) => {
  const category = document.getElementById('operation-category-filter').value;
  if (category !== 'Todas') {
    filteredOperations = filterByCategory(category, filteredOperations);
  }
};

//         FUNCTION FILTER DATE

const filterOperationsFromDate = (date, array) => {
  console.log("me estoy ejecutando", array);
  if (array && array.length > 0){
    console.log("estoy entrando en el if", array)
    const fromDate = new Date(date); 
    const result= array.filter((operation) => {
        const operationDate = new Date(operation.date); 
        console.log(operationDate)
        console.log(fromDate)
        return operationDate >= fromDate;
    });
    console.log(result)
    return result;
  }
};

const filterOperationsUntilDate = (date, array) => {
  const untilDate = new Date (date); 
  return array.filter((operation) => {
      const operationDate = new Date (operation.date)
      return operationDate < untilDate;})
  };

const filterByOrder = (array, order) => {
    const orderByAmount = (a, b) => {return a.amount - b.amount}
    const orderAlphabetycally = (a, b) => {
        if (a.description < b.description) {return -1;}
        if (a.description > b.description) {return 1;}
        return 0;
    };
    const orderByDate = (a,b) => {
        const dateA  = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA.getTime() - dateB.getTime()
    }
    
    if (order === 'Más reciente') {
      console.log(array)
        return array.sort((a, b) => orderByDate(b, a));
    }
    else if (order === 'Más antiguo') {
        return array.sort(orderByDate);
    }
    else if (order === 'Menor monto') {
        return array.sort(orderByAmount);
    }
    else if (order === 'Mayor monto') {
        return array.sort((a, b) => orderByAmount(b, a));
    }
    else if (order === 'A/Z') {
      console.log(array.sort(orderAlphabetycally))
        return array.sort(orderAlphabetycally);
    }
    else if (order === 'Z/A') {
        return array.sort((a, b) => orderAlphabetycally(b, a));
    }
};

/*
const applyFilters = () => {
    let filteredOperations = getOperations();
    filterOperationsByType(filteredOperations);
    filterOperationsByCategory(filteredOperations);
    console.log(filteredOperations);
    createOperationsTable(filteredOperations);
};


const filterOperations = () => {
    let filteredOperations = getOperations();
    console.log (filteredOperations);

    const type = document.getElementById('operation-type-filter').value;
    const category = document.getElementById('operation-category-filter').value;
    const dateFrom = document.getElementById("operation-date-from").value;
    const dateUntil = document.getElementById("operation-date-until").value;
    const order = document.getElementById('operation-order').value;
    
    if (type !== 'Todas') {
      filteredOperations = filterByType(type, getOperations());
      console.log(filteredOperations)
      createOperationsTable(filteredOperations);
    }
  
    if (category !== 'Todas') {
      filteredOperations = filterByCategory(category, getOperations())
    }

    filteredOperations = filterOperationsFromDate(dateFrom, getOperations());
    console.log(filteredOperations)

    filteredOperations = filterOperationsUntilDate(dateUntil, filteredOperations);
    console.log(filteredOperations)

    filteredOperations = filterByOrder(order, getOperations());
    console.log(filteredOperations)

    console.log('Operaciones filtradas:', filteredOperations);

  
};*/
