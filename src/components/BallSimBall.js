export default class Ball {
    constructor() {
        
    }
    
    draw(context, frame) {
        context.beginPath();
        context.arc(100, 100, 10, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    };
}