import React, { useEffect, useState } from 'react';

import Cover from 'components/Cover.jsx';
import CubeSection from 'components/CubeSection.jsx';
import BallSection from 'components/BallSection.jsx';
import Menu from 'components/Menu.jsx';
import MusicSection from 'components/MusicSection.jsx';

import setLinks from 'utils/link.jsx';
import 'utils/colorPalette.css';

import 'components/Main.css';

export default function Main(props) {
    const [showMusicSection, setShowMusicSection] = useState(true);

    const handleResize = () => 
        setShowMusicSection(
            screen.availWidth == window.outerWidth &&
            screen.availHeight == window.outerHeight
        );

    useEffect(() => {
        setLinks();
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [sections, setSections] = useState(['cube', 'music', 'ball']);

    useEffect(() => {
        setSections(showMusicSection ? ['cube', 'music', 'ball'] : ['cube', 'ball']);
    }, [showMusicSection])

    return <>
        <main>
            <Cover showMusic={showMusicSection}/>

            <div className='sections'>
                <CubeSection/>
                <MusicSection show={showMusicSection}/>
                {/* <DragAndDrop/> */}
                <BallSection/>

                <div className='menu-container'>
                    <Menu sections={sections}/>
                </div>
            </div>
        </main>
        <footer>
            <a href="http://www.freepik.com">
                Cover image designed by pikisuperstar / Freepik
            </a>
        </footer>
    </>
}