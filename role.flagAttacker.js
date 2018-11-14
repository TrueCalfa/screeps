const AssignNewFlag = require('flag.assignNew');

var FlagAttacker = {
    run: function(creep) {
        
        let flag = Game.flags[creep.memory.targetFlag];
        if(flag && flag.color == COLOR_YELLOW){
            let manualTarget = Game.getObjectById(flag.memory.target);
            if(manualTarget){
                if(creep.pos.isNearTo(manualTarget)){
                    creep.attack(manualTarget);
                }else{
                    creep.travelTo(manualTarget);
                }
            }else{
                if(creep.room === flag.room){
                    let enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS,{
                        filter: function(c){
                            return (c.getActiveBodyparts(ATTACK) || c.getActiveBodyparts(RANGED_ATTACK));
                        }
                    });
//Si hay enemigos que puedan atacarme, les ataco yo                     
                    if(enemy){
                        if(creep.pos.inRangeTo(enemy, 2)){
                            creep.travelTo(flag);
                            creep.rangedAttack(enemy);
                        }else if(creep.pos.inRangeTo(enemy, 3)){
                            creep.rangedAttack(enemy);
                        }else{
                            creep.travelTo(enemy);
                        }
//Si no hay, miro que la room tenga dueño, y entonces busco estructuras que atacar                        
                    }else if(creep.room.controller.owner != undefined){
                        let enemyStructures = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                            filter: function(s){
                                return (s.structureType != STRUCTURE_CONTROLLER);
                            }
                        });
                        if(enemyStructures && enemyStructures.length >0){
                            let target;
                            for(let i in enemyStructures){
                                if(enemyStructures[i].structureType == STRUCTURE_TOWER) {
                                    target = enemyStructures[i];
                                    break;
                                }
                            }
                            if(!target){
                                for(let i in enemyStructures){
                                    if(enemyStructures[i].structureType == STRUCTURE_SPAWN) {
                                        target = enemyStructures[i];
                                        break;
                                    }   
                                }
                                if(!target){
                                    for(let i in enemyStructures){
                                        if(enemyStructures[i].structureType == STRUCTURE_EXTENSION) {
                                            target = enemyStructures[i];
                                            break;
                                        }   
                                    }
                                }
                            }
                            if(target){
                                if(creep.pos.isNearTo(target)){
                                    creep.attack(target);
                                }else{
                                    creep.travelTo(target);
                                }
                            }else{
                                let newEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
                                if(newEnemy){
                                    if(creep.pos.inRangeTo(newEnemy, 2)){
                                        creep.travelTo(flag);
                                        creep.rangedAttack(newEnemy);
                                    }else if(creep.pos.inRangeTo(newEnemy, 3)){
                                        creep.rangedAttack(newEnemy);
                                    }else{
                                        creep.travelTo(newEnemy);
                                    }
                                }else{
                                    if(!creep.pos.isNearTo(flag)){
                                        creep.travelTo(flag);
                                    }
                                }
                            }
                        }else if(!creep.fatige){
                            creep.travelTo(flag);
                        }
                    }
                }else if(!creep.fatige){
                    creep.travelTo(flag);
                }
            }
        }else{
            AssignNewFlag.run(creep, COLOR_YELLOW, COLOR_YELLOW);
        }
    }
};
module.exports = FlagAttacker;

