/*
Los creeps reparan 300hits con 3 de energia                     1 -> 100
Las torres reparan 800hits con 10 de energia si dist <= 5       1 -> 80
                   200hits con 10 de energia si dist >= 20      1 -> 20




*/
var Repair = {
     
    run: function(creep, isHarvester){
        let damagedStructures =  creep.room.memory.damagedStructures;
        
        if(damagedStructures != null && damagedStructures.length > 0){
            let target = creep.memory.targetToRepair;
            let targetIsValid = false;
            for(let i in damagedStructures){
                let thisStructure = Game.getObjectById(damagedStructures[i]);
                if(thisStructure.id == target){
                    targetIsValid = true;
                    break;
                }
            }

            if(targetIsValid){
            
                if(CREEPS_SPEAK){
                    creep.say('🔧');
                }
                let targetToRepair = Game.getObjectById(target);
                let repairResult = this.GoRepair(creep, targetToRepair, isHarvester);
                return repairResult;
            
            }else{
                let targetNumber = Math.floor(Math.random() * damagedStructures.length);
                creep.memory.targetToRepair = creep.room.memory.damagedStructures[targetNumber];
                creep.memory.inRepairPosition = false;
            }
        
        }else{
            let otherDamagedStructures = creep.room.memory.otherDamagedStructures;
            if(otherDamagedStructures != null && otherDamagedStructures.length > 0){
            
                let target = creep.memory.targetToRepair;
                
                let targetIsValid = false;
                for(let i in otherDamagedStructures){
                    if(otherDamagedStructures[i] == target){
                        targetIsValid = true;
                        break;
                    }
                }
                //console.log(creep.name+': Target is valid = '+targetIsValid);
                if(targetIsValid){
                
                    if(CREEPS_SPEAK){
                        creep.say('🔧');
                    }
                    let targetToRepair = Game.getObjectById(target);
                    let repairResult = this.GoRepair(creep, targetToRepair);
                    return repairResult;
                }else{
                    //Aqui tal vez sea mejor sin random, puesto que ya vienen ordenados por .hits
                    //let targetNumber = Math.floor(Math.random() * otherDamagedStructures.length);
                    creep.memory.targetToRepair = creep.room.memory.otherDamagedStructures[0].id;
                    creep.memory.inRepairPosition = false;
                }
            }else{
                return 'noTarget';
            }

            
        }
            
   },

   GoRepair: function(creep, targetToRepair, isHarvester){
        let repairResult;
        if(!creep.memory.inRepairPosition || creep.memory.inRepairPosition == false || isHarvester == true){
            if(creep.pos.inRangeTo(targetToRepair, 3)){
                if(isHarvester){
                    repairResult = creep.repair(targetToRepair);
                }
                creep.memory.inRepairPosition = true;
                repairResult = OK;                
            }else{
                creep.travelTo(targetToRepair);
                repairResult = ERR_NOT_IN_RANGE;
            }
        }else{
            repairResult = creep.repair(targetToRepair);
        }
        return repairResult;
    }
    
}
module.exports = Repair;






