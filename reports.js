//    CREATE NEW REPORT

const createReport = (name) => {
  let newReport = {
    id: uuidv4(),
    name: name,
    highestIncomeData: searchForHighestIncomeCategory(),
    highestExpenseData: searchForHighestExpenseCategory(),
    bestBalanceData: searchForBestBalanceCategory(),
    highestIncomeMonthData: searchForHighestIncomeMonth(),
    highestExpenseMonthData: searchForHighestExpenseMonth(),
    categoryTotalsData: calculateCategoryTotals(),
    monthTotalsData: calculateMonthTotals()
  };
  savedReports.push(newReport);
  updateReports(savedReports);
  createTableForReports(savedReports);
};

const months = [`Enero`, `Febrero`, `Marzo`, `Abril`, `Mayo`, `Junio`, `Julio`, `Agosto`, `Septiembre`, `Octubre`, `Noviembre`, `Diciembre`];

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
    };
  };

  if (highestIncomeCategory !== null) {
    return { highestIncome, highestIncomeCategory }
  };
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
    };
  };

  if (highestExpenseCategory !== null) {
    return { highestExpense, highestExpenseCategory }
  };
};

const searchForBestBalanceCategory = () => {
  const operations = getOperations();
  let categoryBalance = {};

  for (let operation of operations) {
    const category = operation.category;
    const amount = parseInt(operation.amount);
    if (!categoryBalance[category]) {
      categoryBalance[category] = 0;
    };
    if (operation.type === 'Ganancia') {
      categoryBalance[category] += amount;
    } else {
      categoryBalance[category] -= amount;
    };
  };

  let bestBalanceCategory = null;
  let bestBalance = 0;

  for (let category in categoryBalance) {
    if (categoryBalance[category] > bestBalance) {
      bestBalance = categoryBalance[category];
      bestBalanceCategory = category;
    };
  };
  if (bestBalanceCategory !== null) {
    return { bestBalance, bestBalanceCategory };
  };
};

const searchForHighestIncomeMonth = () => {
  const operations = getOperations();
  let monthIncome = {};

  for (let operation of operations) {
    if (operation.type === 'Ganancia') {
      const date = new Date(operation.date)
      const month = date.getMonth();
      const monthName = months[month];
      const amount = parseInt(operation.amount);
      if (!monthIncome[monthName]) {
        monthIncome[monthName] = 0;
      }
      monthIncome[monthName] += amount;
    }
  }

  let highestIncomeMonth = null;
  let highestIncome = 0;

  for (let month in monthIncome) {
    if (monthIncome[month] > highestIncome) {
      highestIncome = monthIncome[month];
      highestIncomeMonth = month;
    }
  }
  return { month: highestIncomeMonth, amount: highestIncome };
};

const searchForHighestExpenseMonth = () => {
  const operations = getOperations();
  let monthExpense = {};

  for (let operation of operations) {
    if (operation.type === 'Gasto') {
      const date = new Date(operation.date)
      const month = date.getMonth();
      const monthName = months[month];
      const amount = parseInt(operation.amount);
      if (!monthExpense[monthName]) {
        monthExpense[monthName] = 0;
      }
      monthExpense[monthName] += amount;
    }
  }

  let highestExpenseMonth = null;
  let highestExpense = 0;

  for (let month in monthExpense) {
    if (monthExpense[month] > highestExpense) {
      highestExpense = monthExpense[month];
      highestExpenseMonth = month;
    }
  }
  return { month: highestExpenseMonth, amount: highestExpense };  
};

const calculateCategoryTotals = () => {
  const operations = getOperations();
  let categoryTotals = {};

  for (let operation of operations) {
    const category = operation.category;
    const amount = parseInt(operation.amount);
    if (!categoryTotals[category]) {
      categoryTotals[category] = { expenses: 0, income: 0, balance: 0 };
    };
    if (operation.type === 'Ganancia') {
      categoryTotals[category].income += amount;
    } else {
      categoryTotals[category].expenses += amount;
    };
    categoryTotals[category].balance = categoryTotals[category].income - categoryTotals[category].expenses;
  };

  return categoryTotals;
};

const calculateMonthTotals = () => {
  const operations = getOperations();
  let monthTotals = {};

  for (let operation of operations) {
    const date = new Date(operation.date);
    const month = date.getMonth();
    const monthName = months[month]
    const amount = parseInt(operation.amount);
    if (!monthTotals[monthName]) {
      monthTotals[monthName] = { expenses: 0, income: 0, balance: 0 };
    };
    if (operation.type === 'Ganancia') {
      monthTotals[monthName].income += amount;
    } else {
      monthTotals[monthName].expenses += amount;
    };
    monthTotals[monthName].balance = monthTotals[monthName].income - monthTotals[monthName].expenses;
  };

  return monthTotals;
}

//      RETURN REPORTS FROM LOCAL STORAGE

