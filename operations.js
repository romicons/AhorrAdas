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
           <thead class="sticky top-0 bg-primary dark:bg-secondary text-light z-50">
             <tr class="justify-around hidden tablet:flex">
               <th class="w-1/5 py-1">Descripción</th>
               <th class="w-1/5 py-1">Monto</th>
               <th class="w-1/5 py-1">Categoría</th>
               <th class="w-1/5 py-1">Fecha</th>
               <th class="w-1/5 py-1 flex justify-center">Acciones</th>
             </tr>
           </thead>
           <tbody id="operations-table-body" class="flex flex-col">
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
            <td class="w-1/4 tablet:w-1/5 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${operation.description}</td>
            <td class="w-1/4 tablet:w-1/5 text-center p-1 rounded font-bold text-lg tablet:text-base ${amountType}">${amountSign}${operation.amount}</td>
            <td class="w-1/4 tablet:w-1/5 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${operation.category}</td>
            <td class="tablet:w-1/5 text-center px-2 py-1 rounded text-light dark:text-dark font-bold hidden tablet:flex justify-center">${formattedDateStr}</td>
            <td class="w-1/4 tablet:w-1/5 flex gap-1 justify-end tablet:justify-center">
              <button class="delete-operation-btn flex items-center rounded py-1 px-2 tablet:px-4 h-8 justify-center bg-dark hover:bg-primary shadow-inner font-bold dark:text-light dark:hover:text-light" id="btn-delete-${operation.id}">
                <i class="fa-solid fa-trash pointer-events-none"></i>
              </button>
              <button class="edit-operation-btn flex items-center rounded py-1 px-2 tablet:px-4 h-8 justify-center hover:bg-accent bg-secondary shadow-inner font-bold dark:text-light dark:hover:text-light" id="btn-edit-${operation.id}">
                  <i class="fa-solid fa-pen pointer-events-none"></i>
              </button>
            </td>
          </tr>`;
    };
    editOperationEvent();
    deleteOperationEvent();
  } else {
    setStyleFlex('no-operations');
  };
};
  
//      EDIT OPERATION

const editOperationEvent = () => {
  const editOperationBtns = document.getElementsByClassName("edit-operation-btn");
  const savedOperations = validateLocalStorage("operations", operations);
  for (let btn of editOperationBtns) {
    btn.addEventListener("click", (e) => {
      const operation = seekId(savedOperations, e.target.id, 9);
      if (operation) {
        console.log('entre en el if porque encontre el id de tu operacion')
        document.getElementById("edit-description-operation").value = operation.description;
        document.getElementById("edit-operation-amount").value = operation.amount;
        document.getElementById("edit-type-operation").value = operation.type;
        document.getElementById("edit-category-operation").value = operation.category;
        document.getElementById("edit-date-operation").value = operation.date;
        setStyleFlex("edit-operation");
        setStyleNone("balance-section");
      }
    });
  }
};

//      DELETE OPERATION

const deleteOperationEvent = () => {
  const deleteOperationBtns = document.getElementsByClassName(
    "delete-operation-btn"
  );
  const savedOperations = validateLocalStorage("operations", operations);
  for (let btn of deleteOperationBtns) {
    btn.addEventListener("click", (e) => {
      const operation = seekId(savedOperations, e.target.id, 11);
      if (operation) {
        document.getElementById("operation-name").innerHTML = operation.description;
        setStyleFlex("delete-operation");
        setStyleNone("balance-section");
      }
    });
  }
};
