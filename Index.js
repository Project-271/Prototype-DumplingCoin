// ======= Инициализация переменных =======
let countMoney = 0
let click = 1
let improvement_1Price = 100

let currentLevel = 1
let moneyForNextLevel = 100
let currentTaps = 0

let avtoClick = 0
let priceAutoClicker = 100

 let lavkaClick = 0
 let priceLavkaClicker = 300

  let fermaClick = 0
	let priceFermaClicker = 800

	let factoryClick = 0
	let priceFactoryClicker = 1500

	let restaurantClick = 0
	let priceRestaurantClicker = 3000

// ======= Функция обновления прогресс-бара =======
function updateProgressBar() {
	const progressFill = document.getElementById('progressFill')
	const progress = (countMoney / moneyForNextLevel) * 100
	progressFill.style.width = `${progress}%`
}

// ======= Функция повышения уровня =======
function levelUp() {
	currentLevel++
	moneyForNextLevel *= 5

	document.getElementById('rankLabel').innerText = `Уровень ${currentLevel}`
	updateProgressBar()
}

// ======= Функция обработки кликов и подсчета =======
function Count() {
	countMoney += click

	document.getElementById('Count').innerText = countMoney
	updateProgressBar()

	if (countMoney >= moneyForNextLevel) {
		levelUp()
	}

	return countMoney
}
// ======= Функция увеличения значения клика =======
function increaseClickValue() {
	if (countMoney >= improvement_1Price) {
		click += 1
		countMoney -= improvement_1Price
		improvement_1Price *= 3
		document.getElementById(
			'Count_zaClick'
		).innerText = `Прибыль за клик: ${click}`
		document.getElementById('Count').innerText = countMoney
		document.getElementById('improvment_1Prise_increaseClickValue').innerText =
			improvement_1Price
	}
}
// ======= Функция увеличения значения автокликера =======
function increaseAvtoClickerPrise() {
	if (countMoney >= priceAutoClicker) {
		avtoClick += 1
		countMoney -= priceAutoClicker
		priceAutoClicker *= 2
		document.getElementById('Count').innerText = countMoney
		document.getElementById('improvment_PriseAvtoCliker').innerText =
			priceAutoClicker
		document.getElementById('Count_vSecond').innerText = `Прибыль в секунду: ${
			avtoClick + lavkaClick + fermaClick + factoryClick + restaurantClick
		}`
	}
}
// Улучшение пельменная лавка
function increaseLavkaPrise() {
	if (countMoney >= priceLavkaClicker) {
		lavkaClick += 5
		countMoney -= priceLavkaClicker
		priceLavkaClicker *= 2.5
		document.getElementById('Count').innerText = countMoney
		document.getElementById('priceLavkaClicker').innerText = priceLavkaClicker
		document.getElementById('Count_vSecond').innerText = `Прибыль в секунду: ${
			lavkaClick + avtoClick + fermaClick + factoryClick + restaurantClick
		}`
	}
}
// Улучшение ферма пельменей
function increaseFermaPrise(){
		if (countMoney >= priceFermaClicker) {
			fermaClick += 10
			countMoney -= priceFermaClicker
			priceFermaClicker *= 3
			document.getElementById('Count').innerText = countMoney
			document.getElementById('priceFermaClicker').innerText = priceFermaClicker
			document.getElementById('Count_vSecond').innerText = `Прибыль в секунду: ${lavkaClick + avtoClick + fermaClick + factoryClick + restaurantClick}`
		}
}
// Улучшение завода пельменей
function increaseFactoryPrise(){
	if (countMoney >= priceFactoryClicker) {
		factoryClick += 20
		countMoney -= priceFactoryClicker
		priceFactoryClicker *= 2.5
		document.getElementById('Count').innerText = countMoney
		document.getElementById('priceFactoryClicker').innerText = priceFactoryClicker
		document.getElementById('Count_vSecond').innerText = `Прибыль в секунду: ${
			lavkaClick + avtoClick + fermaClick + factoryClick + restaurantClick
		}`
	}
}
// Улучшение Ресторана пельменей
function increaseRestaurauntPrise(){
	if (countMoney >= priceRestaurantClicker) {
		restaurantClick += 50
		countMoney -= priceRestaurantClicker
		priceRestaurantClicker *= 2
		document.getElementById('Count').innerText = countMoney
		document.getElementById('priceRestaurauntClicker').innerText = priceRestaurantClicker
		document.getElementById('Count_vSecond').innerText = `Прибыль в секунду: ${
			lavkaClick + avtoClick + fermaClick + factoryClick + restaurantClick
		}`
	}
}
// ======= Функция автоклика =======
function autoClick() {
	if (avtoClick > 0 || lavkaClick > 0 || fermaClick > 0 || factoryClick > 0 || restaurantClick > 0) {
		countMoney += avtoClick + lavkaClick + fermaClick + factoryClick + restaurantClick
		document.getElementById('Count').innerText = countMoney
		updateProgressBar()

		if (countMoney >= moneyForNextLevel) {
			levelUp()
		}
	}
}

