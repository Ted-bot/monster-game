export class Larva {
    constructor(game, x ,y){
        this.game = game;
        this.collisionX =  x;
        this.collisionY = y;
        this.collisionRadius = 30;
        this.image = document.getElementById('larva');
        this.spriteWidth = 150;
        this.spriteHeight  = 150;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX;
        this.spriteY;
        this.speedY = 1 + Math.random();
    }
    draw(context){
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
        if(this.game.debug){
            context.beginPath();
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            context.save();
            context.globalAlpha = 0.5;
            context.fill();
            context.restore();
            context.stroke();
        }
    }
    update(){
        this.collisionY -= this.speedY;
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 50;
        //    move to safety
        if(this.collisionY < this.game.topMargin){
            this.markedForDeletion = true;
            this.game.removeGameObjects();
        }
    }
}