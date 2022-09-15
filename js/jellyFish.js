/* 
The following program contains source code for Jelly FishChallenge.
Author @ Ratheesh .T.S
Date : 9/14/2022
*/
//constants
const LEFT = -1
const RIGHT = 1
const DIRECTIONS = ["N", "E", "S", "W"]
const NEGATIVE_OUT_OF_BOUND = -1
const POSITIVE_OUT_OF_BOUND = 4

//fish tank class
class FishTank {
    constructor(xBound = 0, yBound = 0) {
        this.xBound = xBound;
        this.yBound = yBound;
        //array to store all jelly fish objects
        this.fishList = []
        //remote controller for FishTank
        this.remoteController = new RemoteController(this);
    }


    /**
    * Function for getting remote controller of fish tank
    * @return   {RemoteController} 
    * remote controller object to control tank
    * 
    */
    getRemoteController() {
        return this.remoteController
    }





    /**
    * Function for adding fish object to fishList
    * @param    {Object}   jellyFishObject  Object of JellyFish class  *    
    * jellyFishObject to be added
    * 
    */
    addFish(jellyFishObject) {
        this.fishList.push(jellyFishObject)

    }

    /**
    * Function for getting fishList Array
    * @return   {Array} 
    * all fishObjects in tank as array
    * 
    */
    getAllFishes() {
        return this.fishList
    }

    /**
    * Function for getting all fish's positions as Array
    * @return   {Array} 
    * positions of all fishObjects  in tank as an array
    * 
    */
    getAllFishPositions() {
        var resultPositions = this.fishList.map(fishObj => fishObj.getPosition());
        return resultPositions;
    }

}

//class for jelly fish
class JellyFish {

    /**
    * constructor
    * @param    {Number} x intial x value of the JellyFish
    * @param    {Number} y intial y value of the JellyFish      
    * @param    {String} direction intial direction value of the JellyFish 
    * 
    */
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction

    }


    /**
     * Function for getting current fish's position
     * @return   {String} 
     * positions of current fish as a string
     * 
     */
    getPosition = () => {
        var positionStatus = this.x + "" + this.y + "" + this.direction
        return positionStatus;
    }
}


//class for RemoteContoller to contol the tank
class RemoteController {

    /**
   * constructor
   * @param    {FishTank} fishTank attach fish tank with remote controller
   * 
   */
    constructor(fishTank) {
        this.fishTank = fishTank;
        //keep points to be ignored
        this.ignoringArray = []

        /*
        store function to be executed across 
        each command in a dic
        */
        this.functionsForCommands = {
            "L": this.turnLeft,
            "R": this.turnRight,
            "F": this.moveForward
        }
        //forward moments on each direction
        this.movements = {
            "N": this.incrementY,
            "S": this.decrementY,
            "E": this.incrementX,
            "W": this.decrementX
        }
    }


    /**
    * Function for adding grid to Ignoring array
    * @param   {Object} gridPoint dictory object having structure 
    * {key:'x',value:1,direction:"N"}  
    * 
    */
    addToIgnoringArray = (gridPoint) => {
        this.ignoringArray.push(gridPoint);
    }


    /**
    * Function for checking grid is in Ignoring array
    * @param   {Object} gridPoint dictory object having structure 
    * {key:'x',value:1,direction:"N"} 
    * @return {Boolean} found
    * return true if grid point exists else false
    * 
    */
    isInIgnoringArray = (gridPoint) => {
        const found = this.ignoringArray.some(element => {
            if (
                (gridPoint.key == element.key) &&
                (gridPoint.direction == element.direction) &&
                (gridPoint.value == element.value)) {
                return true;
            }
            return false;
        });
        return found;
    }

    /**
    * Function for checking x value reaches out of boundary
    * @param   {Number} x 
    * @return {Boolean} 
    * return true if x value reaches out of boundary
    * 
    */

    isOutOfBoundX = (x) => {
        if ((x > this.fishTank.xBound) || (x == -1)) {
            return true
        } else {
            return false
        }
    }


    /**
    * Function for checking y value reaches edge of tank
    * @param   {Number} y
    * @return {Boolean} 
    * return true if y value reaches edge of tank
    * 
    */
    isOutOfBoundY = (y) => {
        if ((y > this.fishTank.yBound) || (y == -1)) {
            return true
        } else {
            return false
        }
    }
    /**
    * Function for incrementing x position of given object
    * @param   {Object} jellyFishObject JellyFish object
    * @return {Boolean} 
    * return true if fish doesnt move off after adding
    * 
    */
    incrementX = (jellyFishObject) => {
        var nextX = jellyFishObject.x + 1
        if (this.isOutOfBoundX(nextX)) {
            var smellScent = this.verifyIgnoringArray("x", jellyFishObject)
            return smellScent
        }
        jellyFishObject.x = nextX
        return true

    }
    /**
    * Function for decrementing x position of given object
    * @param   {Object} jellyFishObject JellyFish object
    * @return {Boolean} 
    * return true if fish doesnt move off after decrementing
    * 
    */
    decrementX = (jellyFishObject) => {
        var nextX = jellyFishObject.x - 1
        if (this.isOutOfBoundX(nextX)) {
            var smellScent = this.verifyIgnoringArray("x", jellyFishObject)
            return smellScent
        }
        jellyFishObject.x = nextX
        return true

    }

