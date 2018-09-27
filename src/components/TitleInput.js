import React, {Component} from 'react'


export default class  extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            title: this.props.title
        }

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        value = e.target.value;
        this.setState({title: value})
    }
    render() {
        return (
            <input onChange={this.handleChange} value={this.state.title}/>
        )
    }
}