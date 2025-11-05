import React, { useEffect, useState } from 'react';

import Box from 'components/Box.jsx';
import Ball from 'components/Ball.jsx';

import 'components/BallSection.css';

export default function BallSection(props) {
    const [deg, setDeg] = useState(45);

    const [right, setRight] = useState(false);
    const [keepRight, setKeepRight] = useState(false);
    const [left, setLeft] = useState(false);
    const [keepLeft, setKeepLeft] = useState(false);

    const [grid, setGrid] = useState({ x: 3, y: 3 });
    const [nextGrid, setNextGrid] = useState(undefined);

    const [heightData, setHeightData] = useState(
        Array.from({ length: 7 }, () => Array(7).fill(0))
    );

    const gridArray = Array.from(
        {length: 7}, (_, i) => Array.from(
            {length: 7}, (_, j) => [i, j])
    ).flat();

    const updateHeight = (x, y, z) => {
        const temp = [...heightData];
        temp[x][y] = 5 - z;
        setHeightData(temp);
    };

    useEffect(() => {
        let rightTurn, leftTurn;
        if (keepRight) {
            rightTurn = setInterval(() => {
                setDeg(d => d + .45);
            }, 10);
        }
        else if (right) {
            rightTurn = setInterval(() => {
                setDeg(d => d + .25);
            }, 10);
        }
        if (keepLeft) {
            leftTurn = setInterval(() => {
                setDeg(d => d - .45);
            }, 10);
        }
        else if (left) {
            leftTurn = setInterval(() => {
                setDeg(d => d - .25);
            }, 10);
        }
        return () => {
            clearInterval(rightTurn);
            clearInterval(leftTurn);
        }
    }, [right, left, keepRight, keepLeft])

    return (
        <section className='ball-section' id='ball_section'>

            <div 
                className={`scroll-right ${keepRight && 'keep'}`} 
                onMouseEnter={() => setRight(true)} 
                onMouseLeave={() => setRight(false)} 
                onClick={() => {setKeepRight(r => !r), setKeepLeft(false);}}
            >
                <i className='fas fa-angle-double-down'></i>
            </div>

            <div 
                className={`scroll-left ${keepLeft && 'keep'}`} 
                onMouseEnter={() => setLeft(true)} 
                onMouseLeave={() => setLeft(false)} 
                onClick={() => {setKeepLeft(l => !l), setKeepRight(false);}}
            >
                <i className='fas fa-angle-double-down'></i>
            </div>

            <div className='scene' style={{'--deg': deg + 'deg'}}>
                <Ball 
                    deg={deg} 
                    heightData={heightData} 
                    updateGrid={setGrid} 
                    updateNextGrid={setNextGrid}
                />
                <div className="floor"/>
                {gridArray.map(c => 
                    <Box 
                        key={c[0]*10+c[1]} 
                        x={c[0]} y={c[1]} 
                        updateHeight={updateHeight} 
                        grid={grid} nextGrid={nextGrid}
                    />
                )}
            </div>
        </section>
    );
}