const toggleDarkModeButton = document.getElementById('btn-darkmode');

toggleDarkModeButton.addEventListener('click', () => {
    const isDarkModeEnabled = document.documentElement.classList.contains('dark');
  
    if (isDarkModeEnabled) {
        document.documentElement.classList.remove('dark');
        localStorage.removeItem('theme');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
});