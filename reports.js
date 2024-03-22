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

const highestIncomeData = searchForHighestIncomeCategory();
const highestExpenseData = searchForHighestExpenseCategory();
const bestBalanceData = searchForBestBalanceCategory();
const highestIncomeMonthData = searchForHighestIncomeMonth();
const highestExpenseMonthData = searchForHighestExpenseMonth();
const categoryTotalsData = calculateCategoryTotals();
const monthTotalsData = calculateMonthTotals();

//  GENERATE TABLE OF REPORTS

const createReportsTable = (operations) => {
    const tableOfReports = document.getElementById("reports-table");
    tableOfReports.innerHTML = "";
    if (operations && operations.length > 0) {
      setStyleNone('no-reports');
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
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${highestIncomeData.highestIncomeCategory}</td>
                <td class="w-1/3 text-right p-1 rounded font-bold text-lg tablet:text-base text-green-600">+$${highestIncomeData.highestIncome}</td>
            </tr>
            
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-left p-1 rounded text-light dark:text-dark font-bold">Categoría con mayor gasto</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${highestExpenseData.highestExpenseCategory}</td>
                <td class="w-1/3 text-right p-1 rounded font-bold text-lg tablet:text-base text-red-600">-$${highestExpenseData.highestExpense}</td>
            </tr>
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-left p-1 rounded text-light dark:text-dark font-bold">Categoría con mayor balance</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${bestBalanceData.bestBalanceCategory}</td>
                <td class="w-1/3 text-right p-1 rounded font-bold text-lg tablet:text-base">$${bestBalanceData.bestBalance}</td>
            </tr>
            <tr class="flex justify-between items-center gap-1 pt-3">
                <td class="w-1/3 text-left p-1 rounded text-light dark:text-dark font-bold">Mes con mayor ganancia</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${highestIncomeMonthData.month}</td>
                <td class="w-1/3 text-right p-1 rounded font-bold text-lg tablet:text-base text-green-600">+$${highestIncomeMonthData.amount}</td>
            </tr>

            <tr class="flex justify-between items-center gap-1 py-3">
                <td class="w-1/3 text-left p-1 rounded text-light dark:text-dark font-bold">Mes con mayor gasto</td>
                <td class="w-1/3 text-center bg-primary dark:bg-secondary p-1 rounded text-light font-bold">${highestExpenseMonthData.month}</td>
                <td class="w-1/3 text-right p-1 rounded font-bold text-lg tablet:text-base text-red-600">-$${highestExpenseMonthData.amount}</td>
            </tr>
            <th class="font-bold flex font-sans text-left text-lg dark:text-light bg-primary dark:bg-secondary justify-center">Totales por categoría</th>
            <tr class="flex justify-between items-center py-1">
              <th class="p-1 w-1/4 text-left">Categoría</th>              
              <th class="p-1 w-1/4 text-center">Ganancias</th>
              <th class="p-1 w-1/4 text-center">Gastos</th>
              <th class="p-1 w-1/4 text-right">Balance</th>
            </tr>`;

            for (let category in categoryTotalsData) {
              const { expenses, income, balance } = categoryTotalsData[category];
              reportsBody.innerHTML += `
                <tr class="flex justify-between items-center py-2">
                  <td class="p-1 text-left w-1/4 font-bold">${category}</td>
                  <td class="text-green-600 p-1 w-1/4 text-center font-bold">+$${income}</td>
                  <td class="text-red-600 p-1 w-1/4 text-center font-bold">-$${expenses}</td>
                  <td class="p-1 w-1/4 text-right font-bold">$${balance}</td>
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

            for (let month in monthTotalsData) {
              const { expenses, income, balance } = monthTotalsData[month];
              reportsBody.innerHTML += `
            <tr class="flex justify-between items-center py-1">
              <td class="p-1 w-1/4 text-left font-bold">${month}</td>
              <td class="text-green-600 p-1 w-1/4 text-center font-bold">+$${income}</td>
              <td class="text-red-600 p-1 w-1/4 text-center font-bold">-$${expenses}</td>
              <td class="p-1 w-1/4 text-right font-bold">$${balance}</td>
            </tr>`
            };
    } else {
      setStyleFlex('no-reports');
    };
  }