/**
 * quiz.js
 * 
 * Логика работы интерактивного квиза о Казахстане.
 * Функции:
 * - Инициализация и отображение вопросов
 * - Отслеживание ответов пользователя
 * - Подсчет результатов и отображение статистики
 * - Возможность поделиться результатами
 * - Слайдер с интересными фактами
 */
document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const startQuizBtn = document.getElementById('start-quiz');
    const beginQuizBtn = document.getElementById('begin-quiz');
    const quizIntro = document.getElementById('quiz-intro');
    const quizQuestionSection = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const questionContainer = document.getElementById('question-container');
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const progressFill = document.querySelector('.progress-fill');
    const scoreValue = document.getElementById('score-value');
    const scoreTotal = document.getElementById('score-total');
    const restartQuizBtn = document.getElementById('restart-quiz');
    const shareResultsBtn = document.getElementById('share-results');
    const resultsMessage = document.getElementById('result-message');
    
    // Переменные для отслеживания состояния квиза
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let quizStarted = false;
    
    // Инициализация квиза
    function initQuiz() {
        // Проверяем, что все элементы найдены
        if (!startQuizBtn || !beginQuizBtn || !quizIntro || !quizQuestionSection || 
            !quizResults || !questionContainer || !prevBtn || !nextBtn || 
            !currentQuestionSpan || !totalQuestionsSpan || !progressFill || 
            !scoreValue || !scoreTotal || !restartQuizBtn || !shareResultsBtn || !resultsMessage) {
            console.error('Не все элементы квиза найдены на странице');
            return;
        }
        
        // Проверяем, что данные квиза доступны
        if (!quizQuestions || quizQuestions.length === 0) {
            console.error('Данные квиза не найдены или пусты');
            return;
        }
        
        // Установка общего количества вопросов
        totalQuestionsSpan.textContent = quizQuestions.length;
        scoreTotal.textContent = quizQuestions.length;
        
        // Инициализация массива ответов пользователя
        userAnswers = Array(quizQuestions.length).fill(null);
        
        // Обработчики событий для кнопок
        startQuizBtn.addEventListener('click', showIntro);
        beginQuizBtn.addEventListener('click', startQuiz);
        prevBtn.addEventListener('click', showPreviousQuestion);
        nextBtn.addEventListener('click', handleNextButton);
        restartQuizBtn.addEventListener('click', restartQuiz);
        shareResultsBtn.addEventListener('click', shareResults);
        
        // Инициализация слайдера с фактами
        initFactsSlider();
    }
    
    // Показать вступление к квизу
    function showIntro() {
        quizIntro.classList.add('active');
        quizQuestionSection.classList.remove('active');
        quizResults.classList.remove('active');
        document.querySelector('.quiz-container').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Начать квиз
    function startQuiz() {
        quizStarted = true;
        quizIntro.classList.remove('active');
        quizQuestionSection.classList.add('active');
        quizResults.classList.remove('active');
        showQuestion(0);
    }
    
    // Показать вопрос по индексу
    function showQuestion(index) {
        currentQuestionIndex = index;
        currentQuestionSpan.textContent = index + 1;
        
        // Обновление прогресс-бара
        const progressPercentage = ((index + 1) / quizQuestions.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Получение текущего вопроса
        const question = quizQuestions[index];
        
        // Создание HTML для вопроса
        const questionHTML = `
            <div class="question">
                <h3>${question.question}</h3>
                ${question.image ? `<div class="question-image"><img src="${question.image}" alt="Изображение вопроса"></div>` : ''}
                <div class="options">
                    ${question.options.map((option, i) => `
                        <div class="option ${userAnswers[index] === i ? 'selected' : ''}" data-index="${i}">
                            <div class="option-marker">${String.fromCharCode(65 + i)}</div>
                            <div class="option-text">${option}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Вставка HTML вопроса
        questionContainer.innerHTML = questionHTML;
        
        // Добавление обработчиков для вариантов ответа
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', selectOption);
        });
        
        // Обновление состояния кнопок навигации
        updateNavigationButtons();
    }
    
    // Выбор варианта ответа
    function selectOption(event) {
        const selectedOption = event.currentTarget;
        const optionIndex = parseInt(selectedOption.dataset.index);
        
        // Удаление класса selected у всех опций
        const options = document.querySelectorAll('.option');
        options.forEach(option => option.classList.remove('selected'));
        
        // Добавление класса selected выбранной опции
        selectedOption.classList.add('selected');
        
        // Сохранение ответа пользователя
        userAnswers[currentQuestionIndex] = optionIndex;
        
        // Обновление состояния кнопок навигации
        updateNavigationButtons();
    }
    
    // Обновление состояния кнопок навигации
    function updateNavigationButtons() {
        // Кнопка "Назад" активна только если не первый вопрос
        prevBtn.disabled = currentQuestionIndex === 0;
        
        // Изменение текста кнопки "Далее" на "Завершить" для последнего вопроса
        if (currentQuestionIndex === quizQuestions.length - 1) {
            nextBtn.innerHTML = 'Завершить <i class="fas fa-check"></i>';
        } else {
            nextBtn.innerHTML = 'Далее <i class="fas fa-arrow-right"></i>';
        }
        
        // Активация кнопки "Далее" только если выбран ответ
        nextBtn.disabled = userAnswers[currentQuestionIndex] === null;
    }
    
    // Показать предыдущий вопрос
    function showPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            showQuestion(currentQuestionIndex - 1);
        }
    }
    
    // Обработка нажатия кнопки "Далее"/"Завершить"
    function handleNextButton() {
        // Если пользователь не выбрал ответ, показываем предупреждение
        if (userAnswers[currentQuestionIndex] === null) {
            alert('Пожалуйста, выберите вариант ответа');
            return;
        }
        
        // Если это последний вопрос, завершаем квиз
        if (currentQuestionIndex === quizQuestions.length - 1) {
            finishQuiz();
        } else {
            // Иначе показываем следующий вопрос
            showQuestion(currentQuestionIndex + 1);
        }
    }
    
    // Завершение квиза и показ результатов
    function finishQuiz() {
        quizQuestionSection.classList.remove('active');
        quizResults.classList.add('active');
        
        // Подсчет правильных ответов
        const correctAnswers = userAnswers.filter((answer, index) => 
            answer === quizQuestions[index].correctAnswer
        ).length;
        
        // Отображение результата
        scoreValue.textContent = correctAnswers;
        
        // Определение сообщения в зависимости от результата
        let message = '';
        const percentage = (correctAnswers / quizQuestions.length) * 100;
        
        if (percentage >= 90) {
            message = 'Отлично! Вы настоящий эксперт по Казахстану!';
        } else if (percentage >= 70) {
            message = 'Хороший результат! Вы хорошо знаете Казахстан.';
        } else if (percentage >= 50) {
            message = 'Неплохо! Вы знаете основные факты о Казахстане.';
        } else {
            message = 'Есть куда расти! Предлагаем вам изучить больше информации о Казахстане.';
        }
        
        resultsMessage.textContent = message;
        
        // Прокрутка к результатам
        quizResults.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Перезапуск квиза
    function restartQuiz() {
        userAnswers = Array(quizQuestions.length).fill(null);
        quizResults.classList.remove('active');
        quizIntro.classList.add('active');
        currentQuestionIndex = 0;
        
        // Прокрутка к началу квиза
        quizIntro.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Поделиться результатами
    function shareResults() {
        const correctAnswers = userAnswers.filter((answer, index) => 
            answer === quizQuestions[index].correctAnswer
        ).length;
        
        const text = `Я прошел квиз о 7 чудесах Казахстана и набрал ${correctAnswers} из ${quizQuestions.length} баллов! Проверь свои знания на сайте 7wonders.kz`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Мой результат в квизе о Казахстане',
                text: text,
                url: window.location.href
            })
            .catch(error => console.log('Ошибка при попытке поделиться:', error));
        } else {
            // Запасной вариант - копирование в буфер обмена
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Текст скопирован в буфер обмена!');
        }
    }
    
    // Инициализация слайдера с фактами
    function initFactsSlider() {
        const track = document.querySelector('.facts-track');
        const cards = document.querySelectorAll('.fact-card');
        const dotsContainer = document.querySelector('.slider-dots');
        const prevArrow = document.querySelector('.slider-arrow.prev');
        const nextArrow = document.querySelector('.slider-arrow.next');
        
        if (!track || !cards.length || !dotsContainer || !prevArrow || !nextArrow) {
            console.error('Не все элементы слайдера найдены');
            return;
        }
        
        let currentIndex = 0;
        let cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
        
        // Создание точек навигации
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        
        // Обработчики для стрелок
        prevArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        });
        
        nextArrow.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                goToSlide(currentIndex + 1);
            }
        });
        
        // Функция перехода к слайду
        function goToSlide(index) {
            track.style.transform = `translateX(-${index * cardWidth}px)`;
            document.querySelectorAll('.slider-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentIndex = index;
            
            // Обновление состояния стрелок
            prevArrow.classList.toggle('disabled', index === 0);
            nextArrow.classList.toggle('disabled', index === cards.length - 1);
        }
        
        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
            goToSlide(currentIndex);
        });
        
        // Инициализация состояния стрелок
        prevArrow.classList.add('disabled');
        if (cards.length <= 1) {
            nextArrow.classList.add('disabled');
        }
    }
    
    // Запуск инициализации квиза
    initQuiz();
}); 