// Данные о чудесах Казахстана
const wondersInfo = [
    {
        id: "charyn-canyon",
        name: "Чарынский каньон",
        fullDescription: "Чарынский каньон - живописный каньон в Казахстане, напоминающий американский Гранд-Каньон. Он образовался под воздействием воды и ветра более 12 миллионов лет назад. Каньон простирается на 154 километра вдоль реки Чарын и достигает глубины 300 метров. Самая известная его часть — Долина Замков, где выветривание создало причудливые каменные формации, напоминающие замки и башни.",
        images: ["images/index/Без названия.jpeg", "images/quiz/Charin.jpg"],
        location: "Алматинская область, в 195 км к востоку от города Алматы",
        type: "Природное чудо",
        features: [
            "Возраст: более 12 миллионов лет",
            "Протяженность: 154 км",
            "Глубина: до 300 метров",
            "Особенности: Долина Замков, красные песчаники"
        ]
    },
    {
        id: "singing-dune",
        name: "Поющий бархан",
        fullDescription: "Поющий бархан — уникальный природный феномен, создающий звуки при движении песка. Высота бархана достигает 150 метров, а длина около 3 километров. Расположен на территории национального парка Алтын-Эмель. В сухую погоду песок издает мелодичные звуки, напоминающие пение или мелодию органа, благодаря трению песчинок друг о друга при движении.",
        images: ["images/index/pustynia_pesok_barhany_170012_1280x720.jpg", "images/quiz/singing-dune.jpg"],
        location: "Национальный парк Алтын-Эмель, Алматинская область",
        type: "Природное чудо",
        features: [
            "Высота: 150 метров",
            "Длина: 3 километра",
            "Особенности: издает звуки при движении песка",
            "Лучшее время для посещения: май-сентябрь"
        ]
    },
    {
        id: "kaindy-lake",
        name: "Озеро Каинды",
        fullDescription: "Озеро Каинды — уникальное горное озеро с подводными деревьями, образовавшееся после сильного землетрясения в 1911 году. В результате обрушения известняковой породы была перекрыта горная река, что привело к затоплению еловой рощи. Благодаря холодной воде деревья хорошо сохранились и создают фантастический подводный пейзаж, привлекающий дайверов со всего мира.",
        images: ["images/index/q39j2z69sbqvlolkbk4aduhs0v0h1o4e.jpeg", "images/quiz/kaindy.jpg"],
        location: "Ущелье Каинды, Алматинская область",
        type: "Природное чудо",
        features: [
            "Глубина: до 30 метров",
            "Длина: 400 метров",
            "Образовано: 1911 год",
            "Температура воды: редко превышает +6°C"
        ]
    },
    {
        id: "tamgaly",
        name: "Петроглифы Тамгалы",
        fullDescription: "Петроглифы Тамгалы — древнее святилище с наскальными рисунками, датирующимися от эпохи бронзы до раннего железного века (XIV-XIII вв. до н.э.). Здесь найдено более 5000 рисунков, изображающих солнцеголовых божеств, воинов, охотников и различных животных. В 2004 году этот археологический комплекс был включен в список Всемирного наследия ЮНЕСКО.",
        images: ["images/index/4.jpg", "images/quiz/tamgaly.jpg"],
        location: "Урочище Тамгалы, Алматинская область, в 170 км к северо-западу от Алматы",
        type: "Историческое наследие",
        features: [
            "Возраст: 3000-4000 лет",
            "Количество рисунков: более 5000",
            "Статус: объект Всемирного наследия ЮНЕСКО",
            "Особенности: солнцеголовые божества, сцены ритуалов"
        ]
    },
    {
        id: "yassawi-mausoleum",
        name: "Мавзолей Ходжи Ахмеда Ясави",
        fullDescription: "Мавзолей Ходжи Ахмеда Ясави — выдающийся памятник средневековой архитектуры, построенный по приказу Тамерлана в конце XIV века. Это один из крупнейших и лучше всего сохранившихся памятников тимуридской архитектуры. Мавзолей был возведен над могилой известного суфийского поэта и проповедника Ходжи Ахмеда Ясави. С 2003 года включен в список Всемирного наследия ЮНЕСКО.",
        images: ["images/index/1280px-Ханака_Ахмеда_Ясави_2010_019.jpg", "images/quiz/mausoleum.jpg"],
        location: "Город Туркестан, Туркестанская область",
        type: "Культурное наследие",
        features: [
            "Построен: 1389-1405 гг.",
            "Высота главного купола: 44 метра",
            "Статус: объект Всемирного наследия ЮНЕСКО",
            "Особенности: тимуридская архитектура, медный тай-казан"
        ]
    },
    {
        id: "altyn-emel",
        name: "Национальный парк Алтын-Эмель",
        fullDescription: "Национальный парк Алтын-Эмель — один из крупнейших национальных парков Казахстана, расположенный на территории Алматинской области. Основанный в 1996 году, парк занимает площадь более 4600 км². Здесь представлены разнообразные ландшафты: от песчаных пустынь и степей до горных хребтов. Парк известен своим богатым биоразнообразием, включая редкие виды животных, такие как кулан, джейран и архар.",
        images: ["images/index/natsionalnyy-park-altyn-emel_37.jpg"],
        location: "Алматинская область, в 150 км к северо-востоку от Алматы",
        type: "Природное чудо",
        features: [
            "Площадь: более 4600 км²",
            "Основан: 1996 год",
            "Биоразнообразие: более 1500 видов растений, 260 видов животных",
            "Особенности: Поющий бархан, меловые горы Актау, петроглифы Бесшатыр"
        ]
    },
    {
        id: "bayanaul",
        name: "Баянаульский национальный парк",
        fullDescription: "Баянаульский национальный парк — первый национальный парк Казахстана, основанный в 1985 году. Расположен в Павлодарской области и занимает площадь около 680 км². Парк знаменит своими уникальными скальными образованиями, чистыми озерами и богатым разнообразием флоры и фауны. На территории парка находятся четыре крупных озера: Сабындыколь, Жасыбай, Торайгыр и Биржанколь.",
        images: ["images/quiz/bayanaul.jpg"],
        location: "Павлодарская область, в 100 км к югу от города Павлодар",
        type: "Природное чудо",
        features: [
            "Площадь: 680 км²",
            "Основан: 1985 год",
            "Достопримечательности: озера Жасыбай и Сабындыколь, скала Баба-Яга",
            "Климат: резко континентальный"
        ]
    }
];

