export class Player {
    constructor(game){
        this.game = game;
        this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;
        this.collisionRadius = 30;
        this.speedX = 0;
        this.speedY = 0;
        this.distanceX = 0;
        this.distanceY = 0;
        this.speedModifier = 5;
        this.spriteWidth = 255;
        this.spriteHeight = 255;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX;
        this.spriteY;
        this.image = document.getElementById('bull');
    }

    draw(context){
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
        context.beginPath();
        context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
        context.save();
        context.globalAlpha = 0.5;        
        context.fill();
        context.restore();
        context.stroke();
        context.beginPath();
        context.moveTo(this.collisionX, this.collisionY);
        context.lineTo(this.game.mouse.x, this.game.mouse.y);
        context.stroke();

    }
    update(){
        this.distanceX = this.game.mouse.x - this.collisionX;
        this.distanceY = this.game.mouse.y - this.collisionY;
        const distance = Math.hypot(this.distanceY, this.distanceX);
        if(distance > this.speedModifier){
            this.speedX = this.distanceX / distance || 0;
            this.speedY = this.distanceY / distance || 0;
        } else {
            this.speedX = 0;
            this.speedY = 0;
        }
        
        // update collision position
        this.collisionX += this.speedX * this.speedModifier;
        this.collisionY += this.speedY * this.speedModifier;

        // update image position
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 100;

        this.game.obstacles.forEach(obstacle => {

            let [collision, distance, sumOfRadii, distanceX, distanceY] = this.game.checkCollision(this, obstacle);

            if(collision){
                const unit_x = distanceX / distance;
                const unit_y = distanceY / distance;
                console.log({unit_x, unit_y});
                this.collisionX = obstacle.collisionX + (sumOfRadii + 1) * unit_x;
                this.collisionY = obstacle.collisionY + (sumOfRadii + 1) * unit_y;
            }
        });
    }
}