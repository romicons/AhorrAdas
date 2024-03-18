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

const searchForHighestIncomeCategory = () => {
  const operations = getOperations();
  let categoryIncome = {};

  for (let operation of operations) {
    if (operation.type === 'Ganancia') {
      const category = operation.category;
      const amount = parseInt(operation.amount);
      if (!categoryIncome[category]) {
        categoryIncome[category] = 0;
      }
      categoryIncome[category] += amount
    };
  };

  let highestIncomeCategory = null;
  let highestIncome = 0;

  for (let category in categoryIncome) {
    if (categoryIncome[category] > highestIncome) {
      highestIncome = categoryIncome[category];
      highestIncomeCategory = category;
    }
  }

  if (highestIncomeCategory !== null) {
    console.log(`La categoría con la mayor ganancia es "${highestIncomeCategory}" con una ganancia de ${highestIncome}`);
    return { highestIncome, highestIncomeCategory }
  }
};

const searchForHighestExpenseCategory = () => {
  const operations = getOperations();
  let categoryExpense = {};

  for (let operation of operations) {
    if (operation.type === 'Gasto') {
      const category = operation.category;
      const amount = parseInt(operation.amount);
      if (!categoryExpense[category]) {
        categoryExpense[category] = 0;
      }
      categoryExpense[category] += amount
    };
  };

  let highestExpenseCategory = null;
  let highestExpense = 0;

  for (let category in categoryExpense) {
    if (categoryExpense[category] > highestExpense) {
      highestExpense = categoryExpense[category];
      highestExpenseCategory = category;
    }
  }

  if (highestExpenseCategory !== null) {
    console.log(`La categoría con la mayor gasto es "${highestExpenseCategory}" con una gasto de ${highestExpense}`);
    return { highestExpense, highestExpenseCategory }
  }
}

const highestIncomeData = searchForHighestIncomeCategory();
const highestExpenseData = searchForHighestExpenseCategory();

//  GENERATE TABLE OF REPORTS

const createReportsTable = (operations) => {
    const tableOfReports = document.getElementById("reports-table");
    tableOfReports.innerHTML = "";
    if (operations && operations.length > 0) {
      setStyleNone('no-reports');
      tableOfReports.innerHTML += `
             <thead class="sticky top-0 bg-primary dark:bg-secondary text-light z-50">
               <tr class="justify-center">
                 <th class="text-center py-1 font-bold">Resumen</th>
               </tr>
             </thead>
             <tbody id="reports-table-body" class="flex flex-col tablet:h-[29rem]">
             </tbody>
             `;
        const reportsBody = document.getElementById("reports-table-body");
        reportsBody.innerHTML += `
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">Categoría con mayor ganancia</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${highestIncomeData.highestIncomeCategory}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base text-green-600">+${highestIncomeData.highestIncome}</td>
            </tr>
            
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">Categoría con mayor gasto</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${highestExpenseData.highestExpenseCategory}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base text-red-600">-${highestExpenseData.highestExpense}</td>
            </tr>`/*
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">Categoría con mayor balance</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${highestBalanceCategory}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base ${amountType}">${amountSign}${amountCategory}</td>
            </tr>
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">Mes con mayor ganancia</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${highestIncomeMonth}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base ${amountType}">${amountSign}${incomeAmount}</td>
            </tr>

            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">Mes con mayor gasto</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${highestExpenseMonth}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base ${amountType}">${amountSign}${expenseAmount}}</td>
            </tr>

            <th class="justify-left font-bold py-2 flex font-sans">Totales por categoría</th>
            <tr class="flex justify-between items-center py-1">
              <th class="p-1 w-1/4 text-left">Categoría</th>
              <th class="p-1 w-1/4 text-center">Ganancias</th>
              <th class="p-1 w-1/4 text-center">Gastos</th>
              <th class="p-1 w-1/4 text-right">Balance</th>
            </tr>

            <tr class="flex justify-between items-center py-1">
              <td class="p-1 text-left w-1/4">${category.name}</td>
              <td class="text-green-600 p-1 w-1/4 text-center">${incomeByCategory}</td>
              <td class="text-red-600 p-1 w-1/4 text-center">${expenseByCategory}</td>
              <td class="text-green-600 p-1 w-1/4 text-right">${balanceByCategory}</td>
            </tr>

            <th class="justify-left font-bold py-2 flex font-sans">Totales por mes</th>
            <tr class="flex justify-between items-center py-1">
                <th class="p-1 w-1/4 text-left">Mes</th>
                <th class="p-1 w-1/4 text-center">Ganancias</th>
                <th class="p-1 w-1/4 text-center">Gastos</th>
                <th class="p-1 w-1/4 text-right">Balance</th>
            </tr>
            <tr class="flex justify-between items-center py-1">
              <td class="p-1 w-1/4 text-left">${dateByMonth}</td>
              <td class="text-green-600 p-1 w-1/4 text-center">${incomeByMonth}</td>
              <td class="text-red-600 p-1 w-1/4 text-center">${expenseByMonth}</td>
              <td class="text-red-600 p-1 w-1/4 text-right">${balanceByMonth}7</td>
            </tr>   
            `*/
      } else {
      setStyleFlex('no-reports');
    };
  }