import React, { useEffect, useRef } from 'react';

import CubeMenu from 'components/CubeMenu.jsx';

import 'components/CubeSection.css';

export default function CubeSection(props) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting)
                entry.target.classList.add('show');
        });
    }, {rootMargin: '-20%'});

    const title = useRef(null);
    const text = useRef(null);
    useEffect(() => {
        observer.observe(title.current);
        observer.observe(text.current);
    }, [title, text])

    return (
        <section className='cube-section' id='cube_section'>
            <h1 ref={title}>The cube of social media</h1>
            <p ref={text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, aliquid! Laborum quae quidem nam quis quas odio perferendis maxime harum facilis doloremque, mollitia ratione. Culpa qui exercitationem placeat modi voluptatum?ß</p>
            <div className="cube-wrap">
                <CubeMenu/>
            </div>
        </section>
    );
}