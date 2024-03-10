//                      INITIALIZE APLICATION

initializeApp();

//                      ACTIVATE DARK/LIGHT MODE

const darkModeToggle = document.querySelector('#btn-darkmode');

darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList.contains('dark')) {
        darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});

//                      RESPONSIVE DESIGN EVENT LISTENERS

//      GO TO HOME/BALANCE WINDOW

document.getElementById('home-section').addEventListener('click', () => {
  setStyleFlex('balance-section');
  setStyleNone('categories');
  setStyleNone('reports');
  setStyleNone('new-operation');
  setStyleNone('rename-category');
  setStyleNone('delete-category');
  setStyleNone('edit-operation');
  setStyleNone('delete-operation');
})

//      OPEN BALANCE WINDOW

document.getElementById('balance-window-btn').addEventListener('click', () => {
    setStyleFlex('balance-section');
    setStyleNone('categories');
    setStyleNone('reports');
    setStyleNone('new-operation');
    setStyleNone('rename-category');
    setStyleNone('delete-category');
    setStyleNone('edit-operation');
    setStyleNone('delete-operation');
    toggleMobileNav();
});

//      OPEN CATEGORIES WINDOW

document.getElementById('categories-window-btn').addEventListener('click', () => {
    setStyleFlex('categories');
    setStyleNone('balance-section');
    setStyleNone('reports');
    setStyleNone('new-operation');
    setStyleNone('rename-category');
    setStyleNone('delete-category');
    setStyleNone('delete-category');
    setStyleNone('edit-operation');
    setStyleNone('delete-operation');
    toggleMobileNav();
});

//      OPEN REPORTS WINDOW

document.getElementById('reports-window-btn').addEventListener('click', () => {
    setStyleFlex('reports');
    setStyleNone('balance-section');
    setStyleNone('categories');
    setStyleNone('new-operation');
    setStyleNone('rename-category');
    setStyleNone('delete-category');
    setStyleNone('delete-category');
    setStyleNone('edit-operation');
    setStyleNone('delete-operation');
    toggleMobileNav();
});

//      HIDE FILTERS

document.getElementById('hide-filters-btn').addEventListener('click', () => {
    document.getElementById('filters-col').classList.toggle('hidden');
    if (document.getElementById('filters-col').classList.contains('hidden')) {
        document.getElementById('hide-filters-btn').innerHTML = 'Mostrar filtros';
    } else {
        document.getElementById('hide-filters-btn').innerHTML = 'Ocultar filtros';
    }
})

//      FILTER OPERATIONS BY TYPE

document.getElementById('operation-type-filter').addEventListener('change', filterOperations);

//      FILTER OPERATIONS BY CATEGORY

document.getElementById('operation-category-filter').addEventListener('change', filterOperations);

//      FILTER OPERATIONS FROM X DATE

document.getElementById("operation-date-from").addEventListener('change', filterOperations);

//      FILTER OPERATIONS UNTIL X DATE

document.getElementById("operation-date-until").addEventListener('change', filterOperations);

//      FILTER THE ORDER OF THE OPERATIONS

document.getElementById('operation-order').addEventListener('change', filterOperations);

//      OPEN NEW OPERATION WINDOW

document.getElementById('add-operation-btn').addEventListener('click', () => {
    setStyleFlex('new-operation');
    setStyleNone('balance-section');
})

//      CANCEL NEW OPERATION

document.getElementById('close-new-operation').addEventListener('click', () => {
    setStyleNone('new-operation');
    setStyleFlex('balance-section');
});

//      SAVE NEW OPERATION

