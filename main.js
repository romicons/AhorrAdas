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

//      CLOSE NEW OPERATION WINDOW

document.getElementById('close-new-operation').addEventListener('click', () => {
    setStyleNone('new-operation')});

//      CLOSE EDIT OPERATION WINDOW

document.getElementById('close-edit-operation').addEventListener('click', () => {
    setStyleNone('edit-operation')});

//      CLOSE CATEGORIES WINDOW

document.getElementById('close-categories-btn').addEventListener('click', () => {
    setStyleNone('categories')});

//      CLOSE REPORTS WINDOW

document.getElementById('close-reports-btn').addEventListener('click', () => {
    setStyleNone('reports')});