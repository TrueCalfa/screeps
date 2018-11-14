const CreateCreep = require('creep.spawn');
const Show = require('show.info');

var FlagManager = {
    
    run: function(flag){
        if(!flag.memory.timeToGo || Game.time > flag.memory.timeToGo){
            if(Number.isInteger(parseInt(flag.name))){
                this.RoleFlag(flag);
            }
        }
    },

    RoleFlag: function(flag){
        let desiredMinions = 0;
        let currentMinions = 0;
        desiredMinions = parseInt(flag.name);
        flag.memory.desiredMinions = desiredMinions;
        
        for(let i in Game.creeps){
            
            let creep = Game.creeps[i];
            let ticksToDie;
            if(creep.memory.ticksToDie){
                ticksToDie = creep.memory.ticksToDie;
            }else{
                ticksToDie = 100;
            }
            if(creep.memory.targetFlag == flag.name && (creep.spawning || creep.ticksToLive > ticksToDie )){
            
                currentMinions++;
            }
        }

        flag.memory.currentMinions = currentMinions;
        if(SHOW_FLAG_INFO){
            Show.assignedMinions(flag, desiredMinions, currentMinions);
        }

        if(currentMinions < desiredMinions){
            
            let minDist = 10;
            let distance = 0;
            let targetSpawn = null;
            if(_.isString(flag.memory.targetRoom)){
    
                targetSpawn = Game.getObjectById(Game.rooms[flag.memory.targetRoom].memory.spawns[0].id);
                
            }else{
                for (let i in Game.rooms){

                    if(Game.rooms[i].controller && Game.rooms[i].controller.my){
        
                        distance = Game.map.getRoomLinearDistance(flag.pos.roomName, Game.rooms[i].name, true);
                        if(distance < minDist && null!=Game.rooms[i].memory.spawns){
                            minDist = distance;
                            flag.memory.targetRoom = Game.rooms[i].name;

                        }
                    }
                }
                targetSpawn = Game.getObjectById(Game.rooms[flag.memory.targetRoom].memory.spawns[0].id);
            }    

//Si tengo un spawn elegido para spawnear
            if(targetSpawn){

                let extendedAttributes = {};
                let creepRole = '';
                let result;
                switch(flag.color){
                //INVENTO RARO Y HASTA DONDE RECUERDO...USELESS    
                    case COLOR_WHITE:{
                        this.WhiteFlag(flag, targetSpawn);
                    }break;
                //SCAVENGE                    
                    case COLOR_ORANGE:
                        result = this.OrangeFlag(flag, targetSpawn);
                    break;
                //RESERVE / CLAIM
                    case COLOR_PURPLE:
                        result = this.PurpleFlag(flag, targetSpawn);
                    break;
                //HARVEST
                    case COLOR_BLUE:
                        result = this.BlueFlag(flag, targetSpawn);
                    break;
                //DEFENDER/HEALER
                    case COLOR_YELLOW:
                        result = this.YellowFlag(flag, targetSpawn);
                    break;
                //BUILD/ASSIST NEW ROOM
                    case COLOR_GREEN:
                        result = this.GreenFlag(flag, targetSpawn);
                    break;
                }
                
                let targetRoom = Game.rooms[flag.memory.targetRoom];
                creepRole = result[0];
                extendedAttributes = result[1];
                CreateCreep.run(targetRoom, creepRole, extendedAttributes, 'flag');
                
            }
        }
    },
    WhiteFlag: function(flag, targetSpawn){
        if(flag.secondaryColor == COLOR_WHITE){
            
            flag.memory.myRoom = 0;
            flag.memory.desiredMiners = 0;
            flag.memory.desiredScavengers = 0;
            flag.memory.desiredReservers = 0;
            flag.secondaryColor = COLOR_RED;
        
        }else if(flag.secondaryColor == COLOR_GREEN){
            
            if(flag.memory.desiredScavengers > 0){
                let flagName = flag.memory.desiredScavengers.toString();
                flag.room.createFlag(flag.pos.x-1, flag.pos.y-1, flagName, COLOR_ORANGE, COLOR_ORANGE);
            }
            if(flag.memory.desiredMiners > 0){
                let flagName = flag.memory.desiredMiners.toString();
                flag.room.createFlag(flag.pos.x-1, flag.pos.y+1, flagName, COLOR_ORANGE, COLOR_WHITE);
            }
            if(flag.memory.desiredRservers > 0){
                let flagName = flag.memory.desiredReservers.toString();
                flag.room.createFlag(flag.pos.x+1, flag.pos.y-1, flagName, COLOR_PURPLE, COLOR_PURPLE);
            }
            flag.remove();
        }
    },
    OrangeFlag: function(flag, targetSpawn){
        let creepRole;
        let extendedAttributes;
        if(flag.secondaryColor == COLOR_ORANGE){
            creepRole = 'flagScavenger';
            extendedAttributes = {mySpawn: targetSpawn.name,      targetFlag: flag.name.toString()    };
        }else if(flag.secondaryColor == COLOR_WHITE){
            creepRole = 'flagMiner';
            extendedAttributes = {mySpawn: targetSpawn.name,      targetFlag: flag.name.toString()    };
        }
        return [creepRole, extendedAttributes];
    },
    PurpleFlag: function(flag, targetSpawn){
        let creepRole;
        let extendedAttributes;
        if(flag.secondaryColor == COLOR_PURPLE){
            creepRole = 'flagReserver';
            extendedAttributes = {myRoom: flag.memory.targetRoom,   mySpawn: targetSpawn.name,      targetFlag: flag.name.toString()    };
        }else if(flag.secondaryColor == COLOR_WHITE){
            creepRole = 'flagClaimer';
            extendedAttributes = {myRoom: flag.memory.targetRoom,   mySpawn: targetSpawn.name,      targetFlag: flag.name.toString()    };
        }
        return [creepRole, extendedAttributes];
    },
    BlueFlag: function(flag, targetSpawn){
        let creepRole;
        let extendedAttributes;
        if(flag.secondaryColor == COLOR_BLUE){    
            creepRole = 'flagHarvester';
            extendedAttributes = {myRoom: flag.memory.targetRoom,   mySpawn: targetSpawn.name,      targetFlag: flag.name.toString(),   };
        }
        return [creepRole, extendedAttributes];
    },
    YellowFlag: function(flag, targetSpawn){
        let creepRole;
        let extendedAttributes;
        if(flag.secondaryColor == COLOR_YELLOW){    
            creepRole = 'flagAttacker';
            extendedAttributes = {myRoom: flag.memory.targetRoom,   mySpawn: targetSpawn.name,      targetFlag: flag.name.toString()    };
        }else if(flag.secondaryColor == COLOR_WHITE){    
            creepRole = 'flagHealer';
            extendedAttributes = {myRoom: flag.memory.targetRoom,   mySpawn: targetSpawn.name,      targetFlag: flag.name.toString(),   myBoss: 0    };
        }else if(flag.secondaryColor == COLOR_GREEN){
            creepRole = 'flagTowerTest';
            extendedAttributes = {myRoom: flag.memory.targetRoom,   mySpawn: targetSpawn.name,      targetFlag: flag.name.toString()    };
        }
        return [creepRole, extendedAttributes];
    },
    GreenFlag: function(flag, targetSpawn){
        let creepRole;
        let extendedAttributes;
        if(flag.secondaryColor == COLOR_GREEN){    
            creepRole = 'flagBuilder';
            extendedAttributes = {myRoom: flag.memory.targetRoom,   mySpawn: targetSpawn.name,      targetFlag: flag.name.toString(),       harvesting : true   };
        }else if(flag.secondaryColor == COLOR_WHITE){    
            creepRole = 'flagRepairer';
            extendedAttributes = {myRoom: flag.memory.targetRoom,   mySpawn: targetSpawn.name,      targetFlag: flag.name.toString(),       harvesting : true   };
        }
        return [creepRole, extendedAttributes];
    }
};

module.exports = FlagManager;