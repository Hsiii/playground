import React, { useEffect, useState } from 'react';

import 'components/MusicSection.css';

export default function MusicSection(props) {
    const [ratio, setRatio] = useState('');
    
    useEffect(() => {
        window.focus()
        window.addEventListener("blur", () => {
            setTimeout(() => {
                if (document.activeElement.tagName === "IFRAME") {
                    setRatio('wide');
                    setTimeout(() => {
                        setRatio('normal');
                    }, 414000);
                }
            }, 200);
        }, { once: true });
    })

    return (
        <section className={`music-section ${props.show ? '' : 'hide'}`} id='music_section'>
            <div className="wrap">
                <div className={`mask ${ratio}`}>
                    <iframe src="https://youtube.com/playlist?list=PLbHeq7kExSKqo47gwGIFDCziOFZkirDnA" frameborder="0" scrolling='no'/>
                </div>
            </div>
            <p className="text">(I have no idea how to make this responsive)</p>
        </section>
    );
}