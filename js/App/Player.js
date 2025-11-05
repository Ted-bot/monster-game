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
        this.speedModifier = 3;
        this.spriteWidth = 255;
        this.spriteHeight = 255;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX;
        this.spriteY;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 58;
        this.image = document.getElementById('bull');
    }
    restart(){
        // update collision position
       this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;

        // update image position
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 100; // adjust position (heihgt) for correct shadow presenation
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
        if(this.game.debug){
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

    }
    update(){
        this.distanceX = this.game.mouse.x - this.collisionX;
        this.distanceY = this.game.mouse.y - this.collisionY;

        // sprite animation
        const angle = Math.atan2(this.distanceY, this.distanceX);
        if (angle < -2.74 || angle > 2.74) this.frameY = 6;
        else if (angle < -1.96) this.frameY = 7;
        else if(angle < -1.17) this.frameY = 0;
        else if (angle < -0.39) this.frameY = 1;
        else if (angle < 0.39) this.frameY = 2;
        else if (angle < 1.17) this.frameY = 3;
        else if (angle < 1.96) this.frameY = 4;
        else if (angle < 2.74) this.frameY = 5;

        // full animiation
        if( this.frameX < this.maxFrame){
            this.frameX++;
        } else {
            this.frameX = 0;
        }

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
        this.spriteY = this.collisionY - this.height * 0.5 - 100; // adjust position (heihgt) for correct shadow presenation

        // horizontal boundaries
        if(this.collisionX < 0 + this.collisionRadius) this.collisionX = this.collisionRadius;
        else if(this.collisionX > this.game.width - this.collisionRadius) this.collisionX = this.game.width - this.collisionRadius; 

        //vertical boundaries
        if(this.collisionY < 0 + this.game.topMargin + this.collisionRadius) this.collisionY = 0 + this.game.topMargin + this.collisionRadius;
        else if (this.collisionY > this.game.height - this.collisionRadius) this.collisionY = this.game.height - this.collisionRadius;

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