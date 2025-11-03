export class Larva {
    constructor(game){
        this.game = game;
        this.collisionX =  this.game.width;
        this.collisionY = this.game.height;
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
    draw(){
        context.drawImage(this.image, spriteX, this.spriteY);
    }
    update(){
        this.collisionY -= this.speedY;
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5;
    }
}