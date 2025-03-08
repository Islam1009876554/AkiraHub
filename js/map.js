let map;
let activeMarker = null;

function initMap() {
    map = L.map('map', {
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
    
    // Добавляем маркеры для чудес с улучшенным дизайном
    const wonders = [
        {
            name: "Чарынский каньон",
            coordinates: [43.35, 79.08],
            description: "Живописный каньон, напоминающий американский Гранд-Каньон",
            image: "images/index/Без названия.jpeg",
            type: "nature"
        },
        {
            name: "Поющий бархан",
            coordinates: [43.9167, 77.3667],
            description: "Уникальный природный феномен, создающий звуки при движении песка",
            image: "images/index/pustynia_pesok_barhany_170012_1280x720.jpg",
            type: "nature"
        },
        {
            name: "Озеро Каинды",
            coordinates: [43.0733, 78.2833],
            description: "Уникальное озеро с подводными деревьями, образовавшимися после землетрясения",
            image: "images/index/q39j2z69sbqvlolkbk4aduhs0v0h1o4e.jpeg",
            type: "nature"
        },
        {
            name: "Петроглифы Тамгалы",
            coordinates: [43.8000, 75.5333],
            description: "Древние наскальные рисунки, отражающие культуру и быт древних людей",
            image: "images/index/4.jpg",
            type: "culture"
        },
        {
            name: "Мавзолей Ходжи Ахмеда Ясави",
            coordinates: [43.3000, 68.2667],
            description: "Величественный мавзолей, являющийся объектом Всемирного наследия ЮНЕСКО",
            image: "images/index/1280px-Ханака_Ахмеда_Ясави_2010_019.jpg",
            type: "culture"
        },
        {
            name: "Национальный парк Алтын-Эмель",
            coordinates: [43.7000, 78.3667],
            description: "Уникальный природный парк с разнообразной флорой и фауной",
            image: "images/index/natsionalnyy-park-altyn-emel_37.jpg",
            type: "nature"
        },
        {
            name: "Баянаульский национальный парк",
            coordinates: [50.8167, 75.7000],
            description: "Красивый парк с живописными озерами и горами",
            image: "images/index/a2abe65e4a8c6014f56ea0bda0cf71ae.jpg",
            type: "nature"
        }
    ];

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

    wonders.forEach(wonder => {
        const popupContent = `
            <div class="custom-popup">
                <div class="popup-image">
                    <img src="${wonder.image}" alt="${wonder.name}">
                </div>
                <div class="popup-content">
                    <h3>${wonder.name}</h3>
                    <p>${wonder.description}</p>
                    <a href="wonders.html" class="popup-btn">Подробнее</a>
                </div>
            </div>
        `;

        const icon = wonder.type === 'nature' ? natureIcon : cultureIcon;
        
        const marker = L.marker(wonder.coordinates, { icon: icon })
            .addTo(map)
            .bindPopup(popupContent, {
                maxWidth: 280,
                className: 'custom-popup-container',
                closeButton: false
            });
            
        // Добавляем анимацию при наведении
        marker.on('mouseover', function() {
            this.openPopup();
        });
        
        // Опционально: закрывать попап при уходе мыши
        // marker.on('mouseout', function() {
        //     this.closePopup();
        // });
    });
    
    // Добавляем легенду
    const legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'map-legend');
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
}

document.addEventListener('DOMContentLoaded', initMap); 