const getReports = () => {
  return JSON.parse(localStorage.getItem("reports"));
};

const savedReports = getReports() || [];

//    UPDATE REPORTS

const updateReports = (reports) => {
  localStorage.setItem(`reports`, JSON.stringify(reports));
};

//    CREATE TABLE FOR REPORTS

const createTableForReports = (reports) => {
  const tableForReports = document.getElementById("table-for-reports");
  tableForReports.innerHTML = "";
  if (reports && reports.length > 0) {
    setStyleNone('no-saved-reports');
    reports.forEach(report => {
      tableForReports.innerHTML += `
        <tr class="flex columns-2 justify-between items-center py-1">
          <td class="flex columns-2 w-2/5">
            <button class="watch-report-btn w-full bg-primary dark:bg-secondary px-2 py-1 rounded text-light font-bold hover:bg-secondary dark:hover:bg-primary cursor-pointer justify-left flex gap-2 items-center"
            id="btn-watch-${report.id}">
                <i class="fa-solid fa-eye pointer-events-none"></i>
                    ${report.name}
            </button>
          </td>
          <td class="flex gap-2 tablet:gap-5 w-2/5 justify-end">
              <button
                  class="delete-report-btn flex items-center rounded py-1 px-2 h-8 justify-center bg-dark hover:bg-primary shadow-inner font-bold dark:text-light dark:hover:text-light gap-2"
                  id="btn-delete-${report.id}"
              >
                  <i class="fa-solid fa-trash pointer-events-none"></i>
                  Eliminar
              </button>
              <button
                  class="rename-report-btn flex items-center rounded py-1 px-3 h-8 justify-center hover:bg-accent bg-secondary shadow-inner font-bold dark:text-light dark:hover:text-light gap-2"
                  id="btn-rename-${report.id}" 
              >
                  <i class="fa-solid fa-pen pointer-events-none"></i>
                  Renombrar
              </button>
          </td>
       </tr>`;
    });
    editReportEvent(document.getElementsByClassName("rename-report-btn"));
    deleteReportEvent(document.getElementsByClassName("delete-report-btn"));
    watchReportEvent(document.getElementsByClassName("watch-report-btn"));
  } else {
    setStyleFlex('no-saved-reports');
  };
};

//              RENAME REPORT

const editReportEvent = (renameReportButtons) => {
  const savedReports = getReports();
  for (let btn of renameReportButtons) {
    btn.addEventListener("click", (e) => {
      const report = seekId(savedReports, e.target.id, 11);
      if (report) {
        document.getElementById("input-rename-report").value = report.name;
        document.querySelector('.save-rename-report').setAttribute("id", `confirm-${btn.id.slice(11)}`);
        setStyleFlex("rename-report");
        setStyleNone("reports");
      }
    });
  }
};

const renameReport = (array, reportId, newName) => {
  const savedReports = getReports();
  const editedReports = savedReports.map((object) => {
    if (object.id === reportId) {
      return {
        ...object,
        name: newName
      };
    } else {
      return object; 
    }
  });
  updateReports(editedReports);
  createTableForReports(editedReports);
};

//              DELETE REPORT

const deleteReportEvent = (deleteReportButtons) => {
  const savedReports = getReports();
  for (let btn of deleteReportButtons) {
    btn.addEventListener("click", (e) => {
      const report = seekId(savedReports, e.target.id, 11);
      if (report) {
        document.getElementById("report-name").innerHTML = report.name;
        document.querySelector('.confirm-delete-report').setAttribute("id", `confirm-${btn.id.slice(11)}`);
        document.querySelector('.confirm-delete-report').setAttribute("name", report.name);
        setStyleFlex("delete-report");
        setStyleNone("reports");
      }
    });
  }
};

const confirmDeleteReport = (array, reportId) => {
    const filteredReports = array.filter(object => object.id !== reportId);
    updateReports(filteredReports);
    createTableForReports(filteredReports);
};

const watchReportEvent = (watchReportButtons) => {
  const savedReports = getReports();
  for (let btn of watchReportButtons) {
    btn.addEventListener("click", (e) => {
      const report = seekId(savedReports, e.target.id, 10);
      if (report) {
        createReportsTable(report)
        document.getElementById('report-selected-name').innerHTML= `${report.name}`;
        setStyleFlex("watch-report");
        setStyleNone("reports");
      }
    });
  };
};

//    GENERATE TABLE REPORT

