import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap'


export default class App extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Hello and thanks for downloading this boilerplate!</h1>
                    <h3>Start by editing './src/components/App.js'...</h3>
                    <p>Styles are available in './src/styles.css'</p>
                </Jumbotron>
            </div>
        )
    }
}