document.getElementById("add-new-operation").addEventListener("click", () => {
    let operationDescription = document.getElementById(`description-operation`);
    let operationAmountInput = document.getElementById("operation-amount");
    let operationCategory = document.getElementById(`category-operation`);
    let typeOperation = document.getElementById(`type-operation`);
    let operationDate = document.getElementById(`date-operation`);
  
    let operationDescriptionValue = operationDescription.value.trim();
    let operationAmount = operationAmountInput.value.trim();
    let operationCategoryValue = operationCategory.value;
    let typeOperationValue = typeOperation.value;
    let operationDateValue = operationDate.value.replace(/-/g, '/');
  
    if (operationDescriptionValue === "") {
      error(
        operationDescription,
        "Proporciona una descripción para tu nueva operación por favor."
      );
    } else if (isNaN(operationAmount) || operationAmount === "") {
      error(
        operationAmountInput,
        "Proporciona un valor numérico por favor."
      );
    } else if (operationDateValue === 'mm/dd/yyyy' || operationDateValue === '') {
      error(
        operationDate,
        'Proporciona la fecha en que realizaste esta operación por favor.'
      );
    } else {
      const operationExists = operations.some(
        (operation) => operation.description === operationDescriptionValue
      );
      if (operationExists) {
        error(
          operationDescription,
          "Esta operación ya existe."
        );
      } else {
        const operationDescriptionCapitalized = capitalizeFirstLetter(operationDescriptionValue);
        createOperation(
          operationDescriptionCapitalized,
          operationAmount,
          typeOperationValue,
          operationCategoryValue,
          operationDateValue,
        );
        operationDescription.value = '';
        operationAmountInput.value = '';
        operationDate.value = '';
        hideError(operationDescription);
        hideError(operationDate);
        hideError(operationAmountInput)
        setStyleNone('new-operation');
        setStyleFlex('balance-section')
      }
    }
});

document.getElementById(`description-operation`).addEventListener("input", () => {
  const newOperationInput = document.getElementById("description-operation");
  const newOperation = newOperationInput.value;
  if (newOperation !== "") {
    hideError(newOperationInput);
  }
});

document.getElementById(`operation-amount`).addEventListener("input", () => {
    const valueNewOperationInput = document.getElementById('operation-amount');
    const newOperation =  valueNewOperationInput.value;
    if (!isNaN(newOperation) && newOperation !== "") {
      hideError(valueNewOperationInput);
    }
});

//      CANCEL EDIT OPERATION

document.getElementById('close-edit-operation').addEventListener('click', () => {
    setStyleNone('edit-operation');
    setStyleFlex('balance-section');
});

//      SAVE EDIT OPERATION

document.querySelector('.save-edit-operation').addEventListener('click', () => {
     let editOperationId = document.querySelector('.save-edit-operation');
     let newOperationDescription = document.getElementById("edit-description-operation");
     let newOperationAmount = document.getElementById("edit-operation-amount");
     let newOperationType = document.getElementById("edit-type-operation");
     let newOperationCategory= document.getElementById("edit-category-operation");
     let newOperationDate = document.getElementById("edit-date-operation");
    if (newOperationDescription === '') {
      newOperationDescription.classList.add('outline', 'outline-red-600', 'outline-2');
      error(newOperationDescription, 'Proporciona un nuevo nombre para tu operación por favor.');
      return; 
    } else if (isNaN(newOperationAmount) || newOperationAmount === ``) {
      error( newOperationAmount, `Proporciona un valor númerico por favor.`);
    }else if (newOperationDate === 'mm/dd/yyyy' || newOperationDate === ``){
      error(newOperationDate, 'Proporciona la fecha en que realizaste esta operación por favor.' );
    } else{
      const operationExists = operations.some((operation) => operation.description === newOperationDescription);
        if (operationExists) {
          error(
          newOperationDescription,
          "Esta operación ya existe."
        );
        } else {
          const newOperationDescriptionCapitalized = capitalizeFirstLetter(newOperationDescription.value);
          newOperationDescription.value = '';
          newOperationAmount.value = '';
          newOperationDate.value = '';
          hideError(newOperationDescription);
          hideError(newOperationDate);
          hideError(newOperationAmount);
          setStyleNone('new-operation');
          setStyleFlex('balance-section');
          confirmEditOperation(operations, editOperationId.id.slice(8),newOperationDescriptionCapitalized, newOperationAmount.value, newOperationType.value, newOperationCategory.value, newOperationDate.value.replace(/-/g, '/'));
        }
    }
});



//    CANCEL DELETE OPERATION

