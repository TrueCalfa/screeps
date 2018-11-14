//var Utils = require ('A.Utils');

var towerRepair = {
    run: function(tower){

        
        if(tower.room.memory.damagedCreeps.length > 0 && (tower.energy > tower.energyCapacity * 0.4) && tower.pos.getRangeTo(Game.getObjectById(tower.room.memory.damagedCreeps[0])) < 8){
            tower.heal(Game.getObjectById(tower.room.memory.damagedCreeps[0]));
        }else{

            let repairRange = TOWER_MAX_REPAIR_DIST;
            if(SHOW_TOWER_REPAIR_RANGE)   {
                let showRange = new RoomVisual(tower.room.name).circle(tower.pos, {radius: repairRange, fill: 'transparent', stroke: 'green', lineStyle: 'dotted'});
            }
            
            let towerID = tower.id;
            let damagedStructures = [];
            let otherDamagedStructures = [];
            let target = 0;
            
            damagedStructures = tower.room.memory.damagedStructures;
            
            for(let i in damagedStructures){
                if(tower.pos.getRangeTo(Game.getObjectById(damagedStructures[i])) < TOWER_MAX_REPAIR_DIST){
                        target = Game.getObjectById(damagedStructures[i]);
                        break;
                }
            }
            if(target == 0){
                
                otherDamagedStructures = tower.room.memory.otherDamagedStructures;
                
                for(let i in otherDamagedStructures){
                    if(tower.pos.getRangeTo(Game.getObjectById(otherDamagedStructures[i])) < TOWER_MAX_REPAIR_DIST){
                            target = Game.getObjectById(otherDamagedStructures[i]);
                            break;
                    }
                }
                
            }
            
            //No puedo poner un else porque al principio de cada tick target == 0
            if(target != 0){

                if(tower.energy > (tower.energyCapacity * TOWER_MIN_ENERGY_TO_REPAIR * 0.01)) {
                    //let showTarget = new RoomVisual(tower.room.name).line(tower.pos, target.pos, {color: 'cyan', lineStyle: 'dashed'});
                    let repairResult = tower.repair(target);
                    return repairResult;
                
                }else{
                    let showTarget = new RoomVisual(tower.room.name).line(tower.pos, target.pos, {color: 'cyan', lineStyle: 'dashed', width: 0.04, opacity: 0.3});
                }
            }
        }
    }
};
module.exports = towerRepair;