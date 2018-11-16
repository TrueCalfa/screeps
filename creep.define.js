/*
De: https://www.reddit.com/r/screeps/comments/7ow0ns/create_better_creeps/
*/
let DefineCreepBody = {
    run: function(thisRoom, role, spawn){

        let creepAtt = {};
        let creepName = '';
        let creepBody = [];
        //let maxBodyCost = (thisRoom.energyAvailable -(thisRoom.energyAvailable % 50));
        //console.log(role);
        creepBody = this.CreateBody(thisRoom, role);
        let ticksToDie = creepBody.length * 3;
        switch(role){
            case 'router':{
                creepName = 'Router';
                let routerAtt = { role: 'router',  mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'moving', ticksToDie: ticksToDie };
                creepAtt = Object.assign(routerAtt);
            }break;
            case 'linkManager':{
                creepName = 'LinkManager';
                let linkManagerAtt = { role: 'linkManager',  mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'loading', ticksToDie: ticksToDie };
                creepAtt = Object.assign(linkManagerAtt);
            }break;
            case 'harvester':{
                creepName = 'Harvester';
                let harvesterAtt =          { role: 'harvester',    mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'loading', ticksToDie: ticksToDie };
                creepAtt = Object.assign(harvesterAtt);
            }break;
            case 'builder':{
                creepName = 'Builder';
                let builderAtt =            { role: 'builder',      mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'loading', targetToBuild: 0, ticksToDie: ticksToDie };
                creepAtt = Object.assign(builderAtt);
            }break;
            case 'repairer':{
                creepName = 'Repairer';
                let repairerAtt =           { role: 'repairer',     mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'loading', targetToRepair: 0, ticksToDie: ticksToDie };
                creepAtt = Object.assign(repairerAtt);
            }break;
            case 'upgrader':{
                creepName = 'Upgrader';
                let upgraderAtt =           { role: 'upgrader',     mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'loading', ticksToDie: ticksToDie, inPosition: false };
                creepAtt = Object.assign(upgraderAtt);
            }break;
            case 'miner':{
                creepName = 'Miner';
                let minerAtt =              { role: 'miner',        mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'harvesting', myContainer: 0, mySource: 0, ticksToDie: ticksToDie };
                creepAtt = Object.assign(minerAtt);
            }break;
            case 'refiller':{
                creepName = 'Refiller';
                let refillerAtt =           { role: 'refiller',     mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'loading', ticksToDie: ticksToDie };
                creepAtt = Object.assign(refillerAtt);
            }break;
            case 'scavenger':{
                creepName = 'Scavenger';
                let scavengerAtt =          { role: 'scavenger',    mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'loading', ticksToDie: ticksToDie };
                creepAtt = Object.assign(scavengerAtt);
            }break;
            case 'extractor':{
                creepName = 'Extractor';
                let extractorAtt =          { role: 'extractor',    mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'working', ticksToDie: ticksToDie };
                creepAtt = Object.assign(extractorAtt);
            }break;
            case 'mineralHauler':{
                creepName = 'Mineral_Hauler';
                let mineralHaulerAtt =          { role: 'mineralHauler',    mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'working', ticksToDie: ticksToDie };
                creepAtt = Object.assign(mineralHaulerAtt);
            }break;
            case 'flagHarvester':{
                creepName = 'Flag_Harvester';
                let flagHarvesterAtt =      { role: 'flagHarvester',mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'loading', ticksToDie: ticksToDie };
                creepAtt = Object.assign(flagHarvesterAtt);
            }break;
            case 'flagBuilder':{
                creepName = 'Flag_Builder';
                let flagBuilderAtt =        { role: 'flagBuilder',  mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'loading', ticksToDie: ticksToDie };
                creepAtt = Object.assign(flagBuilderAtt);
            }break;
            case 'flagRepairer':{
                creepName = 'Flag_Repairer';
                let flagRepairerAtt =       { role: 'flagRepairer', mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'loading', ticksToDie: ticksToDie };
                creepAtt = Object.assign(flagRepairerAtt);
            }break;
            case 'flagScavenger':{
                creepName = 'Flag_Scavenger';
                let flagScavengerAtt =      { role: 'flagScavenger',mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'picking', myLink: 0, ticksToDie: (ticksToDie + 50) };
                creepAtt = Object.assign(flagScavengerAtt);
            }break;
            case 'flagMiner':{
                creepName = 'Flag_Miner';
                let flagMinerAtt =          { role: 'flagMiner',    mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'moving', ticksToDie: (ticksToDie + 50) };
                creepAtt = Object.assign(flagMinerAtt);
            }break;
            case 'flagTowerTest':{
                creepName = 'Flag_Tower_T';
                let flagTowerTestAtt =       { role: 'flagTowerTest',  mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'moving', ticksToDie: ticksToDie };
                creepAtt = Object.assign(flagTowerTestAtt);
            }break;
            case 'flagDefender':{
                creepName = 'Flag_Defender';
                let flagDefenderAtt =        { role: 'flagDefender',  mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'moving', ticksToDie: ticksToDie };
                creepAtt = Object.assign(flagDefenderAtt);
            }break; 
            case 'flagHealer':{
                creepName = 'Flag_Healer';
                let flagHealerAtt =        { role: 'flagHealer',  mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'moving', ticksToDie: ticksToDie };
                creepAtt = Object.assign(flagHealerAtt);
            }break; 
            case 'flagClaimer':{
                creepName = 'Flag_Claimer';
                let flagClaimerAtt =        { role: 'flagClaimer',  mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'moving', ticksToDie: ticksToDie };
                creepAtt = Object.assign(flagClaimerAtt);
            }break; 
            case 'flagReserver':{
                creepName = 'Flag_Reserver';
                let flagReserverAtt =       { role: 'flagReserver', mySpawn: spawn.name , myRoom: thisRoom.name,  born: Game.time, task: 'moving', ticksToDie: ticksToDie };
                creepAtt = Object.assign(flagReserverAtt);
            }break;
        }
        let result =  [creepName, creepAtt, creepBody];
        return result;
    },
    
    CreateBody: function(thisRoom, role){
        let maxEnergy;
        let availableEnergy = thisRoom.energyAvailable;
        
        //let currEnergy = thisRoom.energyAvailable;
        let maxBodyParts;
        let basicBodyParts = [];
        let basicBodyCost;
        let body = [];
        let perc;
        switch(role){
            case 'router':{
                basicBodyParts = [MOVE];
                basicBodyCost = 50;
                maxBodyParts = 1;
                perc = 0.1;
            }break;
            case 'linkManager':{
                //basicBodyCost = [50, 50];
                basicBodyParts = [MOVE, CARRY];
                basicBodyCost = 100;
                maxBodyParts = 48;
                perc = 0.4;
            }break;
            case 'harvester':{
                basicBodyParts = [WORK, CARRY, MOVE, CARRY];
                maxBodyParts = 30;
                perc = 1;
            }break;
            case 'builder':{
                basicBodyParts = [WORK, MOVE, CARRY, MOVE, CARRY, MOVE];
                basicBodyCost = 350;
                maxBodyParts = 50;
                perc = 0.4;
            }break;
            case 'repairer':{
                basicBodyParts = [WORK, MOVE, CARRY, MOVE, CARRY, MOVE];
                basicBodyCost = 350;
                maxBodyParts = 32;
                perc = 0.4;
            }break;
            case 'upgrader':{
                basicBodyParts = [WORK, MOVE, CARRY];
                basicBodyCost = 200;
                let myStorage = Game.getObjectById(thisRoom.memory.myStorage);
                if(thisRoom.controller.level != 8){
                    if(myStorage){
                        if(myStorage.store.energy > 100000){
                            let n = (myStorage.store.energy - myStorage.store.energy % 100000)/100000;
                            maxBodyParts = 16*n;
                            if(maxBodyParts > 50){
                                maxBodyParts = 50;
                            }
                        }else{
                            maxBodyParts = 18;
                        }
                    }else{
                        maxBodyParts = 12;
                    }
                }else{
                    maxBodyParts = 3;
                }
                //maxBodyParts = 42;
                perc = 0.66;
            }break;
            case 'miner':{
                basicBodyParts = [WORK, MOVE];
                basicBodyCost = 150;
                maxBodyParts = 15;
                perc = 0.5;
            }break;
            case 'refiller':{
                basicBodyParts = [CARRY, MOVE];
                basicBodyCost = 100;
                maxBodyParts = 40;
                perc = 0.35;
            }break;
            case 'scavenger':{
                basicBodyParts = [MOVE, CARRY];
                basicBodyCost = 100;
                maxBodyParts = 40;
                perc = 0.6;
            }break;
            case 'extractor':{
                basicBodyParts = [WORK, MOVE, WORK];
                basicBodyCost = 250;
                maxBodyParts = 12;
                perc = 0.5;
            }break;
            case 'mineralHauler':{
                basicBodyParts = [MOVE, CARRY];
                basicBodyCost = 100;
                maxBodyParts = 10;
                perc = 0.3;
            }break;
            case 'flagHarvester':{
                basicBodyParts = [WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
                basicBodyCost = 350;
                maxBodyParts = 25;
                perc = 0.3;
            }break;
            case 'flagBuilder':{
                basicBodyParts = [WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
                basicBodyCost = 350;
                maxBodyParts = 25;
                perc = 0.3;
            }break;
            case 'flagRepairer':{
                basicBodyParts = [WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
                basicBodyCost = 350;
                maxBodyParts = 24;
                perc = 0.3;
            }break;
            case 'flagScavenger':{
                basicBodyParts = [CARRY, MOVE];
                basicBodyCost = 100;
                maxBodyParts = 32;
                perc = 0.3;
            }break;
            case 'flagMiner':{
                basicBodyParts = [WORK, MOVE];
                basicBodyCost = 100;
                maxBodyParts = 12;
                perc = 0.3;
            }break;
            case 'flagTowerTest':{
                basicBodyParts = [TOUGH, MOVE];
                basicBodyCost = 60;
                maxBodyParts = 4;
                perc = 0.3;
            }break;
            case 'flagDefender':{
                basicBodyParts = [RANGED_ATTACK, ATTACK, MOVE, MOVE];
                basicBodyCost = 330;
                maxBodyParts = 20;
                perc = 0.3;
            }break; 
            case 'flagHealer':{
                basicBodyParts = [HEAL, MOVE];
                basicBodyCost = 300;
                maxBodyParts = 10;
                perc = 0.3;
            }break; 
            case 'flagClaimer':{
                basicBodyParts = [CLAIM, MOVE];
                basicBodyCost = 650;
                maxBodyParts = 4;
                perc = 0.3;
            }break; 
            case 'flagReserver':{
                basicBodyParts = [CLAIM, MOVE];
                basicBodyCost = 650;
                maxBodyParts = 4;
                perc = 0.5;
            }break; 
        }
        maxEnergy = thisRoom.energyCapacityAvailable;
        let nextPartCost = 0;
        if(availableEnergy <= 300){
            maxEnergy = 300;
        }else if(availableEnergy > maxEnergy*0.8){
            maxEnergy = maxEnergy*perc;
        }else{
            maxEnergy = availableEnergy*perc;
        }
        let maxBodyCost = maxEnergy;
        while(maxBodyCost >= nextPartCost && maxBodyParts > 0){
            for(let i in basicBodyParts){
                if((maxBodyCost) >= BODYPART_COST[basicBodyParts[i]] && maxBodyParts > 0){
                    body.push(basicBodyParts[i]);
                    maxBodyCost -= BODYPART_COST[basicBodyParts[i]];
                    maxBodyParts --;
                    if(i < (basicBodyParts.length-1)){
                        nextPartCost = BODYPART_COST[basicBodyParts[i]];
                    }else{
                        nextPartCost = BODYPART_COST[basicBodyParts[0]];
                    }
                }else{
                    //console.log(maxEnergy*perc, " / ",maxEnergy, "  -  ", body);
                    break;
                }
            }
        
            //maxEnergy -= basicBodyCost;
            //maxBodyParts -= basicBodyParts.length;
        }
        if(body.length > basicBodyParts.length){
            return body;
        }else{
            return basicBodyParts;
        }
        
    },
    CalculateBodyCost: function(bodyParts){
        result = [];
        for(let i in bodyParts){
            result[i] = BODYPART_COST[bodyParts[i]];
            console.log(result[i]);
        }
    },
    PartsCost: function(part){
        switch(part){
            case 'TOUGH':
                return 10;
            break;
            case 'MOVE':
            case 'CARRY':
                return 50;
            break;
            case 'WORK':
            return 100;
            break;
            case 'ATTACK':
                return 80;
            break;
            case 'RANGED_ATTACK':
                return 150;
            break;
            case 'HEAL':
                return 250;
            break;
            case 'CLAIM':
                return 600;
            break;
        }
    }
}
module.exports = DefineCreepBody;
