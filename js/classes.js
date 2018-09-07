// from the Roderick follow along

class Entity {
    constructor() {
        this.sprite = "images/";
        this.x = 1;
        this.y = 5;
    }

    update(dt) {
        this.isOutOfBoundsX = this.x > 5;
        this.isOutOfBoundsY = this.y < 1;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 80);
    }

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
            alert("You made it across!");
            this.win = true;
        }
    }

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
    }
}

class Enemy extends Entity {
    constructor(x, y) {
        super();
        this.sprite += "enemy-bug.png";
        this.x = x;
        this.y = y;
    }

    update(dt){
        super.update();
        if(this.isOutOfBoundsX){
            this.x = -1;
        } else {
            this.x += dt;
        }

    }
}