const createReportsTable = (report) => {
  const tableOfReports = document.getElementById("reports-table");
  tableOfReports.innerHTML = "";
    tableOfReports.innerHTML += `
           <thead class="bg-primary dark:bg-secondary text-light">
             <tr class="justify-center">
               <th class="text-center py-1 font-bold text-lg">Resumen</th>
             </tr>
           </thead>
           <tbody id="reports-table-body" class="flex flex-col pt-1 tablet:h-[29rem]">
           </tbody>
           `;
      const reportsBody = document.getElementById("reports-table-body");
      reportsBody.innerHTML += `
          <tr class="flex justify-around items-center gap-1 pt-3">
              <td class="w-1/3 text-left p-1 rounded text-light dark:text-dark font-bold justify-left">Categoría con mayor ganancia</td>
              <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${report.highestIncomeData.highestIncomeCategory}</td>
              <td class="w-1/3 text-right p-1 rounded font-bold text-lg tablet:text-base text-green-600">+$${report.highestIncomeData.highestIncome}</td>
          </tr>
          
          <tr class="flex justify-between items-center gap-1 pt-3">
              <td class="w-1/3 text-left p-1 rounded text-light dark:text-dark font-bold">Categoría con mayor gasto</td>
              <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${report.highestExpenseData.highestExpenseCategory}</td>
              <td class="w-1/3 text-right p-1 rounded font-bold text-lg tablet:text-base text-red-600">-$${report.highestExpenseData.highestExpense}</td>
          </tr>
          <tr class="flex justify-between items-center gap-1 pt-3">
              <td class="w-1/3 text-left p-1 rounded text-light dark:text-dark font-bold">Categoría con mayor balance</td>
              <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${report.bestBalanceData.bestBalanceCategory}</td>
              <td class="w-1/3 text-right p-1 rounded font-bold text-lg tablet:text-base">$${report.bestBalanceData.bestBalance}</td>
          </tr>
          <tr class="flex justify-between items-center gap-1 pt-3">
              <td class="w-1/3 text-left p-1 rounded text-light dark:text-dark font-bold">Mes con mayor ganancia</td>
              <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${report.highestIncomeMonthData.month}</td>
              <td class="w-1/3 text-right p-1 rounded font-bold text-lg tablet:text-base text-green-600">+$${report.highestIncomeMonthData.amount}</td>
          </tr>

          <tr class="flex justify-between items-center gap-1 py-3">
              <td class="w-1/3 text-left p-1 rounded text-light dark:text-dark font-bold">Mes con mayor gasto</td>
              <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${report.highestExpenseMonthData.month}</td>
              <td class="w-1/3 text-right p-1 rounded font-bold text-lg tablet:text-base text-red-600">-$${report.highestExpenseMonthData.amount}</td>
          </tr>
          <th class="font-bold flex font-sans text-left text-lg dark:text-light bg-primary dark:bg-secondary justify-center">Totales por categoría</th>
          <tr class="flex justify-between items-center py-1">
            <th class="p-1 w-1/4 text-left">Categoría</th>              
            <th class="p-1 w-1/4 text-center">Ganancias</th>
            <th class="p-1 w-1/4 text-center">Gastos</th>
            <th class="p-1 w-1/4 text-right">Balance</th>
          </tr>`;

          for (let category in report.categoryTotalsData) {
            const { expenses, income, balance } = report.categoryTotalsData[category];
            const balanceColorClass = balance >= 0 ? "text-green-600" : "text-red-600";
            const formattedBalance = balance >= 0 ? `+$${balance}` : `-$${-balance}`;
            reportsBody.innerHTML += `
              <tr class="flex justify-between items-center py-2">
                <td class="p-1 text-left w-1/4 font-bold">${category}</td>
                <td class="text-green-600 p-1 w-1/4 text-center font-bold">+$${income}</td>
                <td class="text-red-600 p-1 w-1/4 text-center font-bold">-$${expenses}</td>
                <td class="p-1 w-1/4 text-right font-bold ${balanceColorClass}">${formattedBalance}</td>
              </tr>`;
          };
          reportsBody.innerHTML += `
          <th class="font-bold flex font-sans text-left text-lg dark:text-light bg-primary dark:bg-secondary justify-center">Totales por mes</th>
          <tr class="flex justify-between items-center py-1">
              <th class="p-1 w-1/4 text-left">Mes</th>
              <th class="p-1 w-1/4 text-center">Ganancias</th>
              <th class="p-1 w-1/4 text-center">Gastos</th>
              <th class="p-1 w-1/4 text-right">Balance</th>
          </tr>`;

          for (let month in report.monthTotalsData) {
            const { expenses, income, balance } = report.monthTotalsData[month];
            const balanceColorClass = balance >= 0 ? "text-green-600" : "text-red-600";
            const formattedBalance = balance >= 0 ? `+$${balance}` : `-$${-balance}`;
            reportsBody.innerHTML += `
          <tr class="flex justify-between items-center py-1">
            <td class="p-1 w-1/4 text-left font-bold">${month}</td>
            <td class="text-green-600 p-1 w-1/4 text-center font-bold">+$${income}</td>
            <td class="text-red-600 p-1 w-1/4 text-center font-bold">-$${expenses}</td>
            <td class="p-1 w-1/4 text-right font-bold ${balanceColorClass}">${formattedBalance}</td>
          </tr>`
          };
};

