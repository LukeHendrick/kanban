import React, {Component} from 'react';


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        let value = e.target.value;
        this.setState({ item: value })
    }

    handleSubmit(e) {
        e.preventDefault()
        fetch(`/api/search?board=${this.state.item}`)
            .then((res) => res.json())
            .then((data) => {
                this.props.setLocal(data)
            })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="boardSearch">Board Search</label>
                    <input name="boardSearch" onChange={this.handleChange} value={this.state.item} />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}