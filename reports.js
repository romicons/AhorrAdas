//                      FILTERS

const filteredOperations = [];

const filterByType = (type, operations) => {
    return operations.filter((operation) => operation.type === type)
};

const filterByCategory = (category, operations) => {
    return operations.filter((operation) => operation.category === category)
};

const filterOperationsFromDate = (date, operations) => {
    return operations.filter((operation) => operation.date >= date);
};

const filterOperationsUntilDate = (date, operations) => {
    return operations.filter((operation) => operation.date <= date);
};

const filterByOrder = (operations, order) => {
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
        return operations.sort((a, b) => orderByDate(b, a));
    }
    else if (order === 'Más antiguo') {
        return operations.sort(orderByDate);
    }
    else if (order === 'Menor monto') {
        return operations.sort(orderByAmount);
    }
    else if (order === 'Mayor monto') {
        return operations.sort((a, b) => orderByAmount(b, a));
    }
    else if (order === 'A/Z') {
        return operations.sort(orderAlphabetycally);
    }
    else if (order === 'Z/A') {
        return operations.sort((a, b) => orderAlphabetycally(b, a));
    }
};

const filterOperations = () => {
    let operations = getOperations();
    const type = document.getElementById('operation-type-filter').value;
    const category = document.getElementById('operation-category-filter').value;
    const dateFrom = document.getElementById("operation-date-from").value;
    const dateUntil = document.getElementById("operation-date-until").value;
    const order = document.getElementById('operation-order').value;
    
    if (type !== 'Todas') {
      operations = filterByType(type, operations);
    }
  
    if (category !== 'Todas') {
      operations = filterByCategory(category, operations)
    }
    operations = filterOperationsFromDate(dateFrom, operations);
    operations = filterOperationsUntilDate(dateUntil, operations);
    operations = filterByOrder(order, operations);
};

//  GENERATE TABLE OF REPORTS

const createReportsTable = () => {
    const tableOfReports = document.getElementById("reports-table");
    tableOfReports.innerHTML = "";
    const savedOperations = validateLocalStorage("operations", operations);
    if (savedOperations && savedOperations.length > 0) {
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
  
      for (let operation of savedOperations) {
        const formattedDateStr = formatDate(operation.date);
        const amountType =
          operation.type === "Ganancia" ? "text-green-600" : "text-red-600";
        const amountSign = operation.type === "Ganancia" ? "+$" : "-$";
        const operationBody = document.getElementById("operations-table-body");
        operationBody.innerHTML += `
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">Categoría con mayor ganancia</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${highestIncomeCategory}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base ${amountType}">${amountSign}${amountCategory}</td>
            </tr>
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">Categoría con mayor gasto</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${highestExpenseCategory}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base ${amountType}">${amountSign}${amountCategory}</td>
            </tr>
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
            `
      };
    } else {
      setStyleFlex('no-reports');
    };
  };