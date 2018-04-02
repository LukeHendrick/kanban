import React, {Component} from 'react'

const getModalStyle = (modalDisplay) => ({
    display: modalDisplay,
    background: 'rgba(192,192,192,.75)',
    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top:'50%',
    left: '50%',
    height: 'auto',
    width: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
})
export default class  extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let title = this.state.title;
        let content = this.state.content;
        this.props.addNote(title, content);
    }

    handleChange(e) {
        let value = e.target.value;
        let newState = {};
        newState[e.target.name] = e.target.value;
        console.log(newState);
        this.setState(newState);
    }

    
    render() {
        console.log(this.state);
        return (
            <div style={getModalStyle(this.props.display)}>
                <h1>Add A New Note</h1>
                <form name="newNote" onSubmit={this.handleSubmit} >
                    <label htmlFor="title">Title:</label>
                    <input name="title" value={this.state.title} onChange={this.handleChange} />
                    <label htmlFor="content">Content:</label>
                    <input name="content" value={this.state.content} onChange={this.handleChange} />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}