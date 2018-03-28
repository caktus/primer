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
        if (ev) {
            ev.preventDefault()
        }
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

    render() {
        var className = this.getClass()
        var index = this.state.selected

        var options = this.props.children.map((el, i)=> {
            let className = ""
            if (i == index) className = "selected"
            return (
                <li key={i} className={className} onMouseUp={this.handleClickOutside}>{el}</li>
            )
        })

        return (
            <div className="primer-dropdown" ariaExpanded={this.state.expanded} ariaHaspopup="true"
                onKeyDown={(ev)=>this.key(ev)}
            >
                <button onClick={()=>this.toggle()}>{this.props.label}</button>
                <If true={this.state.expanded}>
                    <ul className={className} ref={this.setWrapperRef}>{options}</ul>
                </If>
            </div>
        )
    }
}