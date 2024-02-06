/*    DARK/LIGHT MODE   */

const darkModeToggle = document.querySelector('#btn-darkmode');

darkModeToggle.addEventListener('click', () => {
document.documentElement.classList.toggle('dark');
});
