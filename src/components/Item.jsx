import React, { useEffect, useState } from 'react';

import 'components/Item.css';

export default function Item(props) {    
    const [dragging, setDragging] = useState(false);

    return (
        <div 
            className={`item ${dragging ? 'dragging' : ''}`} 
            draggable
            onDragStart={() => {setDragging(true)}}
            onDragEnd={() => {setDragging(false)}}
        >{props.content}</div>
    );
}