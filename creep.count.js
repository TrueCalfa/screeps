const CreateCreep = require('creep.spawn');

let countCreeps = {
    run: function(thisRoom){
        //console.log('count');
        let totalHarvesters = 0;
        let totalBuilders = 0;
        let totalRepairers = 0;
        let totalUpgraders = 0;
        let totalMiners = 0;
        let totalRefillers = 0;
        let totalScavengers = 0;
        let totalLinkManagers = 0;
        let totalExtractors = 0;
        let totalMineralHaulers = 0;
        let totalRouters = 0;
        
        //for (let i in Memory.creeps){
        for (let i in Game.creeps){
            let ticksToDie;
            let thisCreep = Game.creeps[i];
            if(thisCreep.memory.ticksToDie){
                ticksToDie = thisCreep.memory.ticksToDie;
            }else{
                ticksToDie = TICKS_TO_DIE;
            }
            if(thisCreep.memory.myRoom === thisRoom.name){
                if(thisCreep.spawning || thisCreep.ticksToLive > ticksToDie){
                    switch(thisCreep.memory.role){
                        case 'router':
                            totalRouters ++;
                        break;
                        case 'harvester':
                            totalHarvesters ++;
                        break;
                        case 'upgrader':
                            totalUpgraders ++;
                        break;
                        case 'builder':
                            totalBuilders ++;
                        break;
                        case 'repairer':
                            totalRepairers ++;
                        break;
                        case 'miner':
                            totalMiners ++;
                        break;
                        case 'refiller':
                            totalRefillers ++;
                        break;
                        case 'scavenger':
                            totalScavengers ++;
                        break;
                        case 'linkManager':
                            totalLinkManagers ++;
                        break;
                        case 'extractor':
                            totalExtractors ++;
                        break;
                        case 'mineralHauler':
                            totalMineralHaulers ++;
                        break;
                    }
                }
            }
        }
    
        let desiredMiners = thisRoom.memory.desiredMiners;
        let desiredRefillers = thisRoom.memory.desiredRefillers;
        let desiredScavengers = thisRoom.memory.desiredScavengers-1;
        let desiredHarvesters = thisRoom.memory.desiredHarvesters;
        //let desiredHarvesters = 1;
        let desiredUpgraders = thisRoom.memory.desiredUpgraders;
        let desiredBuilders = thisRoom.memory.desiredBuilders;
        let desiredRepairers = thisRoom.memory.desiredRepairers;
        let desiredLinkManagers = thisRoom.memory.desiredLinkManagers;
        if(desiredLinkManagers == 0){
            desiredLinkManagers = 1;
        }
        let desiredExtractors = thisRoom.memory.desiredExtractors;
        let desiredMineralHaulers = thisRoom.memory.desiredMineralHaulers;
        let desiredRouters;
        if(thisRoom.name == 'E9N6'){
            desiredRouters = 0;
        }else{
            desiredRouters = 0;
        }
        if(SHOW_CREEP_COUNT){
            if(thisRoom.controller && thisRoom.controller.my && thisRoom.memory.spawns != null && thisRoom.memory.spawns.length > 0)    {
                console.log(thisRoom.name+' has '+totalMiners+'/'+desiredMiners+' miners');
                console.log(thisRoom.name+' has '+totalRefillers+'/'+desiredRefillers+' refillers');
                console.log(thisRoom.name+' has '+totalHarvesters+'/'+desiredHarvesters+' harvesters');
                console.log(thisRoom.name+' has '+totalUpgraders+'/'+desiredUpgraders+' upgraders');
                console.log(thisRoom.name+' has '+totalBuilders+'/'+desiredBuilders+' builders');
                console.log(thisRoom.name+' has '+totalRepairers+'/'+desiredRepairers+' repairers');
                console.log('_________________________');
            }
        }

        if(totalHarvesters < desiredHarvesters){                CreateCreep.run(thisRoom, 'harvester',      {}, 'normal');
        }else if(totalRefillers < desiredRefillers){            CreateCreep.run(thisRoom, 'refiller',       {}, 'normal');
        }else if(totalMiners < desiredMiners){                  CreateCreep.run(thisRoom, 'miner',          {}, 'normal');
        }else if(totalLinkManagers < desiredLinkManagers){      CreateCreep.run(thisRoom, 'linkManager',    {}, 'normal');
        }else if(totalScavengers < desiredScavengers){          CreateCreep.run(thisRoom, 'scavenger',      {}, 'normal');
        }else if(totalBuilders < desiredBuilders){              CreateCreep.run(thisRoom, 'builder',        {}, 'normal');
        }else if(totalRepairers < desiredRepairers){            CreateCreep.run(thisRoom, 'repairer',       {}, 'normal');
        }else if(totalUpgraders < desiredUpgraders){            CreateCreep.run(thisRoom, 'upgrader',       {}, 'normal');
        }else if(totalExtractors < desiredExtractors){          CreateCreep.run(thisRoom, 'extractor',      {}, 'normal');
        }else if(totalMineralHaulers < desiredMineralHaulers){  CreateCreep.run(thisRoom, 'mineralHauler',  {}, 'normal');
        }else if(totalRouters < desiredRouters){                CreateCreep.run(thisRoom, 'router',         {}, 'normal');
        }else{ thisRoom.memory.isSpawning = false;}
        //console.log(thisRoom.name+' -> '+totalUpgraders);
    }
};


module.exports = countCreeps;





