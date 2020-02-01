import React, { Component } from 'react';
import './App.css';
import Butt from './Butt/Butt';

class App extends Component {

    state = {
        shadowPositions: {
            outerLight: {
                baseX: -10,
                baseY: -5,
                x: -10,
                y: -5,
                blur: 10,
                spread: 0,
                inset: false,
                rgba: "rgba(255,215,47,0.68)",
                style: { boxShadow: "-10px -5px 10px 0px rgba(255,215,47,0.68)" }
            },
            outerDark: {
                baseX: 10,
                baseY: 5,
                x: 10,
                y: 5,
                blur: 10,
                spread: 0,
                inset: false,
                rgba: "rgba(174,141,0,0.39)",
                style: { boxShadow: "10px 5px 10px 0px rgba(174,141,0,0.39)" }
            },
            innerLight: {
                baseX: -3,
                baseY: -3,
                x: -3,
                y: -3,
                blur: 3,
                spread: 0,
                inset: true,
                rgba: "rgba(255,215,47,0.35)",
                style: { boxShadow: "inset -3px -3px 3px 0px rgba(255,215,47,0.35)" }
            },
            innerDark: {
                baseX: 3,
                baseY: 3,
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

        
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", this.handleOrientation, true);
        }
        else {
            //alert("lol device orientation doesn't exist");
        }

    }

    componentWillUnmount() {
        window.removeEventListener("deviceorientation");
    }

    askPermissions = () => {
        //alert("yooo");
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            window.DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response === 'granted') {
                        window.addEventListener("deviceorientation", this.handleOrientation, true);
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }

    handleOrientation = (event) => {

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

        outerLight.x = outerLight.baseX - x;
        outerLight.y = outerLight.baseY - y; 
        outerDark.x = outerDark.baseX + x;
        outerDark.y = outerDark.baseY + y;
        innerLight.x = innerLight.baseX - x;
        innerLight.y = innerLight.baseY - y;
        innerDark.x = innerDark.baseX + x;
        innerDark.y = innerDark.baseY + y; 

        outerLight.y = this.checkBoundaries(outerLight);
        outerDark.y = this.checkBoundaries(outerDark);
        innerLight.y = this.checkBoundaries(innerLight);
        innerDark.y = this.checkBoundaries(innerDark);

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

    checkBoundaries = (element) => {

        let value = element.y;

        if (element.baseY < 0 && element.y < element.baseY) {
            value = element.baseY;
        }
        else if (element.baseY > 0 && element.y > element.baseY) {
            value = element.baseY;
        }
        
        return value;

    }

    calculateStyle = (element) => {

        let style = element.x + "px " + element.y + "px " + element.blur + "px " + element.spread + "px " + element.rgba;

        if (element.inset) { style = "inset " + style; }

        return style;

    }

    render() {

        return (
            <div className="App" onClick={this.askPermissions}>
                <Butt 
                    title="let's grow"
                    outerLight={this.state.shadowPositions.outerLight.style}
                    outerDark={this.state.shadowPositions.outerDark.style}
                    innerLight={this.state.shadowPositions.innerLight.style}
                    innerDark={this.state.shadowPositions.innerDark.style}></Butt>
            </div>
        );
    }
    
}

export default App;
