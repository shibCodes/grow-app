import React from 'react';
import './Butt.css';

const butt = (props) => {

    return (
        //<div className="Person" style={style}>
        <div>
            <div className="Butt butt-outer-light" style={{ boxShadow: props.outerLight.boxShadow}}>
                <div className="butt-inside butt-outer-dark" style={{ boxShadow: props.outerDark.boxShadow }}></div>
                <div className="butt-inside butt-inner-light" style={{ boxShadow: props.innerLight.boxShadow }}></div>
                <div className="butt-inside butt-inner-dark" style={{ boxShadow: props.innerDark.boxShadow }}>{props.title}</div>
            </div>
            <p>{props.outerLight.boxShadow}</p>
        </div>
        
    )
};

export default butt;
