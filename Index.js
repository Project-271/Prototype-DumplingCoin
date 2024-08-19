// ======= Инициализация переменных =======
let countMoney = 0
let click = 1
let improvement_1Price = 100

let currentLevel = 1
let moneyForNextLevel = 100
let currentTaps = 0

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
	saveProgress() // Сохранение прогресса при повышении уровня
}

// ======= Функция обработки кликов и подсчета =======
function Count() {
	countMoney += click

	document.getElementById('Count').innerText = countMoney
	updateProgressBar()

	if (countMoney >= moneyForNextLevel) {
		levelUp()
	}
	saveProgress() // Сохранение прогресса при клике
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
		).innerText = `Прибыль за клик:${click}`
		document.getElementById('Count').innerText = countMoney
		document.getElementById('improvment_1Prise_increaseClickValue').innerText =
			improvement_1Price
		saveProgress() // Сохранение прогресса после улучшения
	}
}

// Автокликер +1
let avtoClick = 0
let priceAutoClicker = 100

function increaseAvtoClickerPrise() {
	if (countMoney >= priceAutoClicker) {
		avtoClick += 1
		countMoney -= priceAutoClicker
		priceAutoClicker *= 2
		document.getElementById('Count').innerText = countMoney
		document.getElementById('improvment_PriseAvtoCliker').innerText =
			priceAutoClicker
		saveProgress() // Сохранение прогресса после покупки автокликера
	}
}

function autoClick() {
	if (avtoClick > 0) {
		countMoney += avtoClick
		document.getElementById('Count').innerText = countMoney
		updateProgressBar()

		if (countMoney >= moneyForNextLevel) {
			levelUp()
		}
		saveProgress() // Сохранение прогресса при автоклике
	}
	document.getElementById(
		'Count_vSecond'
	).innerText = `Прибыль в секунду: ${avtoClick}`
}

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

// ======= Сохранение данных =======
function saveProgress() {
	console.log('Сохранение прогресса...', {
		countMoney,
		click,
		improvement_1Price,
		currentLevel,
		moneyForNextLevel,
		avtoClick,
		priceAutoClicker,
	}) // Для отладки
	localStorage.setItem('countMoney', countMoney)
	localStorage.setItem('click', click)
	localStorage.setItem('improvement_1Price', improvement_1Price)
	localStorage.setItem('currentLevel', currentLevel)
	localStorage.setItem('moneyForNextLevel', moneyForNextLevel)
	localStorage.setItem('avtoClick', avtoClick)
	localStorage.setItem('priceAutoClicker', priceAutoClicker)
	console.log('Прогресс сохранен') // Для отладки
}

function loadProgress() {
	console.log('Загрузка прогресса...')

	countMoney = parseInt(localStorage.getItem('countMoney'), 10) || 0
	click = parseInt(localStorage.getItem('click'), 10) || 1
	improvement_1Price =
		parseInt(localStorage.getItem('improvement_1Price'), 10) || 100
	currentLevel = parseInt(localStorage.getItem('currentLevel'), 10) || 1
	moneyForNextLevel =
		parseInt(localStorage.getItem('moneyForNextLevel'), 10) || 100
	avtoClick = parseInt(localStorage.getItem('avtoClick'), 10) || 0
	priceAutoClicker =
		parseInt(localStorage.getItem('priceAutoClicker'), 10) || 100

	console.log({
		countMoney,
		click,
		improvement_1Price,
		currentLevel,
		moneyForNextLevel,
		avtoClick,
		priceAutoClicker,
	})

	document.getElementById('Count').innerText = countMoney
	document.getElementById(
		'Count_zaClick'
	).innerText = `Прибыль за клик: ${click}`
	document.getElementById('improvment_1Prise_increaseClickValue').innerText =
		improvement_1Price
	document.getElementById('rankLabel').innerText = `Уровень ${currentLevel}`
	document.getElementById('improvment_PriseAvtoCliker').innerText =
		priceAutoClicker
	document.getElementById(
		'Count_vSecond'
	).innerText = `Прибыль в секунду: ${avtoClick}`

	updateProgressBar()
}
function loadProgress() {
	console.log('Загрузка прогресса вызвана')
}


window.addEventListener('beforeunload', saveProgress)
window.onload = function() {
    loadProgress();
};
