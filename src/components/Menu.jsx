import React, { useEffect, useState } from 'react';

import 'components/Menu.css';

export default function Menu(props) {
    const [expand, setExpend] = useState(false);
    const [hover, setHover] = useState(false);

    return <>
        <nav 
            className={`menu-toggle ${expand ? 'expand' : ''}`} 
            onClick={() => setExpend(e => !e)}
            style={{'--sectionNum': props.sections.length}}
        >
            <div className="bar" style={{'--i':-1}}/>
            <div className="bar" style={{'--i': 0}}/>
            <div className="bar" style={{'--i': 1}}/>
            <div className="bar" style={{'--i': 0}}/>
            <div className="bar" style={{'--i': 0}}/>
            <span>Section</span>
            <div className="menu">
                {
                    props.sections.map(s => 
                        <a 
                            className="section-nav" 
                            onClick={() => setExpend(e => !e)}
                            href={`#${s}_section`}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </a>
                    )
                }
                <div 
                    className={'to-top'} 
                    onClick={() => scrollTo(0, 0)}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    Top <ion-icon name={hover ? "arrow-up-circle" : "arrow-up-circle-outline"}/>
                </div>
            </div>
        </nav>
    </>;
}