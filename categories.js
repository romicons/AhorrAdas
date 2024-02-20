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
  
 createCategoriesTable();

 //     EDIT CATEGORIES
/*
const editCategoryBtns = document.getElementsByClassName('edit-category-btn');

 const editCategory = (categoryId, newName) => {
    let findCategory = categories.findIndex(category => category.id === categoryId)
    if (findCategory !== -1) {
        let newName = getElementById('edit-category-name').value;
        categories[findCategory].name = newName;
        localStorage.setItem("categories", JSON.stringify(categories));
        createCategoriesTable();
        console.log(`Nombre de la categoría con ID ${categoryId} actualizado a ${newName}.`);
    }
    else {
        console.log("No fue posible renombrar la categoria")
    }
};
*/

//      CREATE CATEGORY

const createCategory = (name) => {
    console.log(categories)
    let newCategory = {id:uuidv4(), name: name};
    categories.push(newCategory);
    console.log('Estoy añadiendo algo al array')
    return categories;
}
console.log(categories);

//      DELETE CATEGORY

const deleteCategoryBtns = document.getElementsByClassName('delete-category-btn');

const deleteCategory = (categoryId, categories) => {
    return categories.filter((category) => category.id !== categoryId);
};

//      GET CATEGORY
/*
const getCategory = seekId(categoryId, categories);


/*
const eliminarCategoria = (idCategoria, categorias) => {
    return categorias.filter((categoria) => categoria.id !== idCategoria)
  }

  const obtenerCategoria = (idCategoria, categorias) => {
    return categorias.find((categoria) => categoria.id === idCategoria)
  }*/