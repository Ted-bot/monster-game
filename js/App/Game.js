import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";

export class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        this.numberOfObstacles = 5;
        this.obstacles = [];
        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        }

        window.addEventListener('mousedown', (e) => {
            console.log('mousedown', e.offsetX, e.offsetY);
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = true;
        })
        
        window.addEventListener('mouseup', (e) => {
            console.log('mousedown', e.offsetX, e.offsetY);
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = false;
        })
        window.addEventListener('mousemove', (e) => {
            if(this.mouse.pressed){
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                console.log("mouseMOve",this.mouse.x);
            }
        })
    }
    render(context){
        this.player.draw(context);
        this.player.update();
        this.obstacles.forEach(obstacle => (obstacle.draw(context)));
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
                const sumOfRadii = testObstacle.collisionRadius + obstacle.collisionRadius;
                if(distance < sumOfRadii){
                    overlap = true;
                }
            });
            if(!overlap){
                this.obstacles.push(testObstacle);
            }
            attempts++;
        }
    }
}