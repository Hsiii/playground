import React, { useEffect, useState } from 'react';

import 'components/BallSim.css';
import Canvas from 'components/Canvas.jsx';
import Ball from 'components/Ball.js';

export default function BallSim(props) {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    
    const ball = new Ball();

    const colorPalette = {
        ArcticPowder: "#F1F6F4",
        MysticMint: "#D9E8E3",
        Forsythia: "#FFC801",
        DeepSaffron: "#FF9932",
        NocturnalExpedition: "#114C5A",
        OceanicNoir: "#172B36",
    };
  
    const dayClr = '#D9E8E3'
    const nightClr = '#114C5A'
    const squareSize = 25;

    const numSquaresX = canvasWidth / squareSize;
    const numSquaresY = canvasHeight / squareSize;

    let squares = [];    

    for (let i = 0; i < numSquaresX; i++)  
        squares[i] = Array(numSquaresY).fill(i < numSquaresX / 2 ? dayClr : nightClr);

    let x1 = canvasWidth / 4;
    let y1 = canvasHeight / 2;
    let d1 = {dx: 1, dy: -1};

    let x2 = (canvasWidth / 4) * 3;
    let y2 = canvasHeight / 2;
    let d2 = {dx: -1, dy: 1};

	const speed = 5;

    function drawBall(ctx, x, y, color) {
        ctx.beginPath();
        ctx.arc(x, y, squareSize / 2, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    function drawSquares(ctx) {
        for (let i = 0; i < numSquaresX; i++) 
            for (let j = 0; j < numSquaresY; j++) {
                ctx.fillStyle = squares[i][j];
                ctx.fillRect(
                    i * squareSize,
                    j * squareSize,
                    squareSize,
                    squareSize
                );
            }
    }

    function updateSquareAndBounce(x, y, d, color) {
        let {dx, dy} = {...d};
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
            let checkX = x + Math.cos(angle) * (squareSize / 2);
            let checkY = y + Math.sin(angle) * (squareSize / 2);

            let i = Math.floor(checkX / squareSize);
            let j = Math.floor(checkY / squareSize);

            if (i >= 0 && i < numSquaresX && j >= 0 && j < numSquaresY) {
                if (squares[i][j] !== color) {
                    squares[i][j] = color;

                    if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) 
                        dx = -dx;
                    else 
                        dy = -dy;
                }
            }
        }
        return { dx: dx, dy: dy };
    }

    function checkBoundaryCollision(x, y, d) {
		let {dx, dy} = d;
        if (x + dx > canvasWidth - squareSize / 2 || 
			x + dx < squareSize / 2) 
            dx = -dx;
        if (y + dy > canvasHeight - squareSize / 2 ||
            y + dy < squareSize / 2) 
            dy = -dy;
        
		return { dx: dx, dy: dy };
    }

    const draw = (ctx, frame) => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawSquares(ctx);

        drawBall(ctx, x1, y1, nightClr);
        drawBall(ctx, x2, y2, dayClr);

        d1 = updateSquareAndBounce(x1, y1, d1, dayClr);
		d1 = checkBoundaryCollision(x1, y1, d1);
        d2 = updateSquareAndBounce(x2, y2, d2, nightClr);
        d2 = checkBoundaryCollision(x2, y2, d2);

        x1 += d1.dx * speed;
        y1 += d1.dy * speed;
        x2 += d2.dx * speed;
        y2 += d2.dy * speed;
    };
  
    return <Canvas draw={draw} width={canvasWidth} height={canvasHeight}/>
}