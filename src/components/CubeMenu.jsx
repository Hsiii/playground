import React, {useState, useEffect} from 'react';

import 'components/CubeMenu.css';

export default function CubeMenu(props) {
    const pixiv = React.createRef();

    const [deg, setDeg] = useState(-45);
    const [rotateDeg, setRotateDeg] = useState(0);
    const [vel, setVel] = useState(0);
    const [fontSize, setFontSize] = useState(2);
    const [pixivColor, setPixivColor] = useState(['#ddd', '#ddd']);

    useEffect(() => {
        const spin = setInterval(() => {
            setDeg(d => d - 2);
            setVel(v => Math.max(0, v - 2));
        }, 100);
        const stop = setInterval(() => {
            setVel(v => v > 100 ? v : 0);
        }, 1000)
        return () => {clearInterval(spin)};
    }, []);

    const spinRotate = (_deg) => {
        clearTimeout(stopEnlarge);
        setRotateDeg(rotateDeg + _deg);
        setFontSize(5);
        const stopEnlarge = setTimeout(
            () => setFontSize(2),
            200
        );
    }

    return (
        <div className={`cube-menu ${vel > 250 && 'shine'}`} style={{'--cube_rotate': deg + 'deg', '--rotate': rotateDeg + 'deg'}}>
            <div className="top" style={{fontSize: fontSize + 'rem'}} onClick={() => {setDeg(deg - 180), setVel(v => Math.min(v + 10, 260)), spinRotate(360);}}>
                <ion-icon name="refresh-outline"></ion-icon>
                <ion-icon name="refresh-outline"></ion-icon>
            </div>
            <div className="sides">
                <a className="side" style={{'--i':0}} id="Facebook_cube">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a className="side" style={{'--i':1}} id="Messeneger_cube">
                    <i className='fab fa-facebook-messenger'></i>
                    <i className='fab fa-facebook-messenger'></i>
                    <i className='fab fa-facebook-messenger'></i>
                </a>
                <a className="side" style={{'--i':2}} id="Twitter_cube">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a 
                    className="side" style={{'--i':3}} id="Pixiv_cube" 
                    ref={pixiv} 
                    onMouseEnter={() => {
                        setPixivColor(['black', 'white'])
                    }} 
                    onMouseLeave={() => {
                        setPixivColor(['#ddd', '#ddd'])
                    }}
                >
                    <svg style={{color: vel > 250 ? 'black' : pixivColor[0], zIndex: -1}} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>pixiv</title><path d="M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 24 19.065V4.935A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005 1.854-.88 3.476-2.257 4.563-1.375 1.092-3.225 1.697-5.258 1.697-2.314 0-4.46-.842-4.46-.842v2.718c.397.116 1.048.365.635.779H5.79c-.41-.41.19-.65.644-.779V7.666c-1.053.81-1.593 1.51-1.868 2.031.32 1.02-.284.969-.284.969l-1.09-1.73s3.868-4.39 9.553-4.39zm-.19.971c-1.423-.003-3.184.473-4.27 1.244v8.646c.988.487 2.484.832 4.26.832h.01c1.596 0 2.98-.593 3.93-1.533.952-.948 1.486-2.183 1.492-3.683-.005-1.54-.504-2.864-1.42-3.86-.918-.992-2.274-1.645-4.002-1.646Z" fill={vel > 250 ? 'black' : pixivColor[0]}></path></svg>
                    <svg style={{color: vel > 250 ? 'white' : pixivColor[1]}} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>pixiv</title><path d="M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 24 19.065V4.935A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005 1.854-.88 3.476-2.257 4.563-1.375 1.092-3.225 1.697-5.258 1.697-2.314 0-4.46-.842-4.46-.842v2.718c.397.116 1.048.365.635.779H5.79c-.41-.41.19-.65.644-.779V7.666c-1.053.81-1.593 1.51-1.868 2.031.32 1.02-.284.969-.284.969l-1.09-1.73s3.868-4.39 9.553-4.39zm-.19.971c-1.423-.003-3.184.473-4.27 1.244v8.646c.988.487 2.484.832 4.26.832h.01c1.596 0 2.98-.593 3.93-1.533.952-.948 1.486-2.183 1.492-3.683-.005-1.54-.504-2.864-1.42-3.86-.918-.992-2.274-1.645-4.002-1.646Z" fill={vel > 250 ? 'white' : pixivColor[1]}></path></svg>
                    <svg style={{color: 'black'}} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>pixiv</title><path d="M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 24 19.065V4.935A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005 1.854-.88 3.476-2.257 4.563-1.375 1.092-3.225 1.697-5.258 1.697-2.314 0-4.46-.842-4.46-.842v2.718c.397.116 1.048.365.635.779H5.79c-.41-.41.19-.65.644-.779V7.666c-1.053.81-1.593 1.51-1.868 2.031.32 1.02-.284.969-.284.969l-1.09-1.73s3.868-4.39 9.553-4.39zm-.19.971c-1.423-.003-3.184.473-4.27 1.244v8.646c.988.487 2.484.832 4.26.832h.01c1.596 0 2.98-.593 3.93-1.533.952-.948 1.486-2.183 1.492-3.683-.005-1.54-.504-2.864-1.42-3.86-.918-.992-2.274-1.645-4.002-1.646Z" fill='black'></path></svg>
                </a>
            </div>
            <div className="bottom"></div>
        </div>
    )
}