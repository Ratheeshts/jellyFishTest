/* 
The following program contains source code for Jelly FishChallenge.
Author @ Ratheesh .T.S
Date : 9/14/2022
*/
//constants
const twodigitRegex=/^\d{2}$/;
const commandRegex=/^\d{2}[NSEW]\s+[LRF]+$/;


/**
* Function for validating all instructions
* @param   {String} instructions for validate
* @return {Object} 
* 
*/
function validateAllInstructions(instructions)
{
    var allInstructions = instructions.split("\n");
    
    var tankBounds = allInstructions.shift();
    if(validateTankBounds(tankBounds.trim()))
    {
        if(allInstructions.length>0)
        {
       return validateCommands(allInstructions);
        }
        else{
            return {
                "message":"Error in Line Number 2. Type commands",
                "status":false
            }
        }
    }
    else{
        return {
            "message":"Error in Line Number 1.Please use 2 digits",
            "status":false
        }
    }
}


/**
* Function for validating first instruction
* @param   {String} instruction for validate
* @return {Object} 
* 
 */
function validateTankBounds(tankBounds)
{
   return twodigitRegex.test(tankBounds);
}

 /**
* Function for validating first instruction
* @param   {Array} instruction for validate
* @return {Object} 
* 
 */
function validateCommands(allInstructions)
{
    for (var i = 0; i < allInstructions.length; i++) 
    { var currentInstruction=allInstructions[i].trim()
        if (currentInstruction.length>100)
        {
            return {
                "message":`Error in Line Number ${(i+2)} : instruction length should be lesser than 100`,
                "status":false
            } 
        }

        if(commandRegex.test(currentInstruction)==false)
        {
            return {
                "message":`Error in Line Number ${(i+2)} : invalid command structure`,
                "status":false
            }
        }
    }
    return {
        "message":"Sucess",
        "status":true
    }
}