import React, { useState } from 'react';

import 'components/Box.css';

export default function Box(props) {
    const [z, setZ] = useState(5);
    const [rising, setRising] = useState(false);

    const handleRise = () => {
        if (rising) return;
        else {
            setRising(true);
            const rise = setInterval(() => {
                setZ(_z => {
                    props.updateHeight(props.x, props.y, _z - .2);
                    return _z - .2;
                });
            }, 100);
            setTimeout(() => {
                clearInterval(rise);
                setTimeout(() => {
                    const drop = setInterval(() => {
                        setZ(_z => {
                            props.updateHeight(props.x, props.y, _z + .2);
                            return _z + .2;
                        });
                    }, 100);
                    setTimeout(() => {
                        clearInterval(drop);
                        setRising(false);
                    }, 1000)
                }, 1000);
            }, 1000);
        }
    }

    return (
        <div 
            className={
                `box ${
                    props.grid.x == props.x && 
                    props.grid.y == props.y &&
                'pressed'} ${
                    props.nextGrid && 
                    props.nextGrid.x == props.x && 
                    props.nextGrid.y == props.y &&
                'next'}`
            } 
            style={{
                '--x': props.x, 
                '--y': props.y, 
                '--z': z
            }}
        >
            <div className="top" onMouseEnter={handleRise}>
                {/*(5 - z).toPrecision(2)*/}
            </div>
            <div className="side" style={{'--i': 0}}/>
            <div className="side" style={{'--i': 1}}/>
            <div className="side" style={{'--i': 2}}/>
            <div className="side" style={{'--i': 3}}/>
        </div>
    );
}