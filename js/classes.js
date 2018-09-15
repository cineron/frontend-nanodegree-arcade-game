// from the Roderick follow along, the idea is to separate out the player and enemy classes.

//a super class for both player and enemy
class Entity {
    constructor() {
        //pull in the image file and place them.
        this.sprite = "images/";
        this.x = 2;
        this.y = 5;
    }
    //set the board boundaries
    update(dt) {
        this.isOutOfBoundsX = this.x > 5;
        this.isOutOfBoundsY = this.y < 1;
    }
    //place the players
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 80);
    }
    //collision check
    checkCollisions(playerOrEnemy){
        if (this.y === playerOrEnemy.y){
            if (this.x >= playerOrEnemy.x - 0.74 && this.x <= playerOrEnemy.x + 0.55){
                return true;
            }
        } else {
            return false;
        }
    }
}
//create the player class
class Player extends Entity {
    constructor() {
        super();
        this.sprite += "char-boy.png";
        this.moving = false; //check to see if player is moving
        this.win = false; //win logic
    }

    update(dt){
        super.update();
        //check conditions for player win
        if (this.isOutOfBoundsY && !this.moving && !this.win){
            console.log(`"You made it across!" ${winner}`); //You can call a variable declared in another file.
            winningText.innerText = "Winner!";


            this.win = true;
        }
    }

    render(){
        super.render();
        this.moving = false; //set the moving variable to false on each render. it's set to true in handleInput
    }
    //determine how the players move on the board
    handleInput(input) {
        switch (input) {
            case 'left':
                this.x = this.x > 0 ? this.x - 1 : this.x;
                break;
            case 'up':
                this.y = this.y > 0 ? this.y - 1 : this.y;
                break;
            case 'right':
                this.x = this.x < 4 ? this.x + 1 : this.x;
                break;
            case 'down':
                this.y = this.y < 5 ? this.y + 1 : this.y;
                break;
        
            default:
                break;
        }
        this.moving = true; //set moving to true because it's in the input
    }
    
    //player reset
    reset() {
        this.x = (Math.floor(Math.random()*(4-0+1)+0));         // Start x-axis position
        this.y = 5;  // Start y-axis position
        this.win = false;   // Reset victory tracker
    }

}
//create the Enemy players
class Enemy extends Entity {
    constructor(x, y) {
        super();
        this.sprite += "enemy-bug.png";
        this.x = x;
        this.y = y;
    }

    update(dt){
        //use a random number to place the enemies
        //this was my own idea and implementation
        const max = 3;
        const min = 1;
        let randomNum = (Math.floor(Math.random()*(max-min+1)+min));
        super.update();
        if(this.isOutOfBoundsX){
            this.x = -1;
        } else {
            this.x += dt * randomNum;
        }

    }
}