// Функция для открытия модального окна с информацией о чуде
function openWonderModal(wonderId) {
    // Находим информацию о выбранном чуде
    const wonder = wondersInfo.find(w => w.id === wonderId);
    
    if (!wonder) {
        console.error("Чудо с ID " + wonderId + " не найдено!");
        return;
    }
    
    const modal = document.getElementById('wonder-modal');
    const modalBody = document.getElementById('wonder-modal-body');
    
    if (!modal || !modalBody) {
        console.error('Элементы модального окна не найдены!');
        return;
    }
    
    // Выбираем первое изображение (или используем заглушку, если нет изображений)
    const mainImage = wonder.images && wonder.images.length > 0 
                    ? wonder.images[0] 
                    : 'images/placeholder.jpg';
    
    // Генерируем HTML для особенностей
    let featuresHTML = '';
    if (wonder.features && wonder.features.length > 0) {
        featuresHTML = `
            <div class="wonder-modal-features">
                <h4>Особенности</h4>
                <ul>
                    ${wonder.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Заполняем модальное окно
    modalBody.innerHTML = `
        <div class="wonder-modal-header">
            <div class="wonder-modal-image-container">
                <img src="${mainImage}" alt="${wonder.name}">
            </div>
            <h2>${wonder.name}</h2>
            <div class="wonder-modal-type">
                <i class="${wonder.type === 'Природное чудо' ? 'fas fa-mountain' : 'fas fa-landmark'}"></i>
                <span>${wonder.type}</span>
            </div>
        </div>
        <div class="wonder-modal-content-wrapper">
            <div class="wonder-modal-description">
                <p>${wonder.fullDescription}</p>
            </div>
            <div class="wonder-modal-location">
                <i class="fas fa-map-marker-alt"></i>
                <p>${wonder.location}</p>
            </div>
            ${featuresHTML}
            <div class="wonder-modal-footer">
                <a href="https://ru.wikipedia.org/wiki/${encodeURIComponent(wonder.name)}" target="_blank" class="wonder-modal-link">
                    Узнать больше на Wikipedia <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `;
    
    // Открываем модальное окно
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
        
        // Прокручиваем в начало при открытии
        modalBody.scrollTop = 0;
    }, 10);
}

// Настройка обработчиков событий
document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки "Подробнее" на странице
    const wonderButtons = document.querySelectorAll('.wonder-btn');
    
    wonderButtons.forEach(button => {
        // Получаем текст родительского элемента (заголовок чуда)
        const wonderName = button.closest('.wonder-list-content').querySelector('h3').textContent;
        console.log("Найдена кнопка для:", wonderName);
        
        let wonderId = '';
        
        // Определяем ID чуда по его названию
        if (wonderName.includes("Чарынский каньон")) wonderId = 'charyn-canyon';
        else if (wonderName.includes("Поющий бархан")) wonderId = 'singing-dune';
        else if (wonderName.includes("Озеро Каинды")) wonderId = 'kaindy-lake';
        else if (wonderName.includes("Петроглифы Тамгалы")) wonderId = 'tamgaly';
        else if (wonderName.includes("Мавзолей Ходжи Ахмеда Ясави")) wonderId = 'yassawi-mausoleum';
        else if (wonderName.includes("Национальный парк Алтын-Эмель")) wonderId = 'altyn-emel';
        else if (wonderName.includes("Баянаульский")) wonderId = 'bayanaul';
        
        console.log("Определен ID:", wonderId);
        
        // Заменяем обработчик события
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openWonderModal(wonderId);
        });
        
        // Обновляем атрибут href для семантики
        button.setAttribute('href', '#');
    });
    
    // Закрытие модального окна
    const closeBtn = document.querySelector('.wonder-modal-close');
    const modal = document.getElementById('wonder-modal');
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
        
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
}); 