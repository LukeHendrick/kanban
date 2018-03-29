import React, { Component } from 'react';
import Home from './Home';
import Board from './Board'
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
        }
        this.setLocal= this.setLocal.bind(this);
    }
    componentDidMount() {
        let board = localStorage.getItem('board')
        if (board) {
            this.setState({loaded: true})
        }
    }

    setLocal(board) {
        localStorage.setItem('board', JSON.stringify(board))
        this.setState({loaded: true})
    }

    render() {
        if (this.state.loaded) {
            return (
                <Board />
            )
        } else {
            return(
                <Home setLocal={this.setLocal}/>
            )
        }
    }
}
