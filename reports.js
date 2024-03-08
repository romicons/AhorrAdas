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
               <tr class="justify-around hidden tablet:flex">
                 <th class="text-center py-1">Resumen</th>
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
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${operation.category}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base ${amountType}">${amountSign}${operation.amount}</td>
            </tr>
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">Categoría con mayor gasto</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${operation.category}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base ${amountType}">${amountSign}${operation.amount}</td>
            </tr>
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">Categoría con mayor balance</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${operation.category}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base ${amountType}">${amountSign}${operation.amount}</td>
            </tr>
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">Mes con mayor ganancia</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${month}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base ${amountType}">${amountSign}${operation.amount}</td>
            </tr>

            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">Mes con mayor gasto</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${month}</td>
                <td class="w-1/3 text-center p-1 rounded font-bold text-lg tablet:text-base ${amountType}">${amountSign}${operation.amount}</td>
             </tr>

              <td class="tablet:w-1/5 text-center px-2 py-1 rounded text-light dark:text-dark font-bold hidden tablet:flex justify-center">${formattedDateStr}</td>
              <td class="w-1/4 tablet:w-1/5 flex gap-1 justify-end tablet:justify-center">
                <button class="delete-operation-btn flex items-center rounded py-1 px-2 tablet:px-4 h-8 justify-center bg-dark hover:bg-primary shadow-inner font-bold dark:text-light dark:hover:text-light" id="btn-delete-${operation.id}">
                  <i class="fa-solid fa-trash pointer-events-none"></i>
                </button>
                <button class="edit-operation-btn flex items-center rounded py-1 px-2 tablet:px-4 h-8 justify-center hover:bg-accent bg-secondary shadow-inner font-bold dark:text-light dark:hover:text-light" id="btn-edit-${operation.id}">
                    <i class="fa-solid fa-pen pointer-events-none"></i>
                </button>
              </td>
            </tr>`
      };
    } else {
      setStyleFlex('no-reports');
    };
  };