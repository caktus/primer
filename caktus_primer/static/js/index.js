import {Modal} from "./modal"

// inserts modal exports into the window for the examples to user
Object.assign(window, {Modal})

module.exports = CaktusPrimer
function CaktusPrimer(){}

CaktusPrimer.prototype.categorySearchSelect = (function(){
	let selectWrap = document.getElementsByClassName('search-select')
	for (let el of selectWrap) {
		let selectElement = el.querySelector('select')
		// set initially to the selected value
		el.querySelector('.search-select-display').innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML
		// add event listener
		selectElement.addEventListener('change', function() {
			el.querySelector('.search-select-display').innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML
		})
	}
})()
