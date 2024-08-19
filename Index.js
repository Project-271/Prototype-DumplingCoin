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
}

// ======= Функция обработки кликов и подсчета =======
function Count() {
	countMoney += click

	document.getElementById('Count').innerText = countMoney
	updateProgressBar()

	if (countMoney >= moneyForNextLevel) {
		levelUp()
	}

	// Сохранение данных в куки
	saveProgress()

	return countMoney
}

// ======= Функция увеличения значения клика =======
function increaseClickValue() {
	if (countMoney >= improvement_1Price) {
		click += 1
		countMoney -= improvement_1Price
		improvement_1Price *= 3
		document.getElementById('Count_zaClick').innerText = `Прибыль за клик:${click}`
		document.getElementById('Count').innerText = countMoney
		document.getElementById('improvment_1Prise_increaseClickValue').innerText =
			improvement_1Price
			// Сохранение данных в куки
        saveProgress();
}}
// Автокликер +1
let avtoClick = 0
let priceAutoClicker = 100

function increaseAvtoClickerPrise() {
	if (countMoney >= priceAutoClicker) {
		avtoClick += 1
		countMoney -= priceAutoClicker
		priceAutoClicker *= 2
		document.getElementById('Count').innerText = countMoney
		document.getElementById('improvment_PriseAvtoCliker').innerText = priceAutoClicker
		// Сохранение данных в куки
		saveProgress()
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
	}
	document.getElementById('Count_vSecond').innerText = `Прибыль в секунду: ${avtoClick}`
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
// Сохранение прогресса
function setCookie(name, value, days) {
	const date = new Date()
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
	const expires = `expires=${date.toUTCString()}`
	document.cookie = `${name}=${value};${expires};path=/`
}

function getCookie(name) {
	const nameEQ = `${name}=`
	const ca = document.cookie.split(';')
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) == ' ') c = c.substring(1, c.length)
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
	}
	return null
}
function saveProgress() {
	setCookie('countMoney', countMoney, 365)
	setCookie('click', click, 365)
	setCookie('currentLevel', currentLevel, 365)
	setCookie('moneyForNextLevel', moneyForNextLevel, 365)
	setCookie('avtoClick', avtoClick, 365)
	setCookie('priceAutoClicker', priceAutoClicker, 365)
	setCookie('improvement_1Price', improvement_1Price, 365)
}
function loadProgress() {
	countMoney = parseInt(getCookie('countMoney')) || 0
	click = parseInt(getCookie('click')) || 1
	currentLevel = parseInt(getCookie('currentLevel')) || 1
	moneyForNextLevel = parseInt(getCookie('moneyForNextLevel')) || 100
	avtoClick = parseInt(getCookie('avtoClick')) || 0
	priceAutoClicker = parseInt(getCookie('priceAutoClicker')) || 100
	improvement_1Price = parseInt(getCookie('improvement_1Price')) || 100

	document.getElementById('Count').innerText = countMoney
	document.getElementById(
		'Count_zaClick'
	).innerText = `Прибыль за клик: ${click}`
	document.getElementById('rankLabel').innerText = `Уровень ${currentLevel}`
	document.getElementById('improvment_1Prise_increaseClickValue').innerText =
		improvement_1Price
	document.getElementById('improvment_PriseAvtoCliker').innerText =
		priceAutoClicker

	updateProgressBar()
}

window.onload = function () {
	loadProgress()
}
