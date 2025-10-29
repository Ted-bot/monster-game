import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";

export class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.debug = true;
        this.player = new Player(this);
        this.topMargin = 260;
        this.numberOfObstacles = 10;
        this.obstacles = [];
        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        }

        window.addEventListener('mousedown', (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = true;
        })
        
        window.addEventListener('mouseup', (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = false;
        })
        window.addEventListener('mousemove', (e) => {
            if(this.mouse.pressed){
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
            }
        })
        window.addEventListener('keydown', (e) => {
            if(e.key == 'd') this.debug = !this.debug;
        })
    }
    render(context){
        this.player.draw(context);
        this.player.update();
        this.obstacles.forEach(obstacle => (obstacle.draw(context)));
    }
    checkCollision(a, b){
        const distanceX = a.collisionX - b.collisionX;
        const distanceY = a.collisionY - b.collisionY;
        const distance = Math.hypot(distanceY, distanceX);
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        return [(distance < sumOfRadii), distance, sumOfRadii, distanceX, distanceY];
    }
    init(){
        let attempts = 0;
        while(this.obstacles.length < this.numberOfObstacles && attempts < 500){
            let testObstacle = new Obstacle(this);
            let overlap = false;
            this.obstacles.forEach(obstacle => {
                const distanceX = testObstacle.collisionX - obstacle.collisionX;
                const distanceY = testObstacle.collisionY - obstacle.collisionY;
                const distance = Math.hypot(distanceY, distanceX);
                const distanceBuffer = 150;
                const sumOfRadii = testObstacle.collisionRadius + obstacle.collisionRadius + distanceBuffer;
                if(distance < sumOfRadii){
                    overlap = true;
                }
            });
            const margin = testObstacle.collisionRadius * 3;
            if(!overlap && testObstacle.spriteX > 0 && testObstacle.spriteX < this.width - testObstacle.width && testObstacle.collisionY > this.topMargin + margin && testObstacle.collisionY < this.height - margin){
                this.obstacles.push(testObstacle);
            }
            attempts++;
        }
    }
}