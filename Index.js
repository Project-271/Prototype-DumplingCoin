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
// Обработка нескольких касаний
document.querySelector('.mainСharacter').addEventListener('touchstart', function(event) {
    event.preventDefault(); 
    Array.from(event.touches).forEach(() => Count()); 
});