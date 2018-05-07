import {Modal} from "./modal"
import * as dropdowns from './dropdown.js'

export const Dropdown = dropdowns.Dropdown

// inserts modal exports into the window for the examples to user
Object.assign(window, {Modal})


window.CaktusPrimer = {
    categorySearchSelect: () => {
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
    }
}
