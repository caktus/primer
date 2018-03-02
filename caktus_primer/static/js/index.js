
export function categorySearchSelect(){
	let selectWrap = document.getElementsByClassName('search-select');
	for (let el of selectWrap) {
		let selectElement = el.querySelector('select')
		selectElement.addEventListener('change', function() {
			el.lastElementChild.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML
		});
	}
};