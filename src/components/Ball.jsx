import React, { useEffect, useState } from 'react';

import 'components/Ball.css';

export default function Ball(props) {
    const [coord, setCoord] = useState({ x: 0, y: 0, z: 0 });
    const [activeKeys, setActiveKeys] = useState({w: false, a: false, s: false, d: false});

    const move = {
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 }
    };

    const toGrid = c => {
        return {x: Math.round(c.x / 2) + 3, y: Math.round(c.y / 2) + 3};
    };

    const isOut = g => (g.x > 6 || g.x < 0 || g.y > 6 || g.y < 0);

    const getNextCoord = (coord, speed) => {
        let nextCoord = coord;
        const keyNum = Object.values(activeKeys).filter(t => t).length;
        Object.keys(activeKeys).forEach(key => {
            if (activeKeys[key]) {
                nextCoord.x += move[key].x * speed / (keyNum === 2 ? Math.sqrt(2) : 1);
                nextCoord.y += move[key].y * speed / (keyNum === 2 ? Math.sqrt(2) : 1);
            }
        });
        const grid = toGrid(nextCoord);
        nextCoord.z = isOut(grid) ? 0 : props.heightData[grid.x][grid.y];
        return {...nextCoord};
    }

    const handleKeyDown = e => {
        if (move[e.key]) {
            setActiveKeys(k => ({
                ...k,
                [e.key]: true
            }));
        }
    };

    const handleKeyUp = e => {
        if (move[e.key]) {
            setActiveKeys(k => ({
                ...k,
                [e.key]: false
            }));
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, []);

    useEffect(() => {
        const grid = toGrid(coord);
        props.updateGrid({x: grid.x, y: grid.y});
        const nextGrid = toGrid(getNextCoord(coord, .3));
        if ((grid.x != nextGrid.x || grid.y != nextGrid.y) && !isOut(nextGrid))
            props.updateNextGrid(nextGrid);
        else
            props.updateNextGrid(undefined);
    }, [coord]);

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setCoord(c => getNextCoord(c, .1));
        }, 16);
        return () => {clearInterval(moveInterval)};
    },[coord]);

    return (
        <div 
            className='ball' 
            style={{
                '--x': coord.x + 'em',
                '--y': coord.y + 'em',
                '--z': coord.z + 'em',
            }}
        >
            <div 
                className="circle" 
                style={{
                    '--deg': props.deg * -1 + 'deg'
                }}
            />
        </div>
    );
}