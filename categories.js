//      DEFAULT CATEGORIES

const categories = [
  {
    id: uuidv4(),
    name: "Comida",
  },
  {
    id: uuidv4(),
    name: "Servicios",
  },
  {
    id: uuidv4(),
    name: "Salidas",
  },
  {
    id: uuidv4(),
    name: "Educación",
  },
  {
    id: uuidv4(),
    name: "Transporte",
  },
];

// GENERATE TABLE OF CATEGORIES

const createCategoriesTable = () => {
  const tableOfCategories = document.getElementById("categories-table-body");
  tableOfCategories.innerHTML = "";
  const savedCategories = validateLocalStorage("categories", categories);
  if (savedCategories && savedCategories.length > 0) {
    for (let category of savedCategories) {
      tableOfCategories.innerHTML += `
                <tr class="flex columns-2 justify-between items-center py-1">
                    <td class="text-center w-2/5 bg-primary dark:bg-secondary px-2 py-1 rounded text-light font-bold">${category.name}</td>
                    <td class="flex gap-2 tablet:gap-5 w-2/5 justify-end">
                        <button
                            class="delete-category-btn flex items-center rounded py-1 px-2 h-8 justify-center bg-dark hover:bg-primary shadow-inner font-bold dark:text-light dark:hover:text-light gap-2"
                            id="btn-delete-${category.id}"
                        >
                            <i class="fa-solid fa-trash pointer-events-none"></i>
                            Eliminar
                        </button>
                        <button
                            class="edit-category-btn flex items-center rounded py-1 px-3 h-8 justify-center hover:bg-accent bg-secondary shadow-inner font-bold dark:text-light dark:hover:text-light gap-2"
                            id="btn-edit-${category.id}" 
                        >
                            <i class="fa-solid fa-pen pointer-events-none"></i>
                            Editar
                        </button>
                    </td>
                </tr>
            `;
    }
    linkCategoriesWithSelect();
    editCategoryEvent();
    deleteCategoryEvent();
  } else {
    // Si no hay categorías guardadas, mostrar un mensaje o realizar alguna acción
    //DESPUES LO ESTILIZAMOS BIEN
    tableOfCategories.innerHTML = "<p>No hay categorías disponibles.</p>";
  }
};

//      RETURN CATEGORIES FROM LOCAL STORAGE

const getCategories = () => {
  return JSON.parse(localStorage.getItem("categories"));
};

//      UPDATE CATEGORIES

const updateCategories = (categories) => {
  localStorage.setItem("categories", JSON.stringify(categories));
};

//      CREATE CATEGORY

const createCategory = (name) => {
  let savedCategories = getCategories();
  let newCategory = { id: uuidv4(), name: name };
  savedCategories.push(newCategory);
  updateCategories(savedCategories);
  createCategoriesTable();
};

//     CONECT CATEGORIES WITH THE SELECTS OF CATEGORIES

const linkCategoriesWithSelect = () => {
  const categoriesSelect = document.getElementsByClassName('category-select');
  const savedCategories = validateLocalStorage("categories", categories);
  for (let select of categoriesSelect) {
    if (select.classList.contains('filter')) {
      select.innerHTML = '';
      select.innerHTML += `<option value="Todas">Todas</option>`;
    } else {
      select.innerHTML = '';
    }
    for (let category of savedCategories) {
      select.innerHTML += `<option value="${category.name}">${category.name}</option>`;
    }
  }
};

//      EDIT CATEGORY

const editCategoryEvent = () => {
  const editCategoryBtns = document.getElementsByClassName("edit-category-btn");
  const savedCategories = validateLocalStorage("categories", categories);
  for (let btn of editCategoryBtns) {
    btn.addEventListener("click", (e) => {
      const category = seekId(savedCategories, e.target.id, 9);
      if (category) {
        document.getElementById("edit-category-name").value = category.name;
        setStyleFlex("rename-category");
        setStyleNone("categories");
      }
    });
  }
};

//      RENAME CATEGORY
/*
const renameCategory = () => {
    const categoryNameInput = document.getElementById('edit-category-name');
    const category = seekId(savedCategories, target.id);
    const newCategoryName = categoryNameInput.value.trim();
    if (newCategoryName === '') {
        categoryNameInput.classList.add('outline', 'outline-red-600', 'outline-2');
        error(categoryNameInput, 'Proporciona un nuevo nombre para tu categoría por favor.');
    } else {
        const categoryExists = categories.some(category => category.name === newCategoryName);
        if (categoryExists) {
            error(categoryNameInput, 'Esta categoría ya existe.');
        } else {   
            category.name = newCategoryName;
        }
    }
};*/

const renameCategory = () => {
    const categoryNameInput = document.getElementById('edit-category-name');
    const newCategoryName = categoryNameInput.value.trim();
    const category = seekId(savedCategories, target.id);
    category.name = newCategoryName;
}

//      DELETE CATEGORY

const deleteCategoryEvent = () => {
  const deleteCategoryBtns = document.getElementsByClassName(
    "delete-category-btn"
  );
  const savedCategories = validateLocalStorage("categories", categories);
  for (let btn of deleteCategoryBtns) {
    btn.addEventListener("click", (e) => {
      const category = seekId(savedCategories, e.target.id, 11);
      if (category) {
        document.getElementById("category-name").innerHTML = category.name;
        setStyleFlex("delete-category");
        setStyleNone("categories");
      }
    });
  }
};
