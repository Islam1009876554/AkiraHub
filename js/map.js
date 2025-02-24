let map;
let activeMarker = null;

function initMap() {
    map = L.map('map').setView([48.0196, 66.9237], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Добавление маркеров для чудес с расширенной информацией
    const wonders = [
        {
            name: "Чарынский каньон",
            coordinates: [43.35, 79.08],
            description: "Живописный каньон, напоминающий американский Гранд-Каньон",
            image: "images/index/Без названия.jpeg"
        },
        {
            name: "Поющий бархан",
            coordinates: [43.9167, 77.3667],
            description: "Уникальный природный феномен, создающий звуки при движении песка",
            image: "images/index/pustynia_pesok_barhany_170012_1280x720.jpg"
        },
        {
            name: "Озеро Каинды",
            coordinates: [43.0733, 78.2833],
            description: "Уникальное озеро с подводными деревьями, образовавшимися после землетрясения",
            image: "images/index/q39j2z69sbqvlolkbk4aduhs0v0h1o4e.jpeg"
        },
        {
            name: "Петроглифы Тамгалы",
            coordinates: [43.8000, 75.5333],
            description: "Древние наскальные рисунки, отражающие культуру и быт древних людей",
            image: "images/index/4.jpg"
        },
        {
            name: "Мавзолей Ходжи Ахмеда Ясави",
            coordinates: [43.3000, 68.2667],
            description: "Величественный мавзолей, являющийся объектом Всемирного наследия ЮНЕСКО",
            image: "images/index/mavzoley-khodzhi-akhmeda-yasavi_52.jpg"
        },
        {
            name: "Национальный парк Алтын-Эмель",
            coordinates: [43.7000, 78.3667],
            description: "Уникальный природный парк с разнообразной флорой и фауной",
            image: "images/index/natsionalnyy-park-altyn-emel_37.jpg"
        },
        {
            name: "Баянаульский национальный парк",
            coordinates: [50.8167, 75.7000],
            description: "Красивый парк с живописными озерами и горами",
            image: "images/index/a2abe65e4a8c6014f56ea0bda0cf71ae.jpg"
        }
    ];

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

        const marker = L.marker(wonder.coordinates)
            .addTo(map)
            .bindPopup(popupContent, {
                maxWidth: 300,
                className: 'custom-popup-container'
            });
    });
}

document.addEventListener('DOMContentLoaded', initMap); 