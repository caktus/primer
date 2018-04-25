import React from 'react'
import ReactDOM from 'react-dom'

let KEY_ENTER = 13
let KEY_UP = 38
let KEY_DOWN = 40

class If extends React.Component {
    render() {
        if (this.props.true) {
            if (typeof(this.props.children) === "string") {
                return <span>{this.props.children}</span>
            }
            return this.props.children || null
        } else {
            return null
        }
    }
}

export class Dropdown extends React.Component {
    constructor() {
        super()
        this.state = {
            expanded: false,
            focus: false,
            selected: -1,
        }
        this.handleEventOutside = this.handleEventOutside.bind(this)
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
        if (ev) {
            ev.preventDefault()
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    componentDidMount() {
        ['mousedown', 'keydown'].forEach((event) => 
            document.addEventListener(event, this.handleEventOutside)
        )
    }
    componentWillUnmount() {
        ['mousedown', 'keydown'].forEach((event) => 
            document.removeEventListener(event, this.handleEventOutside)
        )
    }

    handleEventOutside(event) {
        if (event.type === 'mousedown') {
            if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                this.setState({expanded: false})
            }
        } else if (event.type === 'keydown') {
            if (event.key === 'Escape') {
                this.setState({expanded: false})
            }
        }
    }

    followLink() {
        let link = this.props.children[this.state.selected].props.href
        window.location.href = link
        this.setState({expanded: false})
    }

    key(ev) {
        let selected = this.state.selected
        switch (ev.keyCode) {
            case KEY_UP:
                selected = this.state.selected - 1
                break
            case KEY_DOWN:
                selected = this.state.selected + 1
                break
            case KEY_ENTER:
                try {
                    this.followLink()
                } catch (e) {
                }
                this.toggle()
                break

            default:
                return
        }

        // -1 allows you to move up back to the button to close it with [ENTER]
        selected = Math.max(-1, selected)
        selected = Math.min(selected, this.props.children.length - 1)
        this.setState({selected})
        ev.preventDefault()
    }

    render() {
        var className = this.getClass()
        var index = this.state.selected

        var options = this.props.children.map((el, i)=> {
            let className = ""
            if (i == index) className = "selected"
            return (
                <li key={i} className={className}
                    onMouseUp={() => this.followLink()}
                    onMouseEnter={() => this.setState({selected: i})}
                >{el}</li>
            )
        })

        return (
            <span className="primer-dropdown" ariaExpanded={this.state.expanded} ariaHaspopup="true"
                onKeyDown={(ev)=>this.key(ev)}
                ref={this.setWrapperRef}
            >
                <button onClick={()=>this.toggle()}>{this.props.label}</button>
                <If true={this.state.expanded}>
                    <ul className={className}
                        >{options}</ul>
                </If>
            </span>
        )
    }
}