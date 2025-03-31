/**
 * wonders-map.js
 * 
 * Расширенная интерактивная карта чудес Казахстана.
 * Функции:
 * - Инициализация карты Leaflet с маркерами чудес
 * - Информационная панель с деталями о выбранном чуде
 * - Возможность закрепления панели с информацией
 * - Адаптивное отображение для разных устройств
 * - Стилизация попапов и кнопок на карте
 */

document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, существует ли элемент карты на странице
    const mapElement = document.getElementById('wonders-map');
    if (mapElement) {
        initWondersMap();
    }
});

function initWondersMap() {
    const map = L.map('wonders-map').setView([48.0196, 66.9237], 5);
    
    // Улучшенный стиль карты для светлой темы
    const lightThemeMap = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    // Улучшенный стиль карты для темной темы
    const darkThemeMap = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    
    // Выбираем стиль карты в зависимости от темы
    const currentTheme = document.body.classList.contains('dark-theme') ? darkThemeMap : lightThemeMap;
    
    // Добавляем красивый стиль карты
    const tileLayer = L.tileLayer(currentTheme, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Создаем боковую панель для информации
    const infoPanel = L.control({position: 'topright'});
    
    infoPanel.onAdd = function(map) {
        this._div = L.DomUtil.create('div', 'wonder-info-panel');
        this._div.innerHTML = `
            <div class="panel-content">
                <div class="panel-header">
                    <h3>Выберите чудо на карте</h3>
                    <button class="panel-pin-button" title="Закрепить панель">
                        <i class="fas fa-thumbtack"></i>
                    </button>
                </div>
                <p>Наведите курсор на маркер или нажмите на него, чтобы увидеть подробную информацию.</p>
            </div>`;
        return this._div;
    };
    
    infoPanel.addTo(map);
    
    // Переменная для отслеживания закрепленного состояния
    let isPanelPinned = false;
    let currentWonder = null;
    
    // Функция для обновления панели
    function updateInfoPanel(wonder, pinned = false) {
        const panel = document.querySelector('.wonder-info-panel');
        const pinButton = panel.querySelector('.panel-pin-button');
        
        // Если панель закреплена и не выбрано новое чудо, не обновляем
        if (isPanelPinned && !pinned && wonder !== currentWonder) {
            return;
        }
        
        currentWonder = wonder;
        
        if (wonder) {
            panel.innerHTML = `
                <div class="panel-content">
                    <div class="panel-header">
                        <h3>${wonder.name}</h3>
                        <button class="panel-pin-button ${isPanelPinned ? 'pinned' : ''}" title="${isPanelPinned ? 'Открепить панель' : 'Закрепить панель'}">
                            <i class="fas fa-thumbtack"></i>
                        </button>
                    </div>
                    <div class="panel-image">
                        <img src="${wonder.image}" alt="${wonder.name}">
                    </div>
                    <div class="panel-info">
                        <div class="panel-type">
                            <i class="${wonder.type === 'Природное чудо' ? 'fas fa-mountain' : 'fas fa-landmark'}"></i>
                            <span>${wonder.type}</span>
                        </div>
                        <p>${wonder.description}</p>
                        <a href="https://ru.wikipedia.org/wiki/${encodeURIComponent(wonder.name.replace(/ /g, '_'))}" class="panel-btn" target="_blank">
                            <i class="fas fa-info-circle"></i> Подробнее
                        </a>
                    </div>
                </div>
            `;
            panel.classList.add('active');
            
            // Если панель закреплена, добавляем соответствующий класс
            if (isPanelPinned) {
                panel.classList.add('pinned');
            } else {
                panel.classList.remove('pinned');
            }
            
            // Добавляем обработчик для кнопки закрепления
            const newPinButton = panel.querySelector('.panel-pin-button');
            newPinButton.addEventListener('click', function() {
                isPanelPinned = !isPanelPinned;
                this.classList.toggle('pinned');
                panel.classList.toggle('pinned');
                this.title = isPanelPinned ? 'Открепить панель' : 'Закрепить панель';
            });
        } else if (!isPanelPinned) {
            panel.innerHTML = `
                <div class="panel-content">
                    <div class="panel-header">
                        <h3>Выберите чудо на карте</h3>
                        <button class="panel-pin-button" title="Закрепить панель">
                            <i class="fas fa-thumbtack"></i>
                        </button>
                    </div>
                    <p>Наведите курсор на маркер или нажмите на него, чтобы увидеть подробную информацию.</p>
                </div>`;
            panel.classList.remove('active');
            panel.classList.remove('pinned');
            
            // Добавляем обработчик для кнопки закрепления
            const newPinButton = panel.querySelector('.panel-pin-button');
            newPinButton.addEventListener('click', function() {
                isPanelPinned = !isPanelPinned;
                this.classList.toggle('pinned');
                panel.classList.toggle('pinned');
                this.title = isPanelPinned ? 'Открепить панель' : 'Закрепить панель';
            });
        }
    }

    // Добавление маркеров для чудес с расширенной информацией
    const wonders = [
        {
            name: "Чарынский каньон",
            coordinates: [43.35, 79.08],
            description: "Живописный каньон, напоминающий американский Гранд-Каньон. Образовался под воздействием воды и ветра более 12 миллионов лет назад.",
            image: "images/index/Без названия.jpeg",
            type: "Природное чудо"
        },
        {
            name: "Поющий бархан",
            coordinates: [43.9167, 77.3667],
            description: "Уникальный природный феномен, создающий звуки при движении песка. Высота бархана достигает 150 метров, а длина около 3 километров.",
            image: "images/index/pustynia_pesok_barhany_170012_1280x720.jpg",
            type: "Природное чудо"
        },
        {
            name: "Озеро Каинды",
            coordinates: [43.0733, 78.2833],
            description: "Уникальное озеро с подводными деревьями, образовавшимися после землетрясения в 1911 году. Глубина озера достигает 30 метров.",
            image: "images/index/q39j2z69sbqvlolkbk4aduhs0v0h1o4e.jpeg",
            type: "Природное чудо"
        },
        {
            name: "Петроглифы Тамгалы",
            coordinates: [43.8000, 75.5333],
            description: "Древние наскальные рисунки, отражающие культуру и быт древних людей. Включены в список Всемирного наследия ЮНЕСКО в 2004 году.",
            image: "images/index/4.jpg",
            type: "Историческое наследие"
        },
        {
            name: "Мавзолей Ходжи Ахмеда Ясави",
            coordinates: [43.3000, 68.2667],
            description: "Выдающийся памятник средневековой архитектуры, построенный по приказу Тамерлана в конце XIV века. Объект Всемирного наследия ЮНЕСКО.",
            image: "images/index/1280px-Ханака_Ахмеда_Ясави_2010_019.jpg",
            type: "Историческое наследие"
        },
        {
            name: "Национальный парк Алтын-Эмель",
            coordinates: [43.7000, 78.3667],
            description: "Уникальный природный парк с разнообразной флорой и фауной. Здесь обитают редкие виды животных, включая куланов и джейранов.",
            image: "images/index/natsionalnyy-park-altyn-emel_37.jpg",
            type: "Природное чудо"
        },
        {
            name: "Баянаульский национальный парк",
            coordinates: [50.8167, 75.7000],
            description: "Красивый парк с живописными озерами и горами. Известен своими уникальными скальными формациями и чистейшими озерами.",
            image: "images/index/a2abe65e4a8c6014f56ea0bda0cf71ae.jpg",
            type: "Природное чудо"
        }
    ];

    // Создаем красивые иконки для маркеров
    const natureIcon = L.divIcon({
        className: 'custom-marker nature-marker',
        html: '<div class="marker-icon"><i class="fas fa-mountain"></i></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const cultureIcon = L.divIcon({
        className: 'custom-marker culture-marker',
        html: '<div class="marker-icon"><i class="fas fa-landmark"></i></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    wonders.forEach(wonder => {
        const icon = wonder.type === 'Природное чудо' ? natureIcon : cultureIcon;
        
        const popupContent = `
            <div class="custom-popup">
                <div class="popup-image">
                    <img src="${wonder.image}" alt="${wonder.name}">
                </div>
                <div class="popup-content">
                    <h3>${wonder.name}</h3>
                    <p>${wonder.description}</p>
                    <a href="#" class="wonder-btn primary-btn" onclick="openWonderModal('${wonder.id}'); return false;">Подробнее</a>
                </div>
            </div>
        `;
        
        L.marker(wonder.coordinates, { icon: icon })
            .addTo(map)
            .bindPopup(popupContent, {
                maxWidth: 280,
                className: 'custom-popup-container'
            });
    });
    
    // Добавляем обработчик клика по карте для снятия закрепления
    map.on('click', function(e) {
        // Проверяем, что клик не по маркеру
        if (!e.originalEvent.target.closest('.custom-marker')) {
            isPanelPinned = false;
            updateInfoPanel(null);
        }
    });
    
    // Функция для отображения деталей в мобильной версии
    function showWonderDetails(wonderName) {
        const wonder = wonders.find(w => w.name === wonderName);
        if (wonder) {
            const mobileDetails = document.createElement('div');
            mobileDetails.className = 'mobile-wonder-details';
            
            mobileDetails.innerHTML = `
                <div class="mobile-details-content">
                    <button class="close-details">&times;</button>
                    <div class="wonder-modal-header">
                        <div class="wonder-modal-image-container">
                            <img src="${wonder.image}" alt="${wonder.name}">
                        </div>
                        <h2>${wonder.name}</h2>
                        <div class="wonder-modal-type">
                            <i class="${wonder.type === 'Природное чудо' ? 'fas fa-mountain' : 'fas fa-landmark'}"></i>
                            <span>${wonder.type}</span>
                        </div>
                    </div>
                    <div class="wonder-modal-content-wrapper">
                        <div class="wonder-modal-description">
                            <p>${wonder.description}</p>
                        </div>
                        <div class="wonder-modal-footer">
                            <a href="#" onclick="event.preventDefault(); window.location.href='wonders.html';" class="wonder-modal-link">
                                Узнать больше <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(mobileDetails);
            
            // Анимация появления
            setTimeout(() => {
                mobileDetails.classList.add('active');
            }, 10);
            
            // Обработчик закрытия
            mobileDetails.querySelector('.close-details').addEventListener('click', function() {
                mobileDetails.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(mobileDetails);
                }, 300);
            });
        }
    }

    // Обработчик изменения темы
    document.addEventListener('themeChanged', function(e) {
        const newTheme = e.detail.isDark ? darkThemeMap : lightThemeMap;
        tileLayer.setUrl(newTheme);
    });

    // Принудительно стилизуем все кнопки "Подробнее" на карте
    setTimeout(function() {
        const allMapButtons = document.querySelectorAll('.leaflet-popup-content a');
        allMapButtons.forEach(button => {
            if (button.textContent.includes('Подробнее')) {
                button.style.backgroundColor = '#007bff';
                button.style.color = 'white';
                button.style.padding = '10px 20px';
                button.style.borderRadius = '5px';
                button.style.textDecoration = 'none';
                button.style.display = 'inline-block';
                button.style.fontWeight = 'bold';
                button.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                button.style.border = 'none';
                button.style.cursor = 'pointer';
                button.style.transition = 'all 0.3s ease';
                button.style.textAlign = 'center';
                button.style.width = '100%';
                button.style.marginTop = '10px';
            }
        });
    }, 1000); // Задержка для уверенности, что попапы уже созданы

    // Обработчик события открытия попапа для стилизации кнопок
    map.on('popupopen', function(e) {
        stylePopupButtons();
        
        // Добавляем обработчики событий для кнопок
        const popupButtons = document.querySelectorAll('.leaflet-popup-content a');
        
        popupButtons.forEach(button => {
            if (button.textContent.includes('Подробнее')) {
                // Удаляем старые обработчики, чтобы избежать дублирования
                button.removeEventListener('click', handlePopupButtonClick);
                
                // Добавляем новый обработчик
                button.addEventListener('click', handlePopupButtonClick);
            }
        });
    });

    // Функция-обработчик для кнопки "Подробнее"
    function handlePopupButtonClick(e) {
        e.preventDefault();
        
        // Получаем название чуда из заголовка попапа
        const popupContent = e.target.closest('.leaflet-popup-content');
        const wonderName = popupContent.querySelector('h3').textContent;
        
        // Определяем ID чуда по его названию
        let wonderId = '';
        
        if (wonderName.includes("Чарынский каньон")) wonderId = 'charyn-canyon';
        else if (wonderName.includes("Поющий бархан")) wonderId = 'singing-dune';
        else if (wonderName.includes("Озеро Каинды")) wonderId = 'kaindy-lake';
        else if (wonderName.includes("Петроглифы Тамгалы")) wonderId = 'tamgaly';
        else if (wonderName.includes("Мавзолей Ходжи Ахмеда Ясави")) wonderId = 'yassawi-mausoleum';
        else if (wonderName.includes("Национальный парк Алтын-Эмель")) wonderId = 'altyn-emel';
        else if (wonderName.includes("Баянаульский")) wonderId = 'bayanaul';
        
        console.log("Открываем информацию о:", wonderId);
        
        // Вызываем функцию открытия модального окна
        if (typeof openWonderModal === 'function') {
            openWonderModal(wonderId);
        } else {
            // Если функция не определена, создаем временное модальное окно
            showTemporaryModal(wonderName);
        }
    }

    // Функция для отображения временного модального окна
    function showTemporaryModal(wonderName) {
        // Проверяем, существует ли уже модальное окно
        let modal = document.getElementById('wonder-modal');
        
        if (!modal) {
            // Создаем модальное окно, если его нет
            modal = document.createElement('div');
            modal.id = 'wonder-modal';
            modal.className = 'wonder-modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'wonder-modal-content';
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'wonder-modal-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = function() {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            };
            
            const modalBody = document.createElement('div');
            modalBody.id = 'wonder-modal-body';
            modalBody.className = 'wonder-modal-body';
            
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(modalBody);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Закрытие по клику вне содержимого
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 300);
                }
            });
        }
        
        // Находим информацию о чуде
        let wonderInfo = null;
        for (const wonder of wondersInfo) {
            if (wonder.name === wonderName) {
                wonderInfo = wonder;
                break;
            }
        }
        
        // Заполняем модальное окно информацией
        const modalBody = document.getElementById('wonder-modal-body');
        
        if (wonderInfo) {
            modalBody.innerHTML = `
                <h2>${wonderInfo.name}</h2>
                <div class="wonder-modal-images">
                    ${wonderInfo.images.map(img => `<img src="${img}" alt="${wonderInfo.name}">`).join('')}
                </div>
                <p>${wonderInfo.fullDescription}</p>
                <div class="wonder-modal-details">
                    <p><strong>Расположение:</strong> ${wonderInfo.location}</p>
                    <p><strong>Тип:</strong> ${wonderInfo.type}</p>
                    <h3>Особенности:</h3>
                    <ul>
                        ${wonderInfo.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else {
            // Если информация не найдена, показываем базовое сообщение
            modalBody.innerHTML = `
                <h2>${wonderName}</h2>
                <p>Подробная информация загружается...</p>
            `;
        }
        
        // Отображаем модальное окно
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    // Функция для стилизации кнопок в попапах
    function stylePopupButtons() {
        const popupButtons = document.querySelectorAll('.leaflet-popup-content a');
        
        popupButtons.forEach(button => {
            if (button.textContent.includes('Подробнее')) {
                // Сбрасываем все предыдущие стили
                button.setAttribute('style', '');
                
                // Применяем новые стили
                Object.assign(button.style, {
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '10px 0',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    display: 'block',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    width: '100%',
                    marginTop: '10px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    fontFamily: 'Montserrat, sans-serif'
                });
            }
        });
    }

    // Вызываем функцию стилизации с задержкой после загрузки карты
    setTimeout(stylePopupButtons, 1000);
} 