//      ACTIVATE DARK/LIGHT MODE

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
});

//      OPEN CATEGORIES WINDOW

document.getElementById('categories-window-btn').addEventListener('click', () => {
    setStyleFlex('categories');
    setStyleNone('balance-section');
    setStyleNone('reports');
    setStyleNone('new-operation');
});

//      OPEN REPORTS WINDOW

document.getElementById('reports-window-btn').addEventListener('click', () => {
    setStyleFlex('reports');
    setStyleNone('balance-section');
    setStyleNone('categories');
    setStyleNone('new-operation');
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

document.getElementById('add-new-operation').addEventListener('click', () => {
    setStyleNone('new-operation');
    setStyleFlex('balance-section');
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

/*  VAN A FUNCIONAR CUANDO ESTE HECHA LA TABLA

//      ADD NEW CATEGORY

document.getElementById('add-category-btn').addEventListener('click', () => {

})

//      DELET CATEGORY

document.getElementById('delete-operation-btn').addEventListener('click', () => {
    
})

//      EDIT CATEGORY

document.getElementById('edit-operation-btn').addEventListener('click', () => {
    
})
*/

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