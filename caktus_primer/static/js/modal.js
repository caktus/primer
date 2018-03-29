let clickEvents = ['click', 'mousedown', 'touchstart', 'dblclick']
let sizeMap = {'small': '30%', 'medium': '50%', 'large': '80%'}

class Modal {
    constructor(id, size = 'medium') {
        this.name = 'Modal'
        this.container = document.getElementById(id)
        if (this.container) {
            this.openTarget = this.container.querySelector('[aria-label="open"]')
            this.dialogTarget = this.container.getElementsByTagName('dialog')[0]
            this.dialogTarget.style.width = sizeMap[size] // set the size of the modal; default to 'medium' size
            this.closeTarget = this.container.querySelector('[aria-label="close"]')

            // Attach event listeners to our click events to handle opening and closing the modal window
            clickEvents.forEach((n) => {
                this.openTarget.addEventListener(n, (e) => { this.handleClick(e) })
                this.closeTarget.addEventListener(n, (e) => { this.closeModal(e) })
            })
            
            document.addEventListener('keypress', (e) => { 
                // Escape key
                if (e.keyCode == 27) {
                    this.closeModal(e) 
                }
            })
        }
        else {
            return
        }
    }

    handleClick() {
        this.dialogTarget.showModal()
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.dialogTarget.close()
        document.body.style.overflow = '';
    }
}
