//    CREATE NEW OPERATION

const createOperation = (description, amount, type, category, date) => {
  let savedOperations = getOperations();
  let newOperation = {
    id: uuidv4(),
    description: description,
    amount: amount,
    type: type,
    category: category,
    date: date,
  };
  operations.push(newOperation);
  updateOperations(savedOperations);
  createOperationsTable();
};

//      RETURN OPERATIONS FROM LOCAL STORAGE

const getOperations = () => {
  return JSON.parse(localStorage.getItem("operations"));
};

const operations = getOperations() || [];

//    UPDATE OPERATIONS

const updateOperations = () => {
  localStorage.setItem(`operations`, JSON.stringify(operations));
};

//  GENERATE TABLE OF OPERATIONS

const createOperationsTable = () => {
  const tableOfOperations = document.getElementById("operations-table");
  tableOfOperations.innerHTML = "";
  const savedOperations = validateLocalStorage("operations", operations);
  if (savedOperations && savedOperations.length > 0) {
    setStyleNone('no-operations');
    tableOfOperations.innerHTML += `
           <thead>
             <tr class="border-b-2 border-light dark:border-dark justify-around hidden tablet:flex">
               <th class="w-1/5 py-1">Descripción</th>
               <th class="w-1/5 py-1">Monto</th>
               <th class="w-1/5 py-1">Categoría</th>
               <th class="w-1/5 py-1">Fecha</th>
               <th class="w-1/5 py-1 flex justify-center">Acciones</th>
             </tr>
           </thead>
           <tbody id="operations-table-body">
           </tbody>
           `;

    for (let operation of savedOperations) {
      const dateInput = document.getElementById("date-operation");
      const operationDate = dateInput.value;
      const formattedDate = new Date(operationDate);
      const formattedDateStr = `${formattedDate.getFullYear()}-${
        formattedDate.getMonth() + 1
      }-${formattedDate.getDate()}`;

      const amountType =
        operation.type === "Ganancia" ? "text-green-600" : "text-red-600";
      const amountSign = operation.type === "Ganancia" ? "+$" : "-$";
      const operationBody = document.getElementById("operations-table-body");
      operationBody.innerHTML += `
          <tr class="flex justify-between items-center py-1">
            <td class="w-1/4 tablet:w-1/5 text-center bg-primary dark:bg-secondary px-1 py-1 rounded text-light font-bold">${operation.description}</td>
            <td class="w-1/4 tablet:w-1/5 text-center px-1 py-1 rounded font-bold text-xl tablet:text-base ${amountType}">${amountSign}${operation.amount}</td>
            <td class="w-1/4 tablet:w-1/5 text-center bg-primary dark:bg-secondary px-1 py-1 rounded text-light font-bold">${operation.category}</td>
            <td class="tablet:w-1/5 text-center px-2 py-1 rounded text-light dark:text-dark font-bold hidden tablet:flex justify-center">${formattedDateStr}</td>
            <td class="w-1/4 tablet:w-1/5 flex gap-1 justify-center">
              <button class="delete-operation-btn flex items-center rounded py-1 px-2 tablet:px-4 h-8 justify-center bg-dark hover:bg-primary shadow-inner font-bold dark:text-light dark:hover:text-light" id="${operation.id}">
                <i class="fa-solid fa-trash"></i>
              </button>
              <button class="edit-operation-btn flex items-center rounded py-1 px-2 tablet:px-4 h-8 justify-center hover:bg-accent bg-secondary shadow-inner font-bold dark:text-light dark:hover:text-light" id="${operation.id}">
                <i class="fa-solid fa-pen"></i>
              </button>
            </td>
          </tr>`;
    }
  } else {
    setStyleFlex('no-operations');
  };
}