// Запуск автокликера каждую секунду
setInterval(autoClick, 1000)

// ======= Обработка событий касания =======
document.querySelector('.mainСharacter').addEventListener(
	'touchstart',
	function (event) {
		event.preventDefault()
		for (let i = 0; i < event.touches.length; i++) {
			Count()
		}
	},
	{ passive: true }
)

// ======= Анимация кнопки при нажатии и перемещении =======
function pressAndMoveButton(button) {
	button.classList.add('press-move')
	setTimeout(function () {
		button.classList.remove('press-move')
	}, 300)
}

// ======= Обработчик для кнопки автокликера (исключает добавление очков при нажатии) =======
function handleAutoClickerClick(event) {
	event.stopPropagation() // Предотвращает дальнейшую обработку события
	increaseAvtoClickerPrise()
}

// Назначение обработчика кнопке автокликера
document
	.querySelector('.improvments:nth-child(2)')
	.addEventListener('click', handleAutoClickerClick)

// ======= Анимация при клике по основной кнопке =======
function handleClick(event) {
	const button = event.currentTarget
	const rect = button.getBoundingClientRect()

	const numberElement = document.createElement('div')
	numberElement.className = 'floating-number'
	numberElement.innerText = `+${click}`

	const x = event.clientX - rect.left
	const y = event.clientY - rect.top
	numberElement.style.position = 'absolute'
	numberElement.style.left = `${x}px`
	numberElement.style.top = `${y}px`

	button.appendChild(numberElement)

	setTimeout(() => {
		numberElement.style.transform = 'translateY(-50px)'
		numberElement.style.opacity = '0'
	}, 0)

	setTimeout(() => {
		numberElement.remove()
	}, 1000)
}
// Навигация
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}

function selectSkin(skinName) {
  const mainCharacter = document.querySelector('.mainСharacter');
  mainCharacter.style.backgroundImage = `url('./photo/${skinName}')`;
}

// Other functions remain unchanged
// ======= Функция сохранения данных в localStorage =======
function saveGameData() {
	const gameData = {
		countMoney,
		click,
		improvement_1Price,
		currentLevel,
		moneyForNextLevel,
		avtoClick,
		priceAutoClicker,
		lavkaClick,
		priceLavkaClicker,
		fermaClick,
		priceFermaClicker,
		factoryClick,
		priceFactoryClicker,
		restaurantClick,
		priceRestaurantClicker,
	};
	localStorage.setItem('dumplingcoinSave', JSON.stringify(gameData));
}

