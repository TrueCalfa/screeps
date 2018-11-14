
const DefineCreepBody = require('creep.define');
let SpawnCreep = {
    
    run: function(thisRoom, role, extAtt, type){
        //if(thisRoom.memory.isSpawning == false){
            
            let spawn = null;
            spawn = this.SelectSpawn(thisRoom);
            
            if(spawn != null){
                if(type == 'normal'){
                    //This function returns an array of length 3:
                    //0 -> name     1-> attributes    2-> body
                    let definedCreep = DefineCreepBody.run(thisRoom, role, spawn);
                    let attributes = Object.assign(definedCreep[1], extAtt);
                    let createResult = spawn.createCreep(definedCreep[2], definedCreep[0]+(Game.time),attributes);
                    thisRoom.memory.isSpawning = true;
                    return createResult;

                }else if(type == 'flag' && thisRoom.memory.isSpawning == false){
                    //This function returns an array of length 3:
                    //0 -> name     1-> attributes    2-> body
                    let definedCreep = DefineCreepBody.run(thisRoom, role, spawn);
                    let attributes = Object.assign(definedCreep[1], extAtt);
                    let createResult = spawn.createCreep(definedCreep[2], definedCreep[0]+(Game.time),attributes);
                    return createResult;
                }
            }
            
        //}
    },

    SelectSpawn: function(thisRoom){
        if(thisRoom.memory.spawns && thisRoom.memory.spawns.length > 0){
            
            for (let i in thisRoom.memory.spawns){
                let thisSpawn = Game.getObjectById(thisRoom.memory.spawns[i].id);
                if(!thisSpawn.spawning){
                    return thisSpawn;
                    break;
                }
            }
        }
    }

    
    
}

module.exports = SpawnCreep;
