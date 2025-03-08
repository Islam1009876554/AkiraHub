document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, существует ли элемент карты на странице
    const mapElement = document.getElementById('wonders-map');
    if (mapElement) {
        initWondersMap();
    }
});

function initWondersMap() {
    const map = L.map('wonders-map').setView([48.0196, 66.9237], 5);
    
    // Добавляем красивый стиль карты
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
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

    // Создаем пользовательские иконки для маркеров
    const natureIcon = L.divIcon({
        className: 'custom-marker nature-marker',
        html: '<i class="fas fa-mountain"></i>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const historyIcon = L.divIcon({
        className: 'custom-marker history-marker',
        html: '<i class="fas fa-landmark"></i>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    wonders.forEach(wonder => {
        const icon = wonder.type === 'Природное чудо' ? natureIcon : historyIcon;
        
        const marker = L.marker(wonder.coordinates, {icon: icon})
            .addTo(map);
        
        // Обработчики событий для маркера
        marker.on('mouseover', function() {
            updateInfoPanel(wonder);
        });
        
        marker.on('click', function() {
            // При клике закрепляем панель
            isPanelPinned = true;
            updateInfoPanel(wonder, true);
        });
        
        marker.on('mouseout', function() {
            // Оставляем панель открытой при закреплении
            if (!isPanelPinned) {
                updateInfoPanel(null);
            }
        });
        
        // Добавляем компактный попап для мобильных устройств
        const popupContent = `
            <div class="compact-popup">
                <h4>${wonder.name}</h4>
                <p class="popup-type"><i class="${wonder.type === 'Природное чудо' ? 'fas fa-mountain' : 'fas fa-landmark'}"></i> ${wonder.type}</p>
                <a href="#" class="popup-more" onclick="event.preventDefault(); showWonderDetails('${wonder.name}');">Подробнее</a>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            maxWidth: 200,
            className: 'compact-popup-container'
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
    window.showWonderDetails = function(wonderName) {
        const wonder = wonders.find(w => w.name === wonderName);
        if (wonder) {
            const mobileDetails = document.createElement('div');
            mobileDetails.className = 'mobile-wonder-details';
            mobileDetails.innerHTML = `
                <div class="mobile-details-content">
                    <button class="close-details"><i class="fas fa-times"></i></button>
                    <div class="details-image">
                        <img src="${wonder.image}" alt="${wonder.name}">
                    </div>
                    <h3>${wonder.name}</h3>
                    <div class="details-type">
                        <i class="${wonder.type === 'Природное чудо' ? 'fas fa-mountain' : 'fas fa-landmark'}"></i>
                        <span>${wonder.type}</span>
                    </div>
                    <p>${wonder.description}</p>
                    <a href="https://ru.wikipedia.org/wiki/${encodeURIComponent(wonder.name.replace(/ /g, '_'))}" class="details-btn" target="_blank">
                        <i class="fas fa-info-circle"></i> Узнать больше
                    </a>
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
    };
} 