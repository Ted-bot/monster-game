export class Player {
    constructor(game){
        this.game = game;
        this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;
        this.collisionRadius = 30;
        this.speedPlayerX = 0;
        this.speedPlayerY = 0;
        this.distanceX = 0;
        this.distanceY = 0;
        this.speedModifier = 5;
    }

    draw(context){
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
            this.speedPlayerX = this.distanceX / distance || 0;
            this.speedPlayerY = this.distanceY / distance || 0;
        } else {
            this.speedPlayerX = 0;
            this.speedPlayerY = 0;
        }
        
        this.collisionX += this.speedPlayerX * this.speedModifier;
        this.collisionY += this.speedPlayerY * this.speedModifier;

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