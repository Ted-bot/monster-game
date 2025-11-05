class Particle {
    constructor(game, x, y, color){
        this.game = game;
        this.collisionX = x;
        this.collisionY = y;
        this.color = color;
        this.radius = Math.floor(Math.random() * 10 + 5);
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 2 + 0.5;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.01;
        this.markedForDeletion = false;
    }
    draw(context){
        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.collisionX, this.collisionY, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.restore();
    }
}

export class FireFly extends Particle {
    update(){
        this.angle += this.va;
        this.collisionX += this.speedX;
        this.collisionY -= this.speedY;
        if(this.collisionY < 0 - this.radius){
            this.markedForDeletion = true;
            this.game.removeGameObjects();
        }
    }
}

export class Spark extends Particle {
    update(){
        
    }
}

