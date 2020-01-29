import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {
        deviceOrientation: {
            absolute: 0,
            alpha: 0,
            beta: 0,
            gamma: 0
        }
    }

    componentDidMount() {
        window.addEventListener("deviceorientation", this.handleOrientation);
    }

    componentWillUnmount() {
        window.removeEventListener("deviceorientation");
    }

    handleOrientation = (event) => {

        const deviceOrientation = {
            ...this.state.deviceOrientation
        }

        deviceOrientation.absolute = event.absolute;
        deviceOrientation.alpha = event.alpha;
        deviceOrientation.beta = event.beta;
        deviceOrientation.gamma = event.gamma;

        console.log(deviceOrientation);
        
        this.setState({
            deviceOrientation: deviceOrientation
        });

    }

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Absolute: {this.state.deviceOrientation.absolute}</p>
                    <p>Absolute: {this.state.deviceOrientation.alpha}</p>
                    <p>Absolute: {this.state.deviceOrientation.beta}</p>
                    <p>Absolute: {this.state.deviceOrientation.gamma}</p>
                </header>
            </div>
        );
    }
    
}

export default App;
