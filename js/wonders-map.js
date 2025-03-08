document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, существует ли элемент карты на странице
    const mapElement = document.getElementById('wonders-map');
    if (mapElement) {
        initWondersMap();
    }
});

function initWondersMap() {
    const map = L.map('wonders-map', {
        zoomControl: false,
        attributionControl: false
    }).setView([48.0196, 66.9237], 5);
    
    // Добавляем элементы управления в правый верхний угол
    L.control.zoom({
        position: 'topright'
    }).addTo(map);
    
    // Добавляем красивый стиль карты
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO',
        maxZoom: 19
    }).addTo(map);

    // Создаем пользовательские иконки для маркеров
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

    // Создаем боковую панель для информации
    const infoPanel = L.control({position: 'bottomright'});
    
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
            if (newPinButton) {
                newPinButton.addEventListener('click', function() {
                    isPanelPinned = !isPanelPinned;
                    this.classList.toggle('pinned');
                    panel.classList.toggle('pinned');
                    this.title = isPanelPinned ? 'Открепить панель' : 'Закрепить панель';
                });
            }
        } else {
            panel.innerHTML = `
                <div class="panel-content">
                    <div class="panel-header">
                        <h3>Выберите чудо на карте</h3>
                        <button class="panel-pin-button" title="Закрепить панель">
                            <i class="fas fa-thumbtack"></i>
                        </button>
                    </div>
                    <p>Наведите курсор на маркер или нажмите на него, чтобы увидеть подробную информацию.</p>
                </div>
            `;
            panel.classList.remove('active');
            panel.classList.remove('pinned');
            isPanelPinned = false;
        }
    }
    
    // Добавляем легенду
    const legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'wonder-legend');
        div.innerHTML = `
            <h4>Легенда</h4>
            <div class="legend-item">
                <span class="legend-icon nature"><i class="fas fa-mountain"></i></span>
                <span>Природные чудеса</span>
            </div>
            <div class="legend-item">
                <span class="legend-icon culture"><i class="fas fa-landmark"></i></span>
                <span>Культурные чудеса</span>
            </div>
        `;
        return div;
    };
    legend.addTo(map);

    // Данные о чудесах
    const wonders = [
        {
            name: "Чарынский каньон",
            coordinates: [43.35, 79.08],
            description: "Живописный каньон, напоминающий американский Гранд-Каньон, с уникальными формациями из красного песчаника.",
            image: "images/index/Без названия.jpeg",
            type: "Природное чудо"
        },
        {
            name: "Поющий бархан",
            coordinates: [43.9167, 77.3667],
            description: "Уникальный природный феномен, создающий звуки при движении песка по склону дюны.",
            image: "images/index/pustynia_pesok_barhany_170012_1280x720.jpg",
            type: "Природное чудо"
        },
        {
            name: "Озеро Каинды",
            coordinates: [43.0733, 78.2833],
            description: "Уникальное озеро с подводными деревьями, образовавшимися после землетрясения.",
            image: "images/index/q39j2z69sbqvlolkbk4aduhs0v0h1o4e.jpeg",
            type: "Природное чудо"
        },
        {
            name: "Петроглифы Тамгалы",
            coordinates: [43.8000, 75.5333],
            description: "Древние наскальные рисунки, отражающие культуру и быт древних людей.",
            image: "images/index/4.jpg",
            type: "Культурное чудо"
        },
        {
            name: "Мавзолей Ходжи Ахмеда Ясави",
            coordinates: [43.3000, 68.2667],
            description: "Величественный мавзолей, являющийся объектом Всемирного наследия ЮНЕСКО.",
            image: "images/index/1280px-Ханака_Ахмеда_Ясави_2010_019.jpg",
            type: "Культурное чудо"
        },
        {
            name: "Национальный парк Алтын-Эмель",
            coordinates: [43.7000, 78.3667],
            description: "Уникальный природный парк с разнообразной флорой и фауной.",
            image: "images/index/natsionalnyy-park-altyn-emel_37.jpg",
            type: "Природное чудо"
        },
        {
            name: "Баянаульский национальный парк",
            coordinates: [50.8167, 75.7000],
            description: "Красивый парк с живописными озерами и горами.",
            image: "images/index/a2abe65e4a8c6014f56ea0bda0cf71ae.jpg",
            type: "Природное чудо"
        }
    ];

    // Добавляем маркеры на карту
    wonders.forEach(wonder => {
        const icon = wonder.type === 'Природное чудо' ? natureIcon : cultureIcon;
        
        const marker = L.marker(wonder.coordinates, { icon: icon }).addTo(map);
        
        // Создаем красивый попап
        const popupContent = `
            <div class="custom-popup">
                <div class="popup-image">
                    <img src="${wonder.image}" alt="${wonder.name}">
                </div>
                <div class="popup-content">
                    <h3>${wonder.name}</h3>
                    <p>${wonder.description}</p>
                    <a href="https://ru.wikipedia.org/wiki/${encodeURIComponent(wonder.name.replace(/ /g, '_'))}" class="popup-btn" target="_blank">Подробнее <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            maxWidth: 280,
            className: 'custom-popup-container',
            closeButton: false
        });
        
        // Обработчики событий для маркера
        marker.on('mouseover', function() {
            this.openPopup();
            updateInfoPanel(wonder);
        });
        
        marker.on('click', function() {
            // При клике закрепляем панель
            isPanelPinned = true;
            updateInfoPanel(wonder, true);
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
} 