// ======= Функция загрузки данных из localStorage =======
function loadGameData() {
	const savedData = localStorage.getItem('dumplingcoinSave');
	if (savedData) {
		const gameData = JSON.parse(savedData);
		countMoney = gameData.countMoney;
		click = gameData.click;
		improvement_1Price = gameData.improvement_1Price;
		currentLevel = gameData.currentLevel;
		moneyForNextLevel = gameData.moneyForNextLevel;
		avtoClick = gameData.avtoClick;
		priceAutoClicker = gameData.priceAutoClicker;
		lavkaClick = gameData.lavkaClick;
		priceLavkaClicker = gameData.priceLavkaClicker;
		fermaClick = gameData.fermaClick;
		priceFermaClicker = gameData.priceFermaClicker;
		factoryClick = gameData.factoryClick;
		priceFactoryClicker = gameData.priceFactoryClicker;
		restaurantClick = gameData.restaurantClick;
		priceRestaurantClicker = gameData.priceRestaurantClicker;

		// Обновляем отображение на экране
		document.getElementById('Count').innerText = countMoney;
		document.getElementById('Count_zaClick').innerText = `Прибыль за клик: ${click}`;
		document.getElementById('Count_vSecond').innerText = `Прибыль в секунду: ${
			lavkaClick + avtoClick + fermaClick + factoryClick + restaurantClick
		}`;
		document.getElementById('rankLabel').innerText = `Уровень ${currentLevel}`;
		document.getElementById('improvment_1Prise_increaseClickValue').innerText = improvement_1Price;
		document.getElementById('improvment_PriseAvtoCliker').innerText = priceAutoClicker;
		document.getElementById('priceLavkaClicker').innerText = priceLavkaClicker;
		document.getElementById('priceFermaClicker').innerText = priceFermaClicker;
		document.getElementById('priceFactoryClicker').innerText = priceFactoryClicker;
		document.getElementById('priceRestaurauntClicker').innerText = priceRestaurantClicker;

		updateProgressBar();
	}
}

// ======= Автосохранение игры каждые 10 секунд =======
setInterval(saveGameData, 10000);

// Загрузка данных при старте игры
window.onload = loadGameData;
// скинс
// ======= Функция выбора скина с галочкой =======
function selectSkin(skinName, buttonElement) {
  const mainCharacter = document.querySelector('.mainСharacter');
  mainCharacter.style.backgroundImage = `url('./photo/${skinName}')`;

  // Сохраняем выбранный скин в localStorage
  localStorage.setItem('selectedSkin', skinName);

  // Удаляем галочку со всех кнопок скинов
  const allSkinButtons = document.querySelectorAll('.skin-option');
  allSkinButtons.forEach(button => {
    button.classList.remove('selected-skin');
    const checkmark = button.querySelector('.checkmark');
    if (checkmark) {
      checkmark.remove();
    }
  });

  // Добавляем галочку на выбранную кнопку
  buttonElement.classList.add('selected-skin');
  const checkmark = document.createElement('span');
  checkmark.className = 'checkmark';
  checkmark.innerText = '✔';
  buttonElement.appendChild(checkmark);
}

// ======= Функция загрузки выбранного скина =======
function loadSelectedSkin() {
  const savedSkin = localStorage.getItem('selectedSkin');
  if (savedSkin) {
    const mainCharacter = document.querySelector('.mainСharacter');
    mainCharacter.style.backgroundImage = `url('./photo/${savedSkin}')`;

    // Устанавливаем галочку на соответствующую кнопку
    const allSkinButtons = document.querySelectorAll('.skin-option');
    allSkinButtons.forEach(button => {
      if (button.innerText.includes(savedSkin.split('.')[0])) {
        button.classList.add('selected-skin');
        const checkmark = document.createElement('span');
        checkmark.className = 'checkmark';
        checkmark.innerText = '✔';
        button.appendChild(checkmark);
      }
    });
  }
}

// Загрузка скина при старте игры
window.onload = function () {
  loadGameData(); // Загрузка данных игры
  loadSelectedSkin(); // Загрузка выбранного скина
};
