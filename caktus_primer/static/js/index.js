import React from 'react'
import ReactDOM from 'react-dom'

var KEY_UP = 38
var KEY_DOWN = 40

export class Dropdown extends React.Component {
    constructor() {
        super()
        this.state = {
            expanded: false,
            focus: false,
            selected: -1,
        }
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.setWrapperRef = this.setWrapperRef.bind(this)
    }

    getClass() {
        if (this.state.expanded) {
            return "expanded"
        } else {
            return "not-expanded"
        }
    }

    toggle(ev) {
        this.setState({expanded: !this.state.expanded})
        ev.preventDefault()
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({expanded: false})
        }
    }

    key(ev) {
        switch (ev.keyCode) {
            case KEY_UP:
                this.setState({selected: this.state.selected - 1})
                break
            case KEY_DOWN:
                this.setState({selected: this.state.selected + 1})
                break
            case 13:
                // ????

            default:
                return
        }
        ev.preventDefault()
    }

    render() {
        var className = this.getClass()
        var index = this.state.selected

        console.log(this.curLink)

        var options = this.props.children.map((el, i)=> {
            let className = ""
            if (i == index) className = "selected"
            return (
                <li key={i} className={className} >{
                    React.cloneElement(el, {
                        "ref": (el) => {
                            if (i == index) this.curLink = el
                        }
                    })
                }</li>
            )
        })

        return (
            <div className="primer-dropdown" ariaExpanded="false" ariaHaspopup="true"
                onKeyDown={(ev)=>this.key(ev)}
                ref={this.setWrapperRef}
            >
                <button onClick={()=>this.toggle()}>{this.props.label}</button>
                {this.state.expanded ?
                <ul className={className}>
                    {options}
                </ul>
                :null}
            </div>
        )
    }
}