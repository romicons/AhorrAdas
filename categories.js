//      CREATE DEFAULT CATEGORIES 

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

let savedCategories;

const validateLocalStorage = () => {
    if (localStorage.getItem("categories") !== null) {
      savedCategories = JSON.parse(localStorage.getItem("categories"));
      return savedCategories;
    } else {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
    createCategoriesTable();
};

const createCategoriesTable = () => {
    const tableOfCategories = document.getElementById("categories-table");
    tableOfCategories.innerHTML = "";
    if (validateLocalStorage()) {
      for (let category of validateLocalStorage()) {
        tableOfCategories.innerHTML += `
            <tr class="flex columns-2 justify-between items-center py-1">
                <td class="text-center w-2/5 bg-primary dark:bg-secondary px-2 py-1 rounded text-light font-bold">${category.name}</td>
                <td class="flex gap-2 tablet:gap-5 w-2/5 justify-end">
                        <button
                        class="delete-category-btn flex items-center rounded py-1 px-4 h-8 justify-center bg-dark hover:bg-primary shadow-inner font-bold dark:text-light dark:hover:text-light gap-2"
                        >
                            <i class="fa-solid fa-trash"></i>
                                Eliminar
                        </button>
                        <button
                        class="edit-category-btn flex items-center rounded py-1 px-4 h-8 justify-center hover:bg-accent bg-secondary shadow-inner font-bold dark:text-light dark:hover:text-light gap-2" 
                        >
                            <i class="fa-solid fa-pen"></i>
                                Editar
                        </button>
                </td>
            </tr>
          `;
      }
    }
};

const getCategories = () => {
    return JSON.parse(localStorage.getItem('categories'))
}

const updateCategories = () => {
    localStorage.setItem('categories', JSON.stringify(categories));
};


//      CREATE CATEGORY

const createCategory = (name) => {
    let newCategory = {id:uuidv4(), name: name};
    categories.push(newCategory);
    updateCategories();
    createCategoriesTable();
};

 //     EDIT CATEGORIES
/*
const editCategoryBtns = document.getElementsByClassName('edit-category-btn');
/*
const editCategory = (id, name) => {
    let findCategory = seekId(id, categories);
    if (findCategory !== undefined) {
        console.log('Entré en el if');
        // Aquí asignamos el nombre a la categoría encontrada
        findCategory.name = name;
        // Aquí actualizamos el valor del campo de entrada 'edit-category-name'
        document.getElementById('edit-category-name').value = name;
        console.log('Nombre de la categoría con ID ${id} actualizado a ${name}.');
    } else {
        console.log("No fue posible renombrar la categoría");
    }
};
*//*
const editCategory = (categoryId, newCategory) => {
    return categories.map((category) => {
      if (category.id === categoryId) {
        return [...category, ...newCategory];
      } else {
        return category;
      }
    });
  };
  */

//      DELETE CATEGORY
/*
const deleteCategoryBtns = document.getElementsByClassName('delete-category-btn');
/*
const deleteCategory = (categoryId, categories) => {
    return deleteId(categories, categoryId);
};*/