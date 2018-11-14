let roleRouter = {
    run: function(creep){
                
        //Initialize Route (stored in creep's memory)
        if(!creep.memory.route){
            creep.memory.route = [];
        }
        //Number of structures added to the route
        if(!creep.memory.currentStructures){
            creep.memory.currentStructures = 0;
        }
        //Get number of extensions + spawns
        if(!creep.memory.totalStructures){
            creep.memory.totalStructures = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function(s){ return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION); }
            }).length;
        }
        //If i haven't added to the route as many elements as spawns + extensions
        if(creep.memory.currentStructures < creep.memory.totalStructures) {   
            //Look for a structure not added to the route yet
            let nextStructure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: function(s){
                    return ((s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && !_.includes(creep.memory.route, s.id));
                }
            });
            //add structure to the route after checking it wasn't already included
            if(nextStructure){
                creep.memory.route.push(nextStructure.id);
                creep.memory.currentStructures ++;
                //Now if i'm not near to the structure above, move towards it
                if(!creep.pos.isNearTo(nextStructure)){
                    creep.travelTo(nextStructure);
                }
                //And now that i'm next to it...
                if(creep.pos.isNearTo(nextStructure)){
                    //Look for nearby structures that are not included yet
                    let nearbyStructures = creep.pos.findInRange(FIND_MY_STRUCTURES, 1, {
                        filter: function(s){
                            return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && !_.includes(creep.memory.route, s.id);
                        }
                    });
                    //And now add these structures to the route
                    if(nearbyStructures && nearbyStructures.length > 0){
                        for(let i in nearbyStructures){
                            creep.memory.route.push(nearbyStructures[i].id);
                            creep.memory.currentStructures ++;
                        }
                    }
                }
                

            }else{
                console.log('You are fucked!');
            }
        //If the route is complete, store it in the room's memory
        }else{
            creep.room.memory.route = creep.memory.route;
        }




    }
}
module.exports = roleRouter;