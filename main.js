//    ACTIVATE DARK/LIGHT MODE

const darkModeToggle = document.querySelector('#btn-darkmode');

darkModeToggle.addEventListener('click', () => {
document.documentElement.classList.toggle('dark');
document.querySelector('#btn-darkmode').innerHTML = '<i class="fa-solid fa-sun"></i>';
});