   /**
   * Function for incrementing y position of given object
   * @param   {Object} jellyFishObject JellyFish object
   * @return {Boolean} 
   * return true if fish doesnt move off after decrementing
   * 
   */
    incrementY = (jellyFishObject) => {
        var nextY = jellyFishObject.y + 1
        if (this.isOutOfBoundY(nextY)) {
            var smellScent = this.verifyIgnoringArray("y", jellyFishObject)
            return smellScent
        }
        jellyFishObject.y = nextY
        return true
    }

    /**
    * Function for decrementing y position of given object
    * @param   {Object} jellyFishObject JellyFish object
    * @return {Boolean} 
    * return true if fish doesnt move off after decrementing
    * 
    */
    decrementY = (jellyFishObject) => {
        var nextY = jellyFishObject.y - 1
        if (this.isOutOfBoundY(nextY)) {
            var smellScent = this.verifyIgnoringArray("y", jellyFishObject)
            return smellScent
        }
        jellyFishObject.y = nextY
        return true

    }
    /**
    * Function for turning left the given fish object and changing its direction
    * @param   {Object} jellyFishObject JellyFish object
    * 
    */
    turnLeft = (jellyFishObject) => {
        var directionIndex = DIRECTIONS.indexOf(jellyFishObject.direction);
        var nextDirectionIndex = directionIndex + LEFT;
        nextDirectionIndex = (nextDirectionIndex == NEGATIVE_OUT_OF_BOUND) ? 3 : nextDirectionIndex;
        jellyFishObject.direction = DIRECTIONS[nextDirectionIndex];
        return true
    }
    /**
    * Function for turning Right and change directions accoridngly
    * @param   {Object} jellyFishObject JellyFish object
    * 
    */
    turnRight = (jellyFishObject) => {
        var directionIndex = DIRECTIONS.indexOf(jellyFishObject.direction);
        var nextDirectionIndex = directionIndex + RIGHT;
        nextDirectionIndex = (nextDirectionIndex == POSITIVE_OUT_OF_BOUND) ? 0 : nextDirectionIndex;
        jellyFishObject.direction = DIRECTIONS[nextDirectionIndex];
        return true
    }
    /**
    * Function for move forward
    * @param   {Object} jellyFishObject JellyFish object
    * 
    */
    moveForward = (jellyFishObject) => {
        return this.movements[jellyFishObject.direction](jellyFishObject)
    }

    /**
   * Function verify the existance in ignoring Que
   * add to ignoring if cross boundary first time
   * @param   {String} key 'x' or 'y'
   * @param   {Object} jellyFishObject JellyFish object
   * 
   */
    verifyIgnoringArray = (key, jellyFishObject) => {
        var scentObject = {
            "key": key,
            "direction": jellyFishObject.direction,
            "value": jellyFishObject[key]
        }
        if (this.isInIgnoringArray(scentObject)) {
            return true
        } else {
            jellyFishObject.direction = jellyFishObject.direction + "LOST"

            this.addToIgnoringArray(scentObject);
            return false;
        }
    }



    /**
    * Function for executing all instructions
    * @param   {String} instructions instructions to be executed
    * @return 
    * create jellyFish object add to Fish tank after executing instruction
    */
    swimAllFishes = (instructions) => {

        var allInstructions = instructions.split("\n");
        var tankBounds = allInstructions.shift();
        var tankX = Number(tankBounds[0]);
        var tankY = Number(tankBounds[1]);
        this.fishTank.xBound = tankX;
        this.fishTank.yBound = tankY;
        for (var i = 0; i < allInstructions.length; i++) {
            this.swimAFish(allInstructions[i])
        }

    }

    /**
    * Function for to excute a single instructon
    * @param   {String} instructions instructions to be executed
    * @return 
    * create jellyFish object add to Fish tank after executing instruction
    */
    swimAFish = (instruction) => {
        var instructionSet = instruction.split(" ");
        var x1 = Number(instructionSet[0][0]);
        var y1 = Number(instructionSet[0][1]);
        var startDirection = instructionSet[0][2];
        var jellyFishObject = new JellyFish(x1, y1, startDirection);
        var instructionArray = instructionSet[1].split("")
        var runExecution = true
        var index = 0
        while (
            (index < instructionArray.length) &&
            (runExecution == true)) {
            var cmd = instructionArray[index];
            runExecution = this.functionsForCommands[cmd](jellyFishObject)

            index++;

        }
        this.fishTank.addFish(jellyFishObject)
    }


}
