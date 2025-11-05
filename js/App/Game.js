import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";
import { Egg } from "./egg.js";
import { Enemy } from "./enemy.js";
import { Larva } from "./larva.js";

export class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.debug = true;
        this.player = new Player(this);
        this.fps = 70;
        this.timer = 0;
        this.interval = 1000 / this.fps;
        this.eggTimer = 0;
        this.eggInterval = 500;
        this.topMargin = 260;
        this.numberOfObstacles = 10;
        this.maxEggs = 10;
        this.obstacles = [];
        this.eggs = [];
        this.gameObjects = [];
        this.enemies = [];
        this.hatchlings = [];
        this.particles = [];
        this.lostHatchlings = 0;
        this.score = 0;
        this.winningScore = 1;
        this.gameOver = false;
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
    render(context, deltaTime){
        if(this.timer > this.interval){
            context.clearRect(0,0,this.width, this.height);
            this.gameObjects = [...this.eggs, ...this.obstacles, this.player, ...this.enemies, ...this.hatchlings, ...this.particles];
            
            // sort by vertical position
            this.gameObjects.sort((a, b) => {
                return a.collisionY - b.collisionY;
            })

            this.gameObjects.forEach(object => {
                object.draw(context);
                object.update(deltaTime);
            });
            

            // animate next frame
            this.timer = 0;
        }
        this.timer += deltaTime;

        // add eggs over time
        if(this.eggTimer > this.eggInterval && this.eggs.length < this.maxEggs && !this.gameOver){
            this.addEgg();
            this.eggTimer = 0;
            console.log(this.eggs);
        } else {
            this.eggTimer += deltaTime;
        }

        // draw status text
        context.save();
        context.textAlign = 'left';
        context.fillText('score: ' + this.score, 25, 50);
        if(this.debug){
            context.fillText('Lost: ' + this.lostHatchlings, 25, 100);
        }
        context.restore();

        // win / lose message
        if(this.score >= this.winningScore){
            this.gameOver = true;
            context.save();
            context.fillStyle = 'rgba(0,0,0,0.5)';
            context.fillRect(0,0, this.width, this.height);
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.shadowOffsetX = 4;
            context.shadowOffsetY = 4;
            context.shadowColor = 'black';
            let message1;
            let message2;
            if(this.lostHatchlings <= 5){
                message1 = "Bullseye !!!";
                message2 = "You won from the Monsters";
            } else {
                message1 = "To Bad !";
                message1 = "You lost " + this.lostHatchlings + " hatchlings, dont be a Weakling";
            }
            context.font = '50px Bangers';
            context.fillText(message1, this.width * 0.5, this.height * 0.5);
            context.fillText("Final score " + this.score + ". Press 'R' to restart game !", this.width * 0.5, this.height * 0.5 + 80);
            context.restore();
        }
    }
    checkCollision(a, b){
        const distanceX = a.collisionX - b.collisionX;
        const distanceY = a.collisionY - b.collisionY;
        const distance = Math.hypot(distanceY, distanceX);
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        return [(distance < sumOfRadii), distance, sumOfRadii, distanceX, distanceY];
    }
    addEgg(){
        this.eggs.push(new Egg(this));
    }
    addEnemy(){
        this.enemies.push(new Enemy(this));
        console.log("enemies",this.enemies);
    }
    removeGameObjects(){
        this.eggs = this.eggs.filter(egg => !egg.markedForDeletion);
        this.hatchlings = this.hatchlings.filter(object => !object.markedForDeletion);
        this.particles = this.particles.filter(object => !object.markedForDeletion);
    }
    init(){
        for(let i = 0; i < 5; i++){
            this.addEnemy();
        }
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