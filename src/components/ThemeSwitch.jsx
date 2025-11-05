import React, { useEffect, useState } from 'react';

import 'components/ThemeSwitch.css';

export default function ThemeSwitch(props) {
    const colors = [
        {name:'red', colorCode: 'hsl(0, 72%, 68%)'},
        {name:'green', colorCode: 'hsl(153, 52%, 83%)'}, 
        {name:'blue', colorCode: 'hsl(211, 69%, 73%)'}, 
        {name:'purple', colorCode: 'hsl(275, 72%, 68%)'}, 
        {name:'dark', colorCode: 'hsl(217, 10%, 27%)'},
    ];

    const setTheme = theme => {
        localStorage.setItem('theme', theme);
        setCurrentTheme(theme);
    }

    const [currentTheme, setCurrentTheme] = useState('purple');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme)
            setCurrentTheme(savedTheme);
    }, []);

    return (
        <section className={`theme-switch ${props.show ? '' : 'hide'}`}>
            <div className="indicator">
                <i className="fa-solid fa-palette"/>
            </div>
            <form action="">
                {colors.map(c => 
                    c.name == currentTheme ? 
                        <input type="radio" name='theme' id={c.name} style={{'--clr': c.colorCode}} onClick={() => setTheme(c.name)} checked/>
                        : <input type="radio" name='theme' id={c.name} style={{'--clr': c.colorCode}} onClick={() => setTheme(c.name)}/>
                )}
            </form>
        </section>
    );
}