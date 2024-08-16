let countMoney = 0

function Count() {
  if (countMoney < 1000) {
		countMoney += 1
		document.getElementById('Count').innerText = `Счетчик YarikOFF = ${countMoney}`
	} 
  else if (countMoney <= 100) {
		document.getElementById('Count').innerText = 'Максимальный Лимит YarikOFF 1000'
	}
  return countMoney
}

function Turbo2x(){
  if (countMoney < 1000 && countMoney*2 <= 1000) {
		countMoney *= 2
    document.getElementById('Count').innerText = `Счетчик YarikOFF = ${countMoney}`
	}
  else if(countMoney <=100){
    document.getElementById('Count').innerText = "Лимит очков 100"
  }
  return countMoney
}

function countclear(){
  countMoney = 0
  document.getElementById('Count').innerText = `Счетчик YarikOFF = ${countMoney}`
}
