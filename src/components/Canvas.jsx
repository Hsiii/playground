import React from 'react';
import useCanvas from 'utils/useCanvas.jsx';

export default function Canvas(props) {  
    const { draw, ...rest } = props;
    const ref = useCanvas(draw);

    return <canvas ref={ref} {...rest}/>;
}