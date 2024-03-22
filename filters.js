//                      FILTERS

const filterByType = (type, array) => {
    return array.filter((operation) => operation.type === type)
};

const filterOperationsByType = (filteredOperations) => {
  const type = document.getElementById('operation-type-filter').value;
  if (type !== 'Todas') {
    filteredOperations = filterByType(type, filteredOperations);
  }
};

const filterByCategory = (category, array) => {
    return array.filter((operation) => operation.category === category)
};

const filterOperationsByCategory = (filteredOperations) => {
  const category = document.getElementById('operation-category-filter').value;
  if (category !== 'Todas') {
    filteredOperations = filterByCategory(category, filteredOperations);
  }
};

const filterOperationsFromDate = (date, array) => {
    const fromDate = new Date(date); 
    return array.filter((operation) => {
        const operationDate = new Date(operation.date); 
        return operationDate >= fromDate;
    });
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

const getBalance = () => {
  income = 0;
  expense = 0;
  const operations = getOperations();

  for (let operation of operations) {
      if (operation.type === 'Ganancia') {
          income += parseInt(operation.amount);
      }
      if (operation.type === 'Gasto') {
          expense += parseInt(operation.amount);
      }
  }

  balance = income - expense;

  const balanceType = income >= expense ? "text-green-600" : "text-red-600";
  const balanceAmount = income >= expense ? "+$" : "-$";

  document.getElementById('balance-display').innerHTML = `
      <div class="flex columns-2 justify-between">
          <div>
            <h3>Ganancias</h3>
          </div>
          <div class="text-green-600">
            <span>+$</span>
            <span>${income}</span>
          </div>
        </div>
        <div class="flex columns-2 justify-between">
          <div>
            <h3>Gastos</h3>
          </div>
          <div class="text-red-600">
            <span>-$</span>
            <span>${expense}</span>
          </div>
        </div>
        <div
          class="flex columns-2 justify-between text-2xl border-solid border-t border-light pt-2 dark:border-dark"
        >
          <div>
            <h3>Total</h3>
          </div>
          <div class="${balanceType}">
            <span>${balanceAmount}</span>
            <span>${balance}</span>
          </div>
      </div>
  `
};