document.getElementById('cancel-delete-operation').addEventListener('click', () => {
  setStyleNone('delete-operation');
  setStyleFlex('balance-section');
});

//      CLOSE CATEGORIES WINDOW

document.getElementById('close-categories-btn').addEventListener('click', () => {
    setStyleNone('categories')
    setStyleFlex('balance-section');
});

//      ADD NEW CATEGORY

document.getElementById('add-category-btn').addEventListener('click', () => {
  const newCategoryInput = document.getElementById('add-category');
  const newCategory = newCategoryInput.value;
  if (newCategory === "") {
      newCategoryInput.classList.add('outline', 'outline-red-600', 'outline-2');
      error(newCategoryInput, 'Proporciona un nombre para tu nueva categoría por favor.');
      document.getElementById('add-category-btn-col').classList.remove('tablet:items-end')
      document.getElementById('add-category-btn-col').classList.add('items-center')
  } else {
      const categoryExists = categories.some(category => category.name === newCategory);
      if (categoryExists) {
          newCategoryInput.classList.add('outline', 'outline-red-600', 'outline-2');
          error(newCategoryInput, 'Esta categoría ya existe.');
          document.getElementById('add-category-btn-col').classList.remove('tablet:items-end')
          document.getElementById('add-category-btn-col').classList.add('items-center')
      } else {
        const newCategoryCapitalized = capitalizeFirstLetter(newCategory);
          createCategory(newCategoryCapitalized);
          newCategoryInput.value = "";
      }
    }
});

document.getElementById('add-category').addEventListener('input', () => {
  const newCategoryInput = document.getElementById('add-category');
  const newCategory = newCategoryInput.value;
  if (newCategory !== "") {
      newCategoryInput.classList.remove('outline', 'outline-red-600', 'outline-2');
      hideError(newCategoryInput);
      document.getElementById('add-category-btn-col').classList.remove('items-center')
      document.getElementById('add-category-btn-col').classList.add('tablet:items-end')
  }
});

//      RENAME CATEGORY 

document.querySelector('.save-edit-category').addEventListener('click', () => {
  let editCategoryId = document.querySelector('.save-edit-category');
  const newCategoryName = document.getElementById("edit-category-name").value.trim();
  if (newCategoryName === '') {
      document.getElementById("edit-category-name").classList.add('outline', 'outline-red-600', 'outline-2');
      error(document.getElementById("edit-category-name"), 'Proporciona un nuevo nombre para tu categoría por favor.');
      return; 
  }
  const categoryExists = categories.some(object => object.name === newCategoryName);
  if (categoryExists) {
      error(document.getElementById("edit-category-name"), 'Esta categoría ya existe.');
      return;
  } else {
    renameCategory(categories, editCategoryId.id.slice(8), newCategoryName);
    setStyleFlex('categories');
    setStyleNone('rename-category');
  }
});

//      CANCEL EDIT CATEGORY

document.getElementById('cancel-edit-category').addEventListener('click', () => {
    setStyleNone('rename-category');
    setStyleFlex('categories');
});

//      CANCEL DELETE CATEGORY

document.getElementById('cancel-delete-category').addEventListener('click', () => {
    setStyleNone('delete-category');
    setStyleFlex('categories');
});

//      CONFIRM DELETE CATEGORY

document.querySelector('.confirm-delete-category').addEventListener('click', () => {
  let categoryId = document.querySelector('.confirm-delete-category');
  confirmDeleteCategory(getCategories(), categoryId.id.slice(8));
    setStyleNone('delete-category');
    setStyleFlex('categories');
});

//      CLOSE REPORTS WINDOW

document.getElementById('close-reports-btn').addEventListener('click', () => {
    setStyleNone('reports');
    setStyleFlex('balance-section');
});

//      GO TO NEW OPERATION FROM REPORTS

document.getElementById('to-new-operation-btn').addEventListener('click', () => {
    setStyleNone('reports');
    setStyleFlex('new-operation');
});

//      OPEN NAV MENU IN MOBILE

document.getElementById('nav-btn').addEventListener('click', (toggleMobileNav));


