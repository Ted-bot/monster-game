export class Player {
    constructor(game){
        this.game = game;
        this.collisionPlayerX = this.game.width * 0.5;
        this.collisionPlayerY = this.game.height * 0.5;
        this.collisionRadius = 30;
        this.speedPlayerX = 0;
        this.speedPlayerY = 0;
        this.distanceX = 0;
        this.distanceY = 0;
        this.speedModifier = 5;
    }

    draw(context){
        context.beginPath();
        context.arc(this.collisionPlayerX, this.collisionPlayerY, this.collisionRadius, 0, Math.PI * 2);
        context.save();
        context.globalAlpha = 0.5;        
        context.fill();
        context.restore();
        context.stroke();
        context.beginPath();
        context.moveTo(this.collisionPlayerX, this.collisionPlayerY);
        context.lineTo(this.game.mouse.x, this.game.mouse.y);
        context.stroke();

    }
    update(){
        this.distanceX = this.game.mouse.x - this.collisionPlayerX;
        this.distanceY = this.game.mouse.y - this.collisionPlayerY;
        const distance = Math.hypot(this.distanceY, this.distanceX);
        if(distance > this.speedModifier){
            this.speedPlayerX = this.distanceX / distance || 0;
            this.speedPlayerY = this.distanceY / distance || 0;
        } else {
            this.speedPlayerX = 0;
            this.speedPlayerY = 0;
        }
        
        this.collisionPlayerX += this.speedPlayerX * this.speedModifier;
        this.collisionPlayerY += this.speedPlayerY * this.speedModifier;
    }
}