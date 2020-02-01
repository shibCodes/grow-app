import React from 'react';
import './Butt.css';

const butt = (props) => {

    return (
        //<div className="Person" style={style}>
        <div className="Butt butt-outer-light" style={props.outerLight}>
            <div className="butt-inside butt-outer-dark" style={props.outerDark}></div>
            <div className="butt-inside butt-inner-light" style={props.innerLight}></div>
            <div className="butt-inside butt-inner-dark" style={props.innerDark}>{props.title}</div>
        </div>
    )
};

export default butt;
