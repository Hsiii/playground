import React, { useState } from 'react';

import Item from 'components/Item.jsx';

import 'components/ItemContainer.css';

export default function ItemContainer(props) {
    const [child, setChild] = useState(props.child.map(c => <Item content={c}/>));
    // const child = props.child.map(c => <Item content={c}/>);
    // console.log(child);
    // const getAfter = () => {
    //     child.reduce((closest, _child) => {
    //         const rect = _child.getBoundingClientRect();
    //         const offset = y - rect.top - rect.height / 2;
    //         if (offset < 0 && offset . closest.offset) {
    //             return {offset: offset, element: _child}
    //         }
    //         else {
    //             return closest;
    //         }
    //     }, {offset: Number.POSITIVE_INFINITY})
    // };

    return (
        <div
            className='item-container' onDragOver={
                e => {
                    // e.preventDefault();
                    // const drag = document.querySelector('.dragging');
                    // setChild(c => [...c, drag]);
                    // const after = getAfter(e.clientY);
                }
        }>
            {child.map(c => c)}
        </div>
    );
}   