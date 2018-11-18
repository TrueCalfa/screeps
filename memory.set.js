const EachFive = require('memory.eachFive');
const EachTwenty = require('memory.eachTwenty');
const EachHundred = require('memory.eachHundred');


let setMemory = {

    run: function(thisRoom){

        EachFive.run(thisRoom);
        EachTwenty.run(thisRoom);
        EachHundred.run(thisRoom);

        
        
        //ANY CONSTRUCTION SITES?

        let consSites = [];
        consSites = thisRoom.find(FIND_CONSTRUCTION_SITES);
        if(consSites.length > 0){
            thisRoom.memory.constructionSites = consSites;
        }else{
            thisRoom.memory.constructionSites = [];
        }
        //ARE THERE ANY TOWERS IN THIS ROOM?
        //this.FindTowers(thisRoom);
        //ANY DAMAGED STRUCTURES?
        //De esta forma encuentro todas las estructuras y luego miro cuales estan dañadas y las clasifico
        let debug = false;
        let start;
        let end;
        if(debug){
            start = Game.cpu.getUsed();
        }
        this.FindStructures(thisRoom);
        if(debug){
            end = Game.cpu.getUsed();
            console.log("Set memory: ", end-start);
        }

        



        
    },
    FindStructures: function(thisRoom){
        let damagedStructures = [];
        let otherDamagedStructures = [];
        let myTowers = [];
        let myStructures = [];
        let spawnInfo = [];
        let myUpgradersContainer;
        let myStorage;
        let myTerminal;
        let rampartsMaxHP = 0;
        let initialRampartsMaxHP = 0;
        if(thisRoom.controller && thisRoom.controller.my){
            if(thisRoom.controller.level != 8){
                 rampartsMaxHP = this.SetRampartsMaxHP(thisRoom);
            }else{
                if(!thisRoom.memory.otherDamagedStructuresMaxHP){
                    thisRoom.memory.otherDamagedStructuresMaxHP = 0;
                    thisRoom.memory.initialRampartRepairGameTime = Game.time;
                }else{
                    thisRoom.memory.otherDamagedStructuresMaxHP = Game.time - thisRoom.memory.initialRampartRepairGameTime;
                    rampartsMaxHP = thisRoom.memory.otherDamagedStructuresMaxHP;
                }
            }
        }
        let wallsMaxHP = this.SetWallsMaxHP(thisRoom);
        myStructures = thisRoom.find(FIND_STRUCTURES);
        for(let i in myStructures){
            let s = myStructures[i];
            if((s.structureType == STRUCTURE_RAMPART && s.hits < rampartsMaxHP) ||
            (s.structureType == STRUCTURE_WALL && s.hits < wallsMaxHP)){
                otherDamagedStructures.push(s.id);
            }else if(s.structureType != STRUCTURE_RAMPART && s.structureType != STRUCTURE_WALL && s.structureType && s.hits < s.hitsMax){
                damagedStructures.push(s.id);
            }
            
            if(s.structureType == STRUCTURE_TOWER){
                myTowers.push(s.id);
            }else if(s.structureType == STRUCTURE_SPAWN){
                spawnInfo.push({name: s.name, id: s.id, pos: {x:s.pos.x, y: s.pos.y}});
            }else if(s.structureType == STRUCTURE_STORAGE){
                myStorage = s.id;
            }else if(s.structureType == STRUCTURE_TERMINAL){
                myTerminal = s.id;
            }
            //else if(s.structureType == STRUCTURE_CONTAINER && s.id != thisRoom.memory.mineralContainer && !_.includes(thisRoom.memory.sourceContainers, s.id)){
            else if(s.structureType == STRUCTURE_CONTAINER && s.id != thisRoom.memory.mineralContainer && !(s.pos.findInRange(FIND_SOURCES, 1).length > 0)){
                myUpgradersContainer = s.id;
            }
        }
        if(damagedStructures.length > 0){
            damagedStructures.sort((a,b) => a.hits - b.hits);
        }
        if(otherDamagedStructures.length > 0){
            otherDamagedStructures.sort((a,b) => a.hits - b.hits);
        }
        thisRoom.memory.damagedStructures = damagedStructures;
        thisRoom.memory.otherDamagedStructures = otherDamagedStructures;
        thisRoom.memory.towers = myTowers;
        thisRoom.memory.spawns = spawnInfo;
        thisRoom.memory.myUpgradersContainer = myUpgradersContainer;
        thisRoom.memory.myStorage = myStorage;
        thisRoom.memory.terminal = myTerminal;
    },
    SetRampartsMaxHP: function(thisRoom){
        if(thisRoom.controller && thisRoom.controller.my){
            switch(thisRoom.controller.level){
                case 1:
                    return 0;
                break;
                case 2:
                    return 30000;
                break;
                case 3:
                    return 100000;
                break;
                case 4:
                    return 300000;
                break;
                case 5:
                    return 500000;
                break;
                case 6:
                    return 500000;
                break;
                case 7:
                    return 500000;
                break;
                case 8:
                    return 500000;
                break;
            }
        }
    },
    SetWallsMaxHP: function(thisRoom){
        if(thisRoom.controller && thisRoom.controller.my){
            switch(thisRoom.controller.level){
                case 1:
                    return 0;
                break;
                case 2:
                    return 30000;
                break;
                case 3:
                    return 100000;
                break;
                case 4:
                    return 300000;
                break;
                case 5:
                    return 500000;
                break;
                case 6:
                    return 500000;
                break;
                case 7:
                    return 500000;
                break;
                case 8:
                    return 500000;
                break;
            }
        }   
    
    }
    /*
    ,
    FindTowers: function(thisRoom){
        let myTowers = thisRoom.find(FIND_STRUCTURES, {
            filter: (s) => {
                return (s.structureType == STRUCTURE_TOWER);
            }
        });
        if(!thisRoom.memory.towers){
            thisRoom.memory.towers = [];
        }else{
            thisRoom.memory.towers = myTowers;
        }
    },
    SetSpawns: function(thisRoom){
        //A partir de ctrl lvl 7 tendre mas de 1 spawn por room, y es posible que los quite y los ponga. Asi se actualizara mas rapido
        if(null == thisRoom.memory.spawns || thisRoom.controller.level > 6){
            let mySpawns = thisRoom.find(FIND_MY_SPAWNS);
            if(mySpawns && mySpawns.length > 0){
                let spawnInfo = [];
                for(let i in mySpawns){
                    spawnInfo.push({name: mySpawns[i].name, id: mySpawns[i].id, pos: {x:mySpawns[i].pos.x, y: mySpawns[i].pos.y}});
                }
                thisRoom.memory.spawns = spawnInfo;
            }else{
                thisRoom.memory.spawns = null;
            }
        }
    },
    FindUpgradersContainer: function(thisRoom){
        if(!thisRoom.memory.myUpgradersContainer){
            let myUpgradersContainer = thisRoom.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.id != thisRoom.memory.mineralContainer && !(s.pos.findInRange(FIND_SOURCES, 1).length > 0)
            });
            if(myUpgradersContainer && myUpgradersContainer.length > 0){
                thisRoom.memory.myUpgradersContainer = myUpgradersContainer[0].id;
            }
        }
    },
    SetStorages: function(thisRoom){
        let myStorage = thisRoom.find(FIND_STRUCTURES, { filter: (s) => s.structureType === STRUCTURE_STORAGE });
        if(myStorage && myStorage.length > 0){
            thisRoom.memory.myStorage = myStorage[0].id;
        }
    },
    SetTerminals: function(thisRoom){
        let myTerminal = thisRoom.find(FIND_STRUCTURES, { filter: (s) => s.structureType ===STRUCTURE_TERMINAL });
        if(myTerminal && myTerminal.length > 0){
            thisRoom.memory.terminal = myTerminal[0].id;
        }
    }
    */
};

