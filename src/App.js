import React, { Component } from 'react';
import './App.css';
import Butt from './Butt/Butt';

class App extends Component {

    state = {
        shadowPositions: {
            outerLight: {
                x: -10,
                y: -5,
                blur: 10,
                spread: 0,
                inset: false,
                rgba: "rgba(255,215,47,0.68)",
                style: { boxShadow: "-10px -5px 10px 0px rgba(255,215,47,0.68)" }
            },
            outerDark: {
                x: 10,
                y: 5,
                blur: 10,
                spread: 0,
                inset: false,
                rgba: "rgba(174,141,0,0.39)",
                style: { boxShadow: "10px 5px 10px 0px rgba(174,141,0,0.39)" }
            },
            innerLight: {
                x: -3,
                y: -3,
                blur: 3,
                spread: 0,
                inset: true,
                rgba: "rgba(255,215,47,0.35)",
                style: { boxShadow: "inset -3px -3px 3px 0px rgba(255,215,47,0.35)" }
            },
            innerDark: {
                x: 3,
                y: 3,
                blur: 3,
                spread: 0,
                inset: true,
                rgba: "rgba(174,141,0,0.1)",
                style: { boxShadow: "inset 3px 3px 3px 0px rgba(174,141,0,0.1)" }
            }
        }
    }

    componentDidMount() {

        alert("mounted!");

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", this.handleOrientation, true);
        }
        else {
            alert("lol no");
        }

    }

    componentWillUnmount() {
        window.removeEventListener("deviceorientation");
    }

    handleOrientation = (event) => {

        alert("yes");

        let leftToRight = event.gamma;
        let frontToBack = event.beta;

        let x = leftToRight / 2;
        let y = frontToBack / 2;

        const outerLight = {
            ...this.state.shadowPositions.outerLight
        }

        const outerDark = {
            ...this.state.shadowPositions.outerDark
        }

        const innerLight = {
            ...this.state.shadowPositions.innerLight
        }

        const innerDark = {
            ...this.state.shadowPositions.innerDark
        }

        outerLight.x = outerLight.x - x;
        outerLight.y = outerLight.y - y; 
        outerDark.x = outerDark.x + x;
        outerDark.y = outerDark.y + y;
        innerLight.x = innerLight.x - x;
        innerLight.y = innerLight.y - y;
        innerDark.x = innerDark.x + x;
        innerDark.y = innerDark.y + y;

        outerLight.style.boxShadow = this.calculateStyle(outerLight);
        outerDark.style.boxShadow = this.calculateStyle(outerDark);
        innerLight.style.boxShadow = this.calculateStyle(innerLight);
        innerDark.style.boxShadow = this.calculateStyle(innerDark);

        
       
        this.setState({
            shadowPositions: {
                outerLight: outerLight,
                outerDark: outerDark,
                innerLight: innerLight,
                innerDark: innerDark
            }
        });

    }

    calculateStyle = (element) => {

        let style = element.x + "px " + element.y + "px " + element.blur + "px " + element.spread + "px " + element.rgba;

        if (element.inset) { style = "inset " + style; }

        return style;

    }

    render() {

        return (
            <div className="App">
                <Butt 
                    title="let's grow"
                    outerLight={this.state.shadowPositions.outerLight.style}
                    outerDark={this.state.shadowPositions.outerDark.style}
                    innerLight={this.state.shadowPositions.innerLight.style}
                    innerDark={this.state.shadowPositions.innerDark.style}></Butt>
    <p>{ this.state.shadowPositions.outerDark.style.boxShadow }</p>
            </div>
        );
    }
    
}

export default App;
