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
  {
    id: uuidv4(),
    name: "Trabajo",
  }
];

// GENERATE TABLE OF CATEGORIES

const createCategoriesTable = (data) => {
  const tableOfCategories = document.getElementById("categories-table-body");
  tableOfCategories.innerHTML = "";
  data = validateLocalStorage("categories", categories);
  if (data && data.length > 0) {
    for (let category of data) {
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
    editCategoryEvent(document.getElementsByClassName("edit-category-btn"));
    deleteCategoryEvent(document.getElementsByClassName("delete-category-btn"));
  } else {
    setStyleFlex('no-categories')
  };
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

const createCategory = (newCategoryName) => {
  let savedCategories = getCategories(); 
  let newCategory = { id: uuidv4(), name: newCategoryName };
  savedCategories.push(newCategory); 
  updateCategories(savedCategories); 
  createCategoriesTable(savedCategories); 
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

//              EDIT CATEGORY

const editCategoryEvent = (editCategoryButtons) => {
  const savedCategories = getCategories();
  for (let btn of editCategoryButtons) {
    btn.addEventListener("click", (e) => {
      const category = seekId(savedCategories, e.target.id, 9);
      if (category) {
        document.getElementById("edit-category-name").value = category.name;
        document.querySelector('.save-edit-category').setAttribute("id", `confirm-${btn.id.slice(9)}`);
        setStyleFlex("rename-category");
        setStyleNone("categories");
      }
    });
  }
};

const renameCategory = (array, categoryId, newName) => {
  const savedCategories = getCategories();
  const editedCategories = savedCategories.map((object) => {
    if (object.id === categoryId) {
      return {
        ...object,
        name: newName
      };
    } else {
      return object; 
    }
  });
  updateCategories(editedCategories);
  createCategoriesTable(editedCategories);
};

//              DELETE CATEGORY

const deleteCategoryEvent = (deleteCategoryButtons) => {
  const savedCategories = getCategories();
  for (let btn of deleteCategoryButtons) {
    btn.addEventListener("click", (e) => {
      const category = seekId(savedCategories, e.target.id, 11);
      if (category) {
        document.getElementById("category-name").innerHTML = category.name;
        document.querySelector('.confirm-delete-category').setAttribute("id", `confirm-${btn.id.slice(11)}`);
        console.log(document.querySelector('.confirm-delete-category').id)
        setStyleFlex("delete-category");
        setStyleNone("categories");
      }
    });
  }
};

const confirmDeleteCategory = (array, categoryId) => {
  const filteredCategories = array.filter(object => object.id !== categoryId);
  updateCategories(filteredCategories);
  createCategoriesTable(filteredCategories);
}