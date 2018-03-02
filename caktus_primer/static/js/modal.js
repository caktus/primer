let clickEvents = ['click', 'mousedown', 'touchstart', 'dblclick']


class Modal {
    constructor(id) {
        this.name = 'Modal'
        this.options = {}
        this.container = document.getElementById(id) || null
        if (this.container) {
            this.openTarget = this.container.querySelector('[aria-label="open"]')
            this.dialogTarget = this.container.getElementsByTagName('dialog')[0]
            this.closeTarget = this.container.querySelector('[aria-label="close"]')
        }
        else {
            return
        }

        clickEvents.forEach((n) => (this.openTarget.addEventListener(n, (e) => { this.handleClick(e)})))
        
        clickEvents.forEach((n) => (this.closeTarget.addEventListener(n, (e) => { this.closeModal(e)})))
        
        document.addEventListener('keypress', (e) => { 
            // Escape key
            if (e.keyCode == 27) {
                this.closeModal(e) 
            }
        })
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

class LargeModal extends Modal {
    constructor(id) {
        super(id)
        this.options['size'] = '80%'
        this.name = 'LargeModal'
        this.dialogTarget.style.width = this.options['size']
    }
}

class MediumModal extends Modal {
    constructor(id) {
        super(id)
        this.options['size'] = '50%'
        this.name = 'MediumModal'
        this.dialogTarget.style.width = this.options['size']
    }
}

class SmallModal extends Modal {
    constructor(id) {
        super(id)
        this.options['size'] = '30%'
        this.name = 'MediumModal'
        this.dialogTarget.style.width = this.options['size']
    }
}