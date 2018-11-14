//const GoClaim = require('Routines.goClaim');
const GoFarm = require('job.harvest');
//const Utils = require('tools');
const UnloadEnergy = require('job.unloadEnergy');
const GoBuild = require('job.build');
//const GoRepair = require('job.repair');
const LoadEnergy = require('job.loadEnergy');
const AssignNewFlag = require('flag.assignNew');
const PickEnergy = require('job.pickEnergy');
var roleRemoteHarvester = {

    run: function(creep) {

        let flag = Game.flags[creep.memory.targetFlag];
        if(flag && flag.color == COLOR_BLUE){
                this.SetTask(creep);
                let flagRoom = flag.pos.roomName;
                let creepBornRoom = creep.memory.myRoom;
                let curRoom = creep.room.name;
                let harvesting = creep.memory.harvesting;
                //console.log(creep.pos.roomName,' == ',flag.pos.roomName,'???');
                
//Room donde nacio CREEP    VS      Room donde esta la FLAG
                if(creepBornRoom == flagRoom){
                        
                        if(harvesting == true){
                            let pickEnergyResult = (PickEnergy.run(creep, ['notFull'], Infinity));
                            if(pickEnergyResult == 'noTarget'){
                                if(null==creep.memory.mySource){
                                    let source = creep.pos.findClosestByRange(FIND_SOURCES);
                                    creep.memory.mySource = source.id;
                                }
                                let mySource = creep.memory.mySource;
                                let farmResult = GoFarm.run(creep, mySource, 0);
                            }
                            
                        }else{
                            
                            let unloadStructures = ['links','containers'];
                            let unloadResult = UnloadEnergy.run(creep, unloadStructures);
                            
                        }

//Room donde esta el CREEP  VS      Room donde nacio el CREEP                        
                }else if(curRoom == creepBornRoom){
                    
                        if(harvesting == true){
                            
                            if(!creep.fatige){
                                creep.travelTo(flag);
                            }
                            
                        }else{
                            
                            let unloadStructures = ['links','containers'];
                            let unloadResult = UnloadEnergy.run(creep, unloadStructures);
                        }

//Room donde esta el CREEP      VS      Room donde esta la FLAG                    
                }else if(creep.pos.roomName == flag.pos.roomName){
                
                        if(harvesting == true){
                            let pickEnergyResult = (PickEnergy.run(creep, ['notFull'], Infinity));
                            if(pickEnergyResult == 'noTarget'){
                                let loadResult = LoadEnergy.run(creep, ['containers','storages'], creep.carryCapacity, Infinity);
                                if(loadResult != OK && loadResult != ERR_NOT_IN_RANGE){
                                    //GoHarvest.run(creep);
                                    if(null==creep.memory.mySource){
                                        let source = creep.pos.findClosestByRange(FIND_SOURCES);
                                        creep.memory.mySource = source.id;
                                    }
                                    let mySource = creep.memory.mySource;
                                    let farmResult = GoFarm.run(creep, mySource, 0);
                                }
                            }
                            
                        }else{
                            
                            let unloadResult = UnloadEnergy.run(creep, ['spawns', 'extensions']);
                            if(unloadResult == 'noTarget'){
                                let buildResult = GoBuild.run(creep, 4);
                                if(buildResult == 'NO' || buildResult == ERR_INVALID_TARGET){
                                        let repairSites = _.filter(creep.pos.findInRange(FIND_STRUCTURES, 0),function(b){ return b.structureType == STRUCTURE_ROAD && b.hits <b.hitsMax*0.3;});
                                        if(repairSites.length){
                                            let repairResult = creep.repair(repairSites[0]);
                                        }
                                    if(!creep.fatige){
                                        creep.travelTo(new RoomPosition(8,36,creep.memory.myRoom));
                                    
                                    }
                                }
                            }
                        }
                }else{
                    
                    if(harvesting == true){
                            
                        if(!creep.fatige){
                            creep.travelTo(flag);
                        }
                        
                    }else{
                        
                        let buildResult = GoBuild.run(creep, 3);
                        if(buildResult == 'NO' || buildResult == ERR_INVALID_TARGET){
                                let repairSites = _.filter(creep.pos.findInRange(FIND_STRUCTURES, 0),function(b){ return b.structureType == STRUCTURE_ROAD && b.hits <b.hitsMax*0.3;});
                                if(repairSites.length){
                                    let repairResult = creep.repair(repairSites[0]);
                                }
                            if(!creep.fatige){
                                creep.travelTo(new RoomPosition(8,36,creep.memory.myRoom));
                            
                            }
                        }
                    }
                }
        }else{
            
            creep.memory.mySource = null;
            AssignNewFlag.run(creep, COLOR_BLUE, COLOR_BLUE);

        }
    },
    SetTask: function(creep){
        if((_.sum(creep.carry) == 0 && creep.memory.harvesting == false) || creep.memory.harvesting == null){
            creep.memory.harvesting = true;
            creep.memory.unloadTo = 0;
        }else if(_.sum(creep.carry) == creep.carryCapacity){
            creep.memory.harvesting = false;
            creep.memory.loadFrom = 0;
        }
    }
};

module.exports = roleRemoteHarvester;