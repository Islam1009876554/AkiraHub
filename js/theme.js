document.addEventListener('DOMContentLoaded', function() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.body;
    
    // Проверяем, сохранена ли тема в localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        updateAllThemeIcons(true);
    } else {
        updateAllThemeIcons(false);
    }
    
    // Функция для переключения темы
    function toggleTheme() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            updateAllThemeIcons(false);
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateAllThemeIcons(true);
        }
    }
    
    // Функция для обновления всех иконок
    function updateAllThemeIcons(isDark) {
        const sunIcons = document.querySelectorAll('.sun-icon');
        const moonIcons = document.querySelectorAll('.moon-icon');
        
        sunIcons.forEach(icon => {
            icon.style.display = isDark ? 'none' : 'inline-block';
        });
        
        moonIcons.forEach(icon => {
            icon.style.display = isDark ? 'inline-block' : 'none';
        });
    }
    
    // Добавляем обработчик события ко всем кнопкам
    if (themeToggles.length > 0) {
        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', toggleTheme);
        });
    } else {
        console.error('Элементы с классом "theme-toggle" не найдены');
    }
}); 