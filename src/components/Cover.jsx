import React, {useEffect, useState, useRef} from 'react';

import Links from 'components/Links.jsx';
import ThemeSwitch from 'components/ThemeSwitch.jsx';

import 'components/Cover.css'

export default function Cover(props) {
    const mtMid = useRef(null);
    const mtBack = useRef(null);
    const input = useRef(null);
    
    const dateData = new Date();
    const time = dateData.getHours() + ':' + dateData.getMinutes().toString().padStart(2, '0');
    const date = dateData.getMonth() + 1 + '/' + dateData.getDate();

    const [toggle, setToggle] = useState(false);
    const [showLinks, setShowLinks] = useState(true);

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleScroll = () => {
        setTransform(mtBack, 0.6, 0); 
        setTransform(mtMid, 0.5, 0.2);
        setShowLinks(window.scrollY == 0);
    }

    const setTransform = (el, tr, sc) => {
        el.current.style.translate = `0 ${(tr * window.scrollY)}px`;
        el.current.style.scale = `1 ${(600 - (sc * window.scrollY)) / 600}`;
    }

    const handleKeyDown = e => {
        if (e.key == ' ') 
            input.current.focus();
    };

    return (
        <section className='cover'>
            <div className="img-wrap">
                <div className='sky'/>
                <img src="images/mountain/back.png" ref={mtBack}/>
                <img src="images/mountain/mid.png" ref={mtMid}/>
                <img src="images/mountain/front.png"/>
            </div>

            <div className="title" onClick={() => setToggle(t => !t)}>
                {toggle ? date : time}
            </div>
            
            <div class="search">
                <form method="get" action="https://www.google.com/search">
                    <input 
                        type="text" name="q" 
                        placeholder="Search..." 
                        autoComplete='off' 
                        class="search-input" 
                        ref={input}
                    />
                    <button><i class="fa fa-search"/></button>
                </form>
            </div>

            <Links show={showLinks}/>

            <ThemeSwitch show={showLinks}/>

            <a className={`scroll-down ${showLinks ? '' : 'hide'}`} href={props.showMusic ? '#music_section' : '#cube_section'}>
                <i className='fas fa-angle-down'/>
            </a>

            <div className="grad"/>
        </section>
    );
}