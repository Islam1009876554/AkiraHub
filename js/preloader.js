document.addEventListener('DOMContentLoaded', () => {
    // Ждем загрузки всех ресурсов
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        
        // Добавляем класс для плавного исчезновения
        preloader.style.opacity = '0';
        
        // Удаляем прелоадер после анимации
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}); 