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

	return countMoney
}

// ======= Функция увеличения значения клика =======
function increaseClickValue() {
	if (countMoney >= improvement_1Price) {
		click += 1
		countMoney -= improvement_1Price
		improvement_1Price *= 3

		document.getElementById('Count').innerText = countMoney
		document.getElementById('improvment_1Prise_increaseClickValue').innerText =
			improvement_1Price
		alert(`Бустер активирован! Теперь каждый клик добавляет ${click}.`)
	} else {
		alert('Недостаточно средств! Продолжай кликать...')
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
