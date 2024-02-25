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

//      OPEN BALANCE WINDOW

document.getElementById('balance-window-btn').addEventListener('click', () => {
    setStyleFlex('balance-section');
    setStyleNone('categories');
    setStyleNone('reports');
    setStyleNone('new-operation');
    setStyleNone('rename-category');
    setStyleNone('delete-category');
});

//      OPEN CATEGORIES WINDOW

document.getElementById('categories-window-btn').addEventListener('click', () => {
    setStyleFlex('categories');
    setStyleNone('balance-section');
    setStyleNone('reports');
    setStyleNone('new-operation');
    setStyleNone('rename-category');
    setStyleNone('delete-category');
});

//      OPEN REPORTS WINDOW

document.getElementById('reports-window-btn').addEventListener('click', () => {
    setStyleFlex('reports');
    setStyleNone('balance-section');
    setStyleNone('categories');
    setStyleNone('new-operation');
    setStyleNone('rename-category');
    setStyleNone('delete-category');
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
  let operationDescription = document.getElementById(
    `description-operation`
  ).value;
  let operationAmount = document.getElementById("operation-amount").value;
  let operationCategory = document.getElementById(`category-operation`).value;
  let typeOperation = document.getElementById(`type-operation`).value;
  let operationDate = document.getElementById(`date-operation`).value;

  if (operationDescription === "") {
    error(
      operationDescription,
      "Proporciona una descripción para tu nueva operación por favor."
    );
  } else {
   
    const newOperationDescription = operationDescription.trim();

    const operationExists = operations.some(
      (operation) => operation.description === newOperationDescription
    );

    if (operationExists) {
      error("nameOperationDescription", "Esta operación ya existe.");
    } else {
      
      createOperation(
        newOperationDescription,
        operationAmount,
        operationCategory,
        typeOperation,
        operationDate
      );
    
    }
  }

  setStyleNone("new-operation");
  setStyleFlex("balance-section");
});




document.getElementById(`description-operation`).addEventListener("input", () => {
  const newOperationInput = document.getElementById("description-operation");
  const newOperation= newOperationInput.value;
  if (newOperation !== "") {
    hideError(newOperationInput);
  }
});

/*      ESTOS BOTONES TODAVIA NO EXISTEN

//      EDIT OPERATION

document.getElementById('edit-operation-btn').addEventListener('click', () => {
    setStyleFlex('edit-operation');
    setStyleNone('balance-section');
})

//      CANCEL EDIT OPERATION

document.getElementById('close-edit-operation').addEventListener('click', () => {
    setStyleNone('edit-operation');
    setStyleFlex('balance-section');
});

//      SAVE EDIT OPERATION

document.getElementById('close-edit-operation').addEventListener('click', () => {
    setStyleNone('edit-operation');
    setStyleFlex('balance-section');
});

*/

//      CLOSE CATEGORIES WINDOW

document.getElementById('close-categories-btn').addEventListener('click', () => {
    setStyleNone('categories')
    setStyleFlex('balance-section');
});

//      ADD NEW CATEGORY

document.getElementById('add-category-btn').addEventListener('click', () => {
    const newCategoryInput = document.getElementById('add-category');
    const newCategory = newCategoryInput.value.trim();
    if (newCategory === "") {
        newCategoryInput.classList.add('outline', 'outline-red-600', 'outline-2');
        error(newCategoryInput, 'Proporciona un nombre para tu nueva categoría por favor.');
        document.getElementById('add-category-btn-col').classList.remove('tablet:items-end')
        document.getElementById('add-category-btn-col').classList.add('items-center')
    } else {
        const categoryExists = categories.some(category => category.name === newCategory);
        if (categoryExists) {
            error(newCategoryInput, 'Esta categoría ya existe.');
            document.getElementById('add-category-btn-col').classList.remove('tablet:items-end')
            document.getElementById('add-category-btn-col').classList.add('items-center')
        } else {
            createCategory(newCategory);
            newCategoryInput.value = "";
        }
    }
});

document.getElementById('add-category').addEventListener('input', () => {
    const newCategoryInput = document.getElementById('add-category');
    const newCategory = newCategoryInput.value;
    if (newCategory !== "") {
        hideError(newCategoryInput);
        document.getElementById('add-category-btn-col').classList.remove('items-center')
        document.getElementById('add-category-btn-col').classList.add('tablet:items-end')
    }
});

//      EDIT CATEGORY

for (let btn of editCategoryBtns) {
    btn.addEventListener('click', (e) => {
        console.log(e.target.id)
        const seekId = categories.find(element => element.id === e.target.id);
        console.log(seekId);
        setStyleFlex('rename-category');
        setStyleNone('categories');
        document.getElementById('edit-category-name').value = seekId.name;
    }
)};

//      RENAME CATEGORY 

document.getElementById('save-edit-category').addEventListener('click', () => {
    let newCategoryName = document.getElementById('edit-category-name').value;
    editCategory({newCategoryName});
    setStyleFlex('categories');
    setStyleNone('rename-category');
});


//      CANCEL EDIT CATEGORY

document.getElementById('cancel-edit-category').addEventListener('click', () => {
    setStyleNone('rename-category');
    setStyleFlex('categories');
});


//      DELETE CATEGORY

for (let btn of deleteCategoryBtns) {
    btn.addEventListener('click', (e) => {
        console.log(e.target.id)
        const seekId = categories.find(element => element.id === e.target.id);
        console.log(seekId);
        setStyleFlex('delete-category');
        setStyleNone('categories');
        document.getElementById('category-name').innerHTML = seekId.name;
    });
};

//      CANCEL DELETE CATEGORY

document.getElementById('cancel-delete-category').addEventListener('click', () => {
    setStyleNone('delete-category');
    setStyleFlex('categories');
});

//      CONFIRM DELETE CATEGORY

document.getElementById('confirm-delete-category').addEventListener('click', () => {
    setStyleNone('delete-category');
    setStyleFlex('categories');
    //AÑADIR LA FUNCION DE GUARDAR LOS CAMBIOS
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

document.getElementById('nav-btn').addEventListener('click', () => {
    document.getElementById('nav-items').classList.toggle('hidden');
    if (document.getElementById('nav-items').classList.contains('hidden')) {
        document.getElementById('nav-btn').innerHTML = '<i class="fa-solid fa-bars"></i>';
    } else {
        document.getElementById('nav-btn').innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
})



