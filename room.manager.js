const SetMemory = require('memory.set');
const ClearRoomMemory = require('memory.clearRoom');
const CountCreeps = require('creep.count');
const TowerManager = require('structure.towerManager');
const LinkManager = require('structure.linkManager');
const TerminalManager = require('structure.terminalManager');
let roomManager = {
    
    run: function(thisRoom){
        
        ClearRoomMemory.run(thisRoom);
        SetMemory.run(thisRoom);
        CountCreeps.run(thisRoom);

        LinkManager.run(thisRoom);
        if(Game.time%5 == 0){
            //TerminalManager.SellMinerals(thisRoom);
            TerminalManager.SellEnergy(thisRoom);
        }

        //Esto hara que si un spawn esta cagando un bicho, la thisRoom.memory.isSapwning == true
        //if(thisRoom.memory.isSpawning == true){
            /* thisRoom.memory.isSpawning = false;
            for(let i in thisRoom.memory.spawns){
                let thisSpawn = Game.getObjectById(thisRoom.memory.spawns[i].id);
                if (thisSpawn.spawning){
                    thisRoom.memory.isSpawning = true;
                }
            } */
        //}


        //console.log(Game.time%5);

        //if(Game.time % 5 == 0){
        //}
            
        
        if(thisRoom.controller && thisRoom.controller.my && thisRoom.controller.level > 0){

            let myTowers = thisRoom.memory.towers;
            if(myTowers && myTowers.length > 0){
                for(let i in myTowers){
                    TowerManager.run(Game.getObjectById(myTowers[i]));
                }
            }
            
            
            
            
            if(thisRoom.memory.spawns != null && thisRoom.memory.spawns.length > 0){
                let thisSpawn = null;
                let spawns = thisRoom.memory.spawns;
                for(let i in spawns){
                    thisSpawn = Game.getObjectById(thisRoom.memory.spawns[i].id);
                    let n = i;
                    if(thisSpawn.spawning) { 
                        let spawningCreep = Game.creeps[thisSpawn.spawning.name];
                        thisSpawn.room.visual.text('🛠️' + spawningCreep.memory.role, thisSpawn.pos.x + 1, thisSpawn.pos.y +parseInt(n), {align: 'left', opacity: 0.8});
                    }
                }
            }
            
            
        //Esto solo buscara en rooms que no sean mias
        }else{
            if((Game.time + 2) %5 == 0){
                let enemies = thisRoom.find(FIND_HOSTILE_CREEPS);
                if(enemies && enemies.length > 0 && thisRoom.memory.enemiesDetecte == 0){
                    
                    thisRoom.memory.enemiesDetected = 1;
                    thisRoom.memory.enemiesDie = Game.time + enemies[0].ticksToLive;
                }else{
                    thisRoom.memory.enemiesDetected = 0
                }
            }
        }
    }
}

module.exports = roomManager;
