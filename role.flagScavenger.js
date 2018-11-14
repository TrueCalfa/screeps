const PickEnergy = require('job.pickEnergy');
const AssignNewFlag = require('flag.assignNew');
const Unload = require('job.unloadEnergy');
let roleFlagScavenger = {
    
    run: function(creep) {
        let flag = Game.flags[creep.memory.targetFlag];

        
        if(flag && flag.color == COLOR_ORANGE && flag.secondaryColor == COLOR_ORANGE){
            
            this.SetTask(creep, flag);
            
            switch(creep.memory.task){
                case 'waiting':
                    if(!creep.memory.inFleePosition || creep.memory.inFleePosition == false){
                        let mySpawn = Game.spawns[creep.memory.mySpawn];
                        if(!creep.pos.inRangeTo(mySpawn, 10)){
                            creep.travelTo(mySpawn);
                        }else{
                            creep.memory.inFleePosition = true;
                        }
                    }
                break;
                case 'picking':
                    if(creep.room == flag.room){
                        //PickEnergy.run(creep, ['notFull'], creep.carryCapacity-_.sum(creep.carry));
                        PickEnergy.run(creep, ['notFull'], 200, false);
                    }else{
                        creep.travelTo(flag);            
                    }
                break;
                case 'unloading':
                    if(creep.pos.roomName == creep.memory.myRoom){
                        if(creep.memory.myLink == undefined || creep.memory.myLink == 0){
                            let links = creep.room.find(FIND_STRUCTURES, {
                                filter: function(structure){
                                    //return (structure.structureType == STRUCTURE_LINK && creep.pos.getRangeTo(structure) < 10 && structure.id != creep.room.memory.linkTo && structure.energy != structure.energyCapacity);
                                    return (structure.structureType == STRUCTURE_LINK && creep.pos.getRangeTo(structure) < 10 && structure.id != creep.room.memory.linkTo);
                                }
                            });
                            if(links && links.length > 0){
                                let sortedLinks = _.sortBy(links, s => creep.pos.getRangeTo(s));
                                creep.memory.myLink = sortedLinks[0].id;
                            }else{
                                let unloadResult = Unload.run(creep, ['storages'], Infinity);
                                //Y si esta lleno?...meeec
                                if(unloadResult == 'noTarget'){
                                    Unload.run(creep, ['containers'], Infinity);
                                }
                            }
                        }else{
                            let myLink = Game.getObjectById(creep.memory.myLink);
                            if(myLink){
                                if(creep.pos.isNearTo(myLink)){
                                    creep.transfer(myLink, RESOURCE_ENERGY);
                                }else{
                                    creep.travelTo(myLink);
                                }
                            }
                        }
                    }else{
                        creep.travelTo(Game.spawns[creep.memory.mySpawn]);
                    }
                break;
            }
        }else{
            AssignNewFlag.run(creep, COLOR_ORANGE, COLOR_ORANGE);
        }
    },
    SetTask: function(creep, flag){
        if(creep.room.memory.enemies && creep.room.memory.enemies.length > 0){
            creep.memory.task = 'waiting';
            creep.memory.timeToGo = creep.room.memory.enemiesDie;
            flag.memory.timeToGo = creep.room.memory.enemiesDie;
        }
        if(creep.memory.task == 'waiting' && (Game.time > creep.memory.timeToGo || !creep.memory.timeToGo)){
            if(!creep.memory.inFleePosition || creep.memory.inFleePosition == true){
                creep.memory.inFleePosition = false;
            }
            creep.memory.task = 'picking';
        }
        if(creep.memory.task != 'waiting'){
            if(_.sum(creep.carry) == 0){
                creep.memory.task = 'picking';
                creep.memory.unloadTo = 0;
            }else if(_.sum(creep.carry) == creep.carryCapacity){
                creep.memory.task = 'unloading';
                creep.memory.loadFrom = 0;
            }
        }
    }
    
};

module.exports = roleFlagScavenger;
