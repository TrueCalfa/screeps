let linkManager = {
    
    run: function(thisRoom){
        
        if(thisRoom.memory.linkFrom && thisRoom.memory.linkFrom != 0 && thisRoom.memory.linkFrom.length > 0 && thisRoom.memory.linkTo != 0){
            let linkFrom = thisRoom.memory.linkFrom;
            let linkTo = Game.getObjectById(thisRoom.memory.linkTo);
            
            for(let i in linkFrom){
                linkFrom = Game.getObjectById(thisRoom.memory.linkFrom[i]);
                
                //if(linkFrom && linkTo && linkFrom.energy > 770 && linkTo.energy < 5 && linkFrom.cooldown == 0){
                if(linkFrom && linkFrom.energy > 775 && linkTo.energy == 0 && linkFrom.cooldown == 0){
                    linkFrom.transferEnergy(linkTo);
                }
            }
            
        }
        
        
        
    }
}
module.exports = linkManager;



/*ERRORS TRANSFER ENERGY (LINK) 
OK	0	                            The operation has been scheduled successfully.
ERR_NOT_OWNER	-1	                You are not the owner of this link.
ERR_NOT_ENOUGH_RESOURCES	-6	    The structure does not have the given amount of energy.
ERR_INVALID_TARGET	-7	            The target is not a valid StructureLink object.
ERR_FULL	-8	                    The target cannot receive any more energy.
ERR_INVALID_ARGS	-10	            The energy amount is incorrect.
ERR_TIRED	-11	                    The link is still cooling down.
ERR_RCL_NOT_ENOUGH	-14	            Room Controller Level insufficient to use this link.
var LinkManager = {
*/
