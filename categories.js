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
  validateLocalStorage("categories", data);
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

const createCategory = (newCategoryName) => {
  let savedCategories = getCategories(); // Obtener las categorías actuales del almacenamiento local
  let newCategory = { id: uuidv4(), name: newCategoryName };
  savedCategories.push(newCategory); // Agregar la nueva categoría a la lista de categorías
  updateCategories(savedCategories); // Actualizar el almacenamiento local con la lista actualizada de categorías
  createCategoriesTable(savedCategories); // Crear la tabla de categorías con las categorías actualizadas
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

const editCategoryEvent = (editCategoryButtons) => {
  const savedCategories = getCategories(); // Obtener las categorías actuales del almacenamiento local
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


//      RENAME CATEGORY

const renameCategory = (array, categoryId, newName) => {
  const savedCategories = getCategories();
  const editedCategories = savedCategories.map((object) => {
    if (object.id === categoryId) {
      return {
        ...object,
        name: newName,
        cambiado: true,
      };
    } else {
      return object; 
    }
  });
  updateCategories(editedCategories);
  createCategoriesTable(editedCategories);
};

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
