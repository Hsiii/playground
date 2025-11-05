import { useRef, useEffect } from 'react'

export default function useCanvas(draw) {
    const ref = useRef(null);
    
    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        let frame = 0;
        let animationID;
        
        const renderer = () => {
            frame++;
            draw(context, frame);
            animationID = window.requestAnimationFrame(renderer);
        };

        renderer();
        
        return () => { window.cancelAnimationFrame(animationID); }
    }, [draw])
    
    return ref;
}