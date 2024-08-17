let countMoney = 0
let click = 1
let improvement_1Price = 100
// Делаем примитивное прибавление +1 за клик
function Count() {
	if (countMoney < 1000) {
		countMoney += click
		document.getElementById('Count').innerText = `Счетчик = ${countMoney}`
		return countMoney
	}
}
// Добавляем покупку скилла +1 к основному клику, с каждым улучшением цена увеличивается в 10 раз
function increaseClickValue() {
	if (countMoney >= improvement_1Price) {
		click += 1
		countMoney -= improvement_1Price
		improvement_1Price *= 10
		document.getElementById('Count').innerText = `Счетчик = ${countMoney}`
		document.getElementById('improvment_1Prise_increaseClickValue').innerText = improvement_1Price
		alert(`Бустер активирован! Теперь каждый клик добавляет ${click}.`)
	} else {
		alert('Недостаточно средств! Продолжай кликать...')
	}
}
// Обработка множественных касаний
document.querySelector('.mainСharacter').addEventListener('touchstart', function(event) {
    event.preventDefault();
    for (let i = 0; i < event.touches.length; i++) {
        Count();
    }
}, { passive: true });

// Анимация при клике
function pressAndMoveButton(button) {
	button.classList.add('press-move')
	setTimeout(function () {
		button.classList.remove('press-move')
	}, 300) 
}
// + click улетает
 // Функция для отображения летающих чисел
  function handleClick(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top;  

    // Создаем элемент для числа
    const numberElement = document.createElement('div');
    numberElement.className = 'floating-number';
    numberElement.innerText = `+${click}`;
    numberElement.style.left = `${x}px`;
    numberElement.style.top = `${y}px`;

    // Добавляем элемент в кнопку
    button.appendChild(numberElement);

    // Удаляем элемент после завершения анимации
    setTimeout(() => {
      numberElement.remove();
    }, 1000);
  }