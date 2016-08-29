// followed a tutorial here: https://www.youtube.com/watch?v=ju09womACpQ changing score input method, made the ball round and trying to add keyboard controls.


class Vector {
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}
}

class Rectangle {
	constructor(width, height){
		this.pos = new Vector;
		this.size = new Vector(width, height);
	}
	get left(){
		return this.pos.x - this.size.x / 2;
	}
	get right(){
		return this.pos.x + this.size.x / 2;
	}
		get top(){
		return this.pos.y - this.size.y / 2;
	}
	get bottom(){
		return this.pos.y + this.size.y / 2;
	}
}

class Ball extends Rectangle {
	constructor(){
		super(10,10);
		this.vel = new Vector;
	}
}

class Player extends Rectangle {
	constructor(){
		super(20, 100);
		this.score = 0;
		this.vel = new Vector
	}
}

class Pong {
	constructor(canvas){
		this._canvas = canvas;
		this._context = canvas.getContext("2d");

		this.ball = new Ball;

		this.ball.pos.x = (this._canvas.width / 2), 
		this.ball.pos.y = (this._canvas.height / 2), 
		this.ball.radius = 15,
		this.ball.border = 2;
			
		
		this.players = [
			new Player,
			new Player,
		];

		this.players[0].pos.x = 40;
		this.players[1].pos.x = this._canvas.width -40;
		this.players.forEach(player => {
			player.pos.y = this._canvas.height / 2;
		
		})
		this.players[0].score = 0;
		this.players[1].score = 0;	

		let lastTime;
// ms = miliseconds 
		const callback = (ms) => {
			if (lastTime) {
				this.update((ms - lastTime)/1000);
			}
			lastTime = ms;
			requestAnimationFrame(callback);
		};

		callback();
		this.reset();
	}

	collide(player, ball) {
		if(player.left < ball.right && player.right > ball.left && 
			player.top < ball.bottom && player.bottom > ball.top){
			ball.vel.x = -ball.vel.x;
			ball.vel.y += 300 * (Math.random() - .5);
		}
	}

	draw(){
		this._context.fillStyle = "#000";
		this._context.fillRect(0,0, this._canvas.width, this._canvas.height);

		this._context.font = "30px Arial";
		this._context.fillStyle = "white";
		this._context.fillText("Score: "+this.players[0].score, this._canvas.width*1/5, 30);
    this._context.fillText("Score: "+this.players[1].score, this._canvas.width*3/5, 30);

    this._context.beginPath();
    this._context.arc(this.ball.pos.x, this.ball.pos.y,
                this.ball.radius, 0, 2 * Math.PI, false);
    this._context.fillStyle = '#fff';
    this._context.fill();
    this._context.lineWidth = this.ball.border;
    this._context.strokeStyle = 'orange';
    this._context.stroke();
    
		this.drawRect(this.ball);
		this.players.forEach(player => this.drawRect(player));
	}

	drawRect(rect){
		this._context.fillStyle = "#fff";
		this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
	}


	reset() {
		this.ball.pos.x = this._canvas.width /2;
		this.ball.pos.y = this._canvas.height /2;
		this.ball.vel.x = 0;
		this.ball.vel.y = 0;
		this.score++

	}

	start(){
		if (this.ball.vel.x === 0 && this.ball.vel.y === 0){
			this.ball.vel.x = 300 * (Math.random() > .5 ? 1 : -1);
			this.ball.vel.y = 300 * (Math.random() * 2 -1);
			// this.ball.vel.len = 300;
		}
	}

		// dt=delta time
		update(dt) {
		// this.ball.pos.x += this.ball.vel.x * dt;
		// this.ball.pos.y += this.ball.vel.y * dt;
		[this.ball,...this.players].forEach(rect => {
			rect.pos.x+=rect.vel.x*dt;
			rect.pos.y += rect.vel.y *dt;
		});

		if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
			let playerId;
			if (this.ball.vel.x < 0) {
				playerId = 1;
				this.players[1].score++;
			}
			else {
				playerId = 0;
				this.players[0].score++;
			}
			this.reset();
		}
		if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
			this.ball.vel.y = - this.ball.vel.y;
		}
		// making one of the paddles track the ball
		this.players[1].pos.y = this.ball.pos.y;

		this.players.forEach(player => this.collide(player, this.ball));
		this.draw();		
	}
}

document.addEventListener("click", event => {
	pong.start();
});

const canvas = document.getElementById("myCanvas");
const pong = new Pong(canvas);

// window.addEventListener("mousemove", event => {
// 	pong.players[0].pos.y = event.offsetY;
// });

window.addEventListener("keydown",onKeyDown);

   function movePaddle(somePlayer, canvas, context, newPosition) {
        console.log("I am starting the animation. the newPosition is " +newPosition);
        var currentPlayerY = pong.players.y;
        var newY = currentPlayerY + newPosition;

        somePlayer.y = newY;
        console.log("I have set the position of the paddle to be at " + pong.players.y);

        // erase the canvas, including the drawing of the rectangle
        // this._context.clearRect(0, 0, pong.canvas.width, pong.canvas.height);
        console.log("I have erased the canvas");

        console.log("Now I am going to redraw BOTH RECTANGLES/paddle with its new y.");
        // drawRectangle(pong.player[0], context);
        // drawRectangle(pong.player[1], context);
    }

function onKeyDown(event){
        console.log("onKeyDown event handler is fired");
         switch (event.keyCode){
            case 65:
                console.log("a");
                if (pong.players[0].pos.y>0){
                  movePaddle(pong.players[0], pong.canvas,pong.context,-10);
                }
                console.log(pong.players[0].pos.y)
                break;
            case 90:
                console.log("z");
                if ((pong.players[0].pos.y)<150) {
                  movePaddle(pong.players[0],pong.canvas,pong.context,10);
                }
                // console.log(myRectangle.y)
                break;
            case 38:
                console.log("up");
                if(pong.players[1].pos.y>0){
                  movePaddle(pong.players[1],pong.canvas,pong.context,-10);
                }
                break;
            case 40:
                console.log("down");
                if(pong.players[1].pos.y<150){
                  movePaddle(pong.players[1],pong.canvas,pong.context,10);
                }
                break;
            default:
                console.log("you pressed " + event.keyCode);
                break;
        }
    }