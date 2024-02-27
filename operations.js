const operations = [];

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

//    UPDATE OPERATIONS

const updateOperations = () => {
  localStorage.setItem(`operations`, JSON.stringify(operations));
  console.log("estoy updateando tus operations", operations);
};

//  GENERATE TABLE OF OPERATIONS

const createOperationsTable = () => {
    const tableOfOperations = document.getElementById("operations-table");
    const savedOperations = validateLocalStorage("operations", operations);
    tableOfOperations.innerHTML = "";
  
    if (savedOperations && savedOperations.length > 0) {
      tableOfOperations.innerHTML += `
           <thead>
             <tr class="border-b-2 border-light dark:border-dark flex justify-around">
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

        const amountType = operation.type === "Ganancia" ? "text-green-600" : "text-red-600";
        const amountSign = operation.type === "Ganancia" ? "+$" : "-$";
        const operationBody = document.getElementById("operations-table-body");
        operationBody.innerHTML += `
          <tr class="flex justify-between items-center py-1">
            <td class="w-1/5 text-center bg-primary dark:bg-secondary px-1 py-1 rounded text-light font-bold">${operation.description}</td>
            <td class="w-1/5 text-center px-2 py-1 rounded font-bold ${amountType}">${amountSign}${operation.amount}</td>
            <td class="w-1/5 text-center bg-primary dark:bg-secondary px-1 py-1 rounded text-light font-bold">${operation.category}</td>
            <td class="w-1/5 text-center px-2 py-1 rounded text-light dark:text-light font-bold">${formattedDateStr}</td>
            <td class="w-1/5 flex gap-2 justify-center">
              <button class="delete-operation-btn flex items-center rounded py-1 px-4 h-8 justify-center bg-dark hover:bg-primary shadow-inner font-bold dark:text-light dark:hover:text-light" id="${operation.id}">
                <i class="fa-solid fa-trash"></i>
              </button>
              <button class="edit-operation-btn flex items-center rounded py-1 px-4 h-8 justify-center hover:bg-accent bg-secondary shadow-inner font-bold dark:text-light dark:hover:text-light" id="${operation.id}">
                <i class="fa-solid fa-pen"></i>
              </button>
            </td>
          </tr>`
          ;
      }
    } else {
    document.getElementById(
      `no-operations`
    ).innerHTML = `<div class="flex py-4">
              <svg
                viewBox="0 0 400 300"
                xmlns="http://www.w3.org/2000/svg"
                class="w-96"
                aria-label="A piggy bank."
              >
                <rect
                  fill="#ffbc0e"
                  height="10.03"
                  rx="2.11"
                  transform="matrix(-1 0 0 -1 223.35 446.85)"
                  width="38.74"
                  x="92.3"
                  y="218.41"
                />
                <path
                  d="m128.94 229.44h-34.52a3.12 3.12 0 0 1 -3.12-3.11v-5.81a3.12 3.12 0 0 1 3.12-3.11h34.52a3.12 3.12 0 0 1 3.11 3.11v5.81a3.11 3.11 0 0 1 -3.11 3.11zm-34.52-10a1.12 1.12 0 0 0 -1.12 1.11v5.81a1.12 1.12 0 0 0 1.12 1.11h34.52a1.11 1.11 0 0 0 1.11-1.11v-5.81a1.11 1.11 0 0 0 -1.11-1.11z"
                  fill="#093f68"
                />
                <rect
                  fill="#ffbc0e"
                  height="10.03"
                  rx="2.11"
                  transform="matrix(-1 0 0 -1 231.63 426.79)"
                  width="38.74"
                  x="96.44"
                  y="208.38"
                />
                <path
                  d="m133.08 219.41h-34.52a3.12 3.12 0 0 1 -3.12-3.11v-5.81a3.12 3.12 0 0 1 3.12-3.11h34.52a3.12 3.12 0 0 1 3.11 3.11v5.81a3.12 3.12 0 0 1 -3.11 3.11zm-34.52-10a1.12 1.12 0 0 0 -1.12 1.11v5.81a1.12 1.12 0 0 0 1.12 1.11h34.52a1.11 1.11 0 0 0 1.11-1.11v-5.81a1.11 1.11 0 0 0 -1.11-1.11z"
                  fill="#093f68"
                />
                <rect
                  fill="#ffbc0e"
                  height="10.03"
                  rx="2.11"
                  transform="matrix(-1 0 0 -1 240.07 406.73)"
                  width="38.74"
                  x="100.66"
                  y="198.35"
                />
                <path
                  d="m137.29 209.38h-34.52a3.12 3.12 0 0 1 -3.11-3.11v-5.81a3.11 3.11 0 0 1 3.11-3.11h34.52a3.12 3.12 0 0 1 3.12 3.11v5.81a3.12 3.12 0 0 1 -3.12 3.11zm-34.52-10a1.11 1.11 0 0 0 -1.11 1.11v5.81a1.11 1.11 0 0 0 1.11 1.11h34.52a1.12 1.12 0 0 0 1.12-1.11v-5.81a1.12 1.12 0 0 0 -1.12-1.11z"
                  fill="#093f68"
                />
                <rect
                  fill="#ffbc0e"
                  height="10.03"
                  rx="2.11"
                  transform="matrix(-1 0 0 -1 213.25 386.66)"
                  width="38.74"
                  x="87.25"
                  y="188.32"
                />
                <path
                  d="m123.88 199.35h-34.52a3.12 3.12 0 0 1 -3.11-3.11v-5.81a3.11 3.11 0 0 1 3.11-3.11h34.52a3.12 3.12 0 0 1 3.12 3.11v5.81a3.12 3.12 0 0 1 -3.12 3.11zm-34.52-10a1.11 1.11 0 0 0 -1.11 1.11v5.81a1.11 1.11 0 0 0 1.11 1.11h34.52a1.12 1.12 0 0 0 1.12-1.11v-5.81a1.11 1.11 0 0 0 -1.12-1.11z"
                  fill="#093f68"
                />
                <rect
                  fill="#ffbc0e"
                  height="10.03"
                  rx="2.11"
                  transform="matrix(-1 0 0 -1 223.35 366.6)"
                  width="38.74"
                  x="92.3"
                  y="178.28"
                />
                <path
                  d="m128.94 189.32h-34.52a3.12 3.12 0 0 1 -3.12-3.12v-5.8a3.12 3.12 0 0 1 3.12-3.12h34.52a3.12 3.12 0 0 1 3.11 3.12v5.8a3.12 3.12 0 0 1 -3.11 3.12zm-34.52-10a1.12 1.12 0 0 0 -1.12 1.12v5.8a1.12 1.12 0 0 0 1.12 1.12h34.52a1.12 1.12 0 0 0 1.11-1.12v-5.8a1.12 1.12 0 0 0 -1.11-1.12z"
                  fill="#093f68"
                />
                <path
                  d="m135.31 145.87c-4.24 0-10.77-.77-15.38-4.85a8.18 8.18 0 0 1 -1.66-2c-2.65-.35-6-1.72-9.62-5.47a1 1 0 0 1 1.44-1.39 16.08 16.08 0 0 0 7.24 4.64 13.59 13.59 0 0 1 -.2-6.34c.67-3.24 2.37-5.61 4.55-6.32 1.29-.42 3.35-.45 5.82 1.78a6.07 6.07 0 0 1 1.77 6.09 9.54 9.54 0 0 1 -6.83 6.74 9.92 9.92 0 0 1 -1.68.31 5.66 5.66 0 0 0 .49.49c6.52 5.77 17.89 4.12 18 4.1a1 1 0 0 1 .3 2 31.94 31.94 0 0 1 -4.24.22zm-15.76-8.78a7.8 7.8 0 0 0 2.36-.3 7.61 7.61 0 0 0 5.41-5.28 4.11 4.11 0 0 0 -1.16-4.14c-1.41-1.27-2.71-1.73-3.86-1.36-1.46.48-2.7 2.33-3.21 4.83a11.11 11.11 0 0 0 .46 6.25z"
                  fill="#093f68"
                />
                <path
                  d="m256.53 113.76s27-19.06 26.19-10.53-6.77 26-6.77 26"
                  fill="#c8d6bf"
                />
                <path
                  d="m276 130.24a1 1 0 0 1 -.33-.06 1 1 0 0 1 -.62-1.27c.06-.17 6-17.46 6.73-25.77.07-.78-.18-.92-.26-1-2.36-1.37-14.24 5.24-24.37 12.4a1 1 0 0 1 -1.15-1.54c3.61-2.56 21.87-15.17 26.52-12.51a2.74 2.74 0 0 1 1.25 2.87c-.76 8.56-6.58 25.53-6.83 26.25a1 1 0 0 1 -.94.63z"
                  fill="#093f68"
                />
                <path
                  d="m237.78 228.44h8.84a6.92 6.92 0 0 0 6.86-6l3.53-25.8h-29.61l3.53 25.8a6.91 6.91 0 0 0 6.85 6z"
                  fill="#c8d6bf"
                />
                <path
                  d="m246.62 229.44h-8.84a7.94 7.94 0 0 1 -7.84-6.84l-3.53-25.8a1 1 0 0 1 .24-.79 1 1 0 0 1 .75-.35h29.6a1 1 0 0 1 .76.35 1 1 0 0 1 .24.79l-3.53 25.8a8 8 0 0 1 -7.85 6.84zm-18.07-31.78 3.37 24.66a5.94 5.94 0 0 0 5.86 5.12h8.84a5.94 5.94 0 0 0 5.87-5.12l3.37-24.66z"
                  fill="#093f68"
                />
                <path
                  d="m167.81 228.44h8.84a6.92 6.92 0 0 0 6.86-6l3.52-25.8h-29.6l3.53 25.8a6.9 6.9 0 0 0 6.85 6z"
                  fill="#c8d6bf"
                />
                <path
                  d="m176.65 229.44h-8.84a8 8 0 0 1 -7.81-6.84l-3.52-25.8a1 1 0 0 1 .24-.79 1 1 0 0 1 .75-.35h29.53a1 1 0 0 1 .76.35 1 1 0 0 1 .23.79l-3.52 25.8a8 8 0 0 1 -7.82 6.84zm-18.08-31.78 3.43 24.66a5.93 5.93 0 0 0 5.86 5.12h8.84a5.94 5.94 0 0 0 5.87-5.12l3.37-24.66z"
                  fill="#093f68"
                />
                <path
                  d="m183.13 102h46.6a53.47 53.47 0 0 1 53.47 53.47v3.61a53.49 53.49 0 0 1 -37 50.87l-1.71 12.51a6.92 6.92 0 0 1 -6.86 6h-8.84a6.92 6.92 0 0 1 -6.86-6l-1.35-9.91h-37.45a53.42 53.42 0 0 1 -7.31-.51l-1.43 10.42a6.92 6.92 0 0 1 -6.85 6h-8.84a6.92 6.92 0 0 1 -6.86-6l-3.06-22.41a53.34 53.34 0 0 1 -19.12-41v-3.61a53.47 53.47 0 0 1 53.47-53.44z"
                  fill="#c8d6bf"
                />
                <path
                  d="m237.66 229.44h-8.84a8 8 0 0 1 -7.82-6.84l-1.23-9h-36.64a55 55 0 0 1 -6.46-.39l-1.29 9.44a7.94 7.94 0 0 1 -7.84 6.84h-8.84a8 8 0 0 1 -7.85-6.84l-3-22a54.35 54.35 0 0 1 -19.18-41.48v-3.61a54.53 54.53 0 0 1 54.46-54.56h46.6a54.53 54.53 0 0 1 54.47 54.47v3.61a54.32 54.32 0 0 1 -37.07 51.62l-1.62 11.9a8 8 0 0 1 -7.85 6.84zm-61.84-18.44h.18a53.63 53.63 0 0 0 7.18.5h37.48a1 1 0 0 1 1 .87l1.36 9.9a5.93 5.93 0 0 0 5.86 5.12h8.84a5.94 5.94 0 0 0 5.87-5.12l1.71-12.51a1 1 0 0 1 .68-.81 52.34 52.34 0 0 0 36.28-49.92v-3.61a52.53 52.53 0 0 0 -52.53-52.42h-46.6a52.53 52.53 0 0 0 -52.47 52.47v3.61a52.39 52.39 0 0 0 18.76 40.2 1.05 1.05 0 0 1 .35.63l3.06 22.41a5.94 5.94 0 0 0 5.87 5.12h8.84a5.94 5.94 0 0 0 5.86-5.12l1.42-10.41a1 1 0 0 1 .39-.66 1 1 0 0 1 .61-.25z"
                  fill="#093f68"
                />
                <rect
                  fill="#c8d6bf"
                  height="28.87"
                  rx="13.57"
                  transform="matrix(-1 0 0 -1 531.78 337.01)"
                  width="49.68"
                  x="241.05"
                  y="154.07"
                />
                <path
                  d="m277.16 183.94h-22.54a14.59 14.59 0 0 1 -14.57-14.57v-1.73a14.59 14.59 0 0 1 14.57-14.57h22.54a14.59 14.59 0 0 1 14.57 14.57v1.73a14.59 14.59 0 0 1 -14.57 14.57zm-22.54-28.87a12.59 12.59 0 0 0 -12.57 12.57v1.73a12.59 12.59 0 0 0 12.57 12.57h22.54a12.59 12.59 0 0 0 12.57-12.57v-1.73a12.59 12.59 0 0 0 -12.57-12.57z"
                  fill="#093f68"
                />
                <path
                  d="m246.32 115.69s-9-23.59-13.65-23.59-11.67 30.11-11.67 30.11"
                  fill="#093f68"
                />
                <path
                  d="m221 123.21h-.23a1 1 0 0 1 -.77-1.21c0-.07 1.79-7.64 4.11-15.12 4.34-14 6.85-15.76 8.55-15.76 5 0 12.42 18.55 14.59 24.23a1 1 0 0 1 -.58 1.29 1 1 0 0 1 -1.29-.58c-4.21-11-10.27-22.94-12.72-22.94-1.87 0-6.62 11.79-10.71 29.34a1 1 0 0 1 -.95.75z"
                  fill="#093f68"
                />
                <circle cx="273.79" cy="168.51" fill="#c8d6bf" r="4.16" />
                <path
                  d="m273.79 173.67a5.17 5.17 0 1 1 5.17-5.16 5.17 5.17 0 0 1 -5.17 5.16zm0-8.33a3.17 3.17 0 1 0 3.17 3.17 3.17 3.17 0 0 0 -3.17-3.17z"
                  fill="#093f68"
                />
                <circle cx="257.99" cy="168.51" fill="#c8d6bf" r="4.16" />
                <g fill="#093f68">
                  <path
                    d="m258 173.67a5.17 5.17 0 1 1 5.16-5.16 5.17 5.17 0 0 1 -5.16 5.16zm0-8.33a3.17 3.17 0 1 0 3.16 3.17 3.17 3.17 0 0 0 -3.16-3.17z"
                  />
                  <path
                    d="m170.84 109.76a2.61 2.61 0 0 0 2.61 2.61h39.61a2.6 2.6 0 0 0 2.6-2.61 2.57 2.57 0 0 0 -.76-1.83 2.6 2.6 0 0 0 -1.66-.76h-40a2.6 2.6 0 0 0 -2.4 2.59z"
                  />
                  <path
                    d="m213.06 113.37h-39.61a3.6 3.6 0 0 1 -.25-7.2h39.86.32a3.44 3.44 0 0 1 2.22 1 3.55 3.55 0 0 1 1.06 2.54 3.61 3.61 0 0 1 -3.6 3.66zm-39.61-5.21h-.12a1.6 1.6 0 0 0 .12 3.2h39.61a1.6 1.6 0 0 0 .11-3.2z"
                  />
                  <ellipse cx="271.71" cy="142.47" rx="2.08" ry="4.35" />
                  <ellipse cx="253.83" cy="142.47" rx="2.08" ry="4.35" />
                </g>
                <path
                  d="m136.93 166.22a1 1 0 0 1 -1-.81c-5.38-28.65 16.59-43.88 16.82-44a1 1 0 0 1 1.38.27 1 1 0 0 1 -.26 1.39c-.21.14-21.11 14.67-16 42a1 1 0 0 1 -.8 1.16z"
                  fill="#fff"
                />
                <circle cx="217.93" cy="71.78" fill="#ffbc0e" r="18.01" />
                <path
                  d="m217.92 90.8a19.07 19.07 0 1 1 7.2-1.43 19 19 0 0 1 -7.2 1.43zm0-36a17.08 17.08 0 0 0 -15.68 10.4 17 17 0 1 0 15.69-10.44z"
                  fill="#093f68"
                />
                <path
                  d="m213.87 58.22c.36.87.73 1.73 1.08 2.6.07.17.15.2.33.17a8.42 8.42 0 0 1 4.14.16 6 6 0 0 1 3.41 2.61c.21.34.4.7.61 1.07l-4 1.68a2.91 2.91 0 0 0 -1.29-1.41 12.67 12.67 0 0 0 -1.47-.49v.09l2.1 5 .47-.08a15.34 15.34 0 0 1 3.58-.31 5 5 0 0 1 4.26 2.69 6.52 6.52 0 0 1 -1.27 8.26c-.63.57-1.34 1.06-2 1.61l.82 2-3.7 1.55-.84-2c-.83.11-1.61.26-2.4.31a6.79 6.79 0 0 1 -4.33-1.09 6.63 6.63 0 0 1 -2.39-3l4-1.66a3.38 3.38 0 0 0 3.64 1.92q-1.12-2.7-2.25-5.37c-.84.1-1.68.21-2.52.29a6.19 6.19 0 0 1 -3-.33 4.94 4.94 0 0 1 -2.32-2 7 7 0 0 1 -1.2-3.54 6.24 6.24 0 0 1 2-4.9 18.09 18.09 0 0 1 1.78-1.35 2.1 2.1 0 0 1 .22-.15l-1.13-2.7zm8.41 20a3.39 3.39 0 0 0 1.36-1.42 2.32 2.32 0 0 0 -.84-3 4.53 4.53 0 0 0 -2.45-.22zm-9.54-12.32a10.92 10.92 0 0 0 -1.12 1.32 2.14 2.14 0 0 0 1 3.1 4.62 4.62 0 0 0 2 .05z"
                  fill="#fff"
                />
                <path
                  d="m209.78 110.29a18.88 18.88 0 0 0 .77-2 18.09 18.09 0 0 0 .62-2.64 17.5 17.5 0 0 0 .22-2.82 18 18 0 0 0 -36 0 18.72 18.72 0 0 0 .21 2.82 18.12 18.12 0 0 0 .63 2.64 16.86 16.86 0 0 0 .76 2"
                  fill="#ffbc0e"
                />
                <path
                  d="m209.78 111.29a1 1 0 0 1 -.4-.08 1 1 0 0 1 -.51-1.32 17.67 17.67 0 0 0 .72-1.88 15.58 15.58 0 0 0 .59-2.5 16.65 16.65 0 0 0 .21-2.66 17 17 0 1 0 -33.81 2.67 18.27 18.27 0 0 0 .59 2.49 19.13 19.13 0 0 0 .72 1.88 1 1 0 1 1 -1.82.81 18.86 18.86 0 0 1 -.81-2.09 20.7 20.7 0 0 1 -.66-2.78 19.54 19.54 0 0 1 -.22-3 19 19 0 0 1 38 0 19.31 19.31 0 0 1 -.23 3 19.1 19.1 0 0 1 -.66 2.79 20.87 20.87 0 0 1 -.8 2.09 1 1 0 0 1 -.91.58z"
                  fill="#093f68"
                />
                <path
                  d="m202.25 106.78a5.55 5.55 0 0 0 -.24-1.12 4.88 4.88 0 0 0 -2.72-3 15.31 15.31 0 0 0 -3.42-1.09l-.47-.11v-5.46l.08-.06a12.62 12.62 0 0 1 1.16 1 2.86 2.86 0 0 1 .65 1.8h4.36c-.06-.42-.09-.82-.15-1.22a6 6 0 0 0 -2.14-3.73 8.58 8.58 0 0 0 -3.75-1.75c-.18 0-.23-.09-.23-.28v-2.76h-4v2.92h-.26a19.76 19.76 0 0 0 -2.17.57 6.18 6.18 0 0 0 -3.76 3.72 6.9 6.9 0 0 0 -.27 3.74 5 5 0 0 0 1.38 2.7 6.33 6.33 0 0 0 2.63 1.46c.8.25 1.62.47 2.43.7v5.44h4v-4.55a4.57 4.57 0 0 1 2.17 1.15 2 2 0 0 1 .41 1.42 2.33 2.33 0 0 1 -.78 1.64 2.73 2.73 0 0 1 -.5.34h5.13a5.87 5.87 0 0 0 .48-2 7.15 7.15 0 0 0 -.02-1.47zm-12.67-7.1a2.14 2.14 0 0 1 .25-3.27 11.48 11.48 0 0 1 1.53-.77v4.84a4.65 4.65 0 0 1 -1.78-.8zm-.69 8.63a4.84 4.84 0 0 1 -.16-.81h-4.28a7.09 7.09 0 0 0 0 .81 6.54 6.54 0 0 0 .49 2h5.42a3.13 3.13 0 0 1 -1.47-2z"
                  fill="#fff"
                />
                <rect
                  fill="#ffbc0e"
                  height="10.03"
                  rx="2.11"
                  transform="matrix(-1 0 0 -1 570.53 446.85)"
                  width="38.74"
                  x="265.89"
                  y="218.41"
                />
                <path
                  d="m302.52 229.44h-34.52a3.11 3.11 0 0 1 -3.11-3.11v-5.81a3.12 3.12 0 0 1 3.11-3.11h34.52a3.12 3.12 0 0 1 3.12 3.11v5.81a3.12 3.12 0 0 1 -3.12 3.11zm-34.52-10a1.11 1.11 0 0 0 -1.11 1.11v5.81a1.11 1.11 0 0 0 1.11 1.11h34.52a1.12 1.12 0 0 0 1.12-1.11v-5.81a1.12 1.12 0 0 0 -1.12-1.11z"
                  fill="#093f68"
                />
                <rect
                  fill="#ffbc0e"
                  height="10.03"
                  rx="2.11"
                  transform="matrix(-1 0 0 -1 581.33 426.79)"
                  width="38.74"
                  x="271.29"
                  y="208.38"
                />
                <path
                  d="m307.93 219.41h-34.52a3.12 3.12 0 0 1 -3.12-3.11v-5.81a3.12 3.12 0 0 1 3.12-3.11h34.52a3.12 3.12 0 0 1 3.11 3.11v5.81a3.12 3.12 0 0 1 -3.11 3.11zm-34.52-10a1.12 1.12 0 0 0 -1.12 1.11v5.81a1.12 1.12 0 0 0 1.12 1.11h34.52a1.11 1.11 0 0 0 1.07-1.14v-5.81a1.11 1.11 0 0 0 -1.11-1.11z"
                  fill="#093f68"
                />
                <path
                  d="m318.44 229.44h-236.88a1 1 0 0 1 0-2h236.88a1 1 0 0 1 0 2z"
                  fill="#093f68"
                />
              </svg>
            </div>
            <div class="flex flex-col justify-center text-center">
              <div class="text-2xl font-bold">
                <h2>Sin resultados disponibles</h2>
              </div>
              <div class="text-lg">
                <p>Revisa tus filtros o añade nuevas operaciones</p>
              </div>
            </div>`;
  }
};

//    FUNCTION OF DATE
