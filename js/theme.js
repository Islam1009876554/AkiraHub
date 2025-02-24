const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Функция для переключения темы
function toggleTheme() {
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Проверка сохраненной темы
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
}

// Добавляем обработчик события
themeToggle.addEventListener('click', toggleTheme); 