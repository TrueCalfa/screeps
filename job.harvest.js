const Dist = require('tools');

let Harvest = {
    run: function(c){

        let source;
        if(!c.memory.mySource && c.memory.mySource != 0){
            source = c.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            c.memory.mySource = source.id;
        }else{
            source = Game.getObjectById(c.memory.mySource);
            let harvestResult;
            //let sources = creep.room.memory.sources;
            //damagedStructures.sort((a,b) => a.hits - b.hits);
            //sources = sources.sort((a,b) => Dist.distanceSq(creep, Game.getObjectById(a)) - Dist.distanceSq(creep, Game.getObjectById(b)));
            //let source = sources[0];
            if(CREEPS_SPEAK){
                c.say('⛏');
            }
            if(c.pos.isNearTo(source)){
                if(source.energy > 0){
                    c.harvest(source);
                    harvestResult = OK;
                }else{
                    c.memory.mySource = 0;
                }
            }else{
                let travelResult = c.travelTo(source);
                if(travelResult == ERR_NO_PATH){
                    c.memory.mySource = 0;
                    harvestResult = ERR_NO_PATH
                }else{
                    harvestResult = ERR_NOT_IN_RANGE;
                }
            }
            return harvestResult;
        }
    },
    
    mine: function(creep){
        if(creep.memory.inPosition == true){
            let mySource = Game.getObjectById(creep.memory.mySource);
            if(mySource && mySource.energy > 0){
                creep.harvest(mySource);
            }
        }else{
            let myContainer = Game.getObjectById(creep.memory.myContainer);
            if(myContainer && creep.pos.isEqualTo(myContainer.pos)){
                if(creep.memory.mySource == 0){
                    let nearestSource = creep.pos.findInRange(FIND_SOURCES, 1);
                    creep.memory.mySource = nearestSource[0].id;
                    //creep.memory.mySource = creep.pos.findClosestByPath(FIND_SOURCES).id;
                    
                }else{
                    creep.memory.inPosition = true;
                    //creep.harvest(Game.getObjectById(creep.memory.mySource));
                }
            }else{
                creep.travelTo(myContainer);
            }
        }
    }
}
module.exports = Harvest;