module.exports = setMemory;

/* 
//ARE THERE ANY CORE STRUCTURES (AND ROADS) DAMAGED?
        let damagedStructures = thisRoom.find(FIND_STRUCTURES, {
            filter: function(q){
                return (q.hits < q.hitsMax && q.structureType != STRUCTURE_WALL && q.structureType != STRUCTURE_RAMPART)
            }
        });
        damagedStructures.sort((a,b) => a.hits - b.hits);
        thisRoom.memory.damagedStructures = damagedStructures;


//ARE THERE ANY DAMAGED WALLS OR RAMPARTS?
        let rampartsMaxHP = this.SetRampartsMaxHP(thisRoom);
        let wallsMaxHP = this.SetWallsMaxHP(thisRoom);
        let otherDamagedStructures = thisRoom.find(FIND_STRUCTURES, {
            filter: function(q){
                return ((q.structureType == STRUCTURE_RAMPART && q.hits < rampartsMaxHP) ||                                     //3.3% (Para un RAMPART de 10M de vida -> 330.000)
                        (q.structureType == STRUCTURE_WALL && q.hits < wallsMaxHP));                                         //0.1% (Para una WALL de 300M de vida  -> 300.000)
            }
        });
        otherDamagedStructures.sort((a,b) => a.hits - b.hits);
        thisRoom.memory.otherDamagedStructures = otherDamagedStructures;
 */
