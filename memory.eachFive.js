/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('routines.eachFive');
 * mod.thing == 'a thing'; // true
 */
let eachFive = {
    run: function(thisRoom){
        if((Game.time +1) % 5 == 0){
            this.FindMyCreeps(thisRoom);
        //ANY DROPPED RESOURCES?
            this.FindDroppedResources(thisRoom);
        //ANY DAMAGED CREEPS?            
            this.FindDamagedCreeps(thisRoom);
        //ANY ENEMIES? (FOR ROOMS THAT DON'T BELONG TO ME, but might be reserved by me)
            this.FindEnemies(thisRoom);
        //ARE THERE ANY MINERS WITH NO CONTAINER ASSIGNED TO IT?
            this.FindUnassignedMiners(thisRoom);
        //SET DESIRED NUMBER OF CREEPS FOR EACH ROOM AND EACH ROLE
            this.SetDesiredNumberOfCreeps(thisRoom);
        }
    },
    SetDesiredNumberOfCreeps: function(thisRoom){
        if(thisRoom.controller){
            if(thisRoom.memory.spawns && thisRoom.memory.spawns.length > 0 && thisRoom.controller.my && thisRoom.controller.level > 0){
                if(thisRoom.controller.level < 3){
                    //Los valores globales se usan solo como valores iniciales.
                    //En caso de querer modificar, se tendra que hacer desde la memoria de cada room, o a traves del programa
                    if(null == thisRoom.memory.desiredHarvesters){      thisRoom.memory.desiredHarvesters = DESIRED_HARVESTERS; }
                    if(null == thisRoom.memory.desiredUpgraders){       thisRoom.memory.desiredUpgraders = DESIRED_UPGRADERS;   }
                    if(null == thisRoom.memory.desiredBuilders){        thisRoom.memory.desiredBuilders = DESIRED_BUILDERS;     }
                    if(null == thisRoom.memory.desiredMiners){          thisRoom.memory.desiredMiners = DESIRED_MINERS;         }
                    if(null == thisRoom.memory.desiredRefillers){       thisRoom.memory.desiredRefillers = DESIRED_REFILLERS;   }
                    if(null == thisRoom.memory.desiredScavengers){      thisRoom.memory.desiredScavengers = DESIRED_SCAVENGERS  }
                    if(null == thisRoom.memory.desiredExtractors){      thisRoom.memory.desiredExtractors = DESIRED_EXTRACTORS  }
                }else{
                    //Quiero tantos mineros como sourceContainers
                    let expectedMiners = thisRoom.memory.sourceContainers.length;
                    //Si quiero mineros
                    if(expectedMiners > 0){
                        let myStorage = Game.getObjectById(thisRoom.memory.myStorage);
                        if(thisRoom.controller.level == 8){
                            thisRoom.memory.desiredUpgraders = 1;
                        }else{
                            //Si el storage esta bastante lleno, quiero 3 upgraders
                            if(thisRoom.controller.level == 8){
                                thisRoom.memory.desiredUpgraders = 1;
                            }else if(myStorage && _.sum(myStorage.store) > myStorage.storeCapacity * 0.5){
                                thisRoom.memory.desiredUpgraders = 3;
                                //Si no esta tan lleno, quiero 2 upgraders
                            }else if(myStorage && _.sum(myStorage.store) > myStorage.storeCapacity * 0.3){
                                thisRoom.memory.desiredUpgraders = 2;
                                //Si no, quiero 1 solo
                            }else{
                                thisRoom.memory.desiredUpgraders = 1;
                            }
                        }
                        //Tb quiero...
                        thisRoom.memory.desiredRefillers = 1;
                        thisRoom.memory.desiredHarvesters = 0;
                        thisRoom.memory.desiredMiners = expectedMiners;
                        thisRoom.memory.desiredScavengers = 1;
                    //Pero si no quiero mineros aun...
                    }else{
                        thisRoom.memory.desiredUpgraders = 0;
                        thisRoom.memory.desiredRefillers = 0;
                        thisRoom.memory.desiredHarvesters = 3;
                        thisRoom.memory.desiredMiners = 0;
                        thisRoom.memory.desiredScavengers = 0;
                    }
                    //Si tengo storage y links, y ademas el linkTo tiene energia quiero 1 linkManager
                    //if(thisRoom.memory.myStorage && thisRoom.memory.linkTo && Game.getObjectById(thisRoom.memory.linkTo).energy > 0){
                    if(thisRoom.memory.myStorage && thisRoom.memory.linkTo){
                        thisRoom.memory.desiredLinkManagers = 1;
                    //Si no, ya no lo quiero
                    }else{
                        thisRoom.memory.desiredLinkManagers = 0;
                    }
                //DESIRED REPAIRERS
                    //Si no hay estructuras dañadas o la habitacion es lvl1
                    if((thisRoom.memory.damagedStructures.length == 0 || thisRoom.controller.level == 1)&& expectedMiners > 0){
                        thisRoom.memory.desiredRepairers = 0;
                    //Si hay estructuras dañadas y ademas la room es lvl2 o mas...
                    }else if(thisRoom.memory.damagedStructures.length > 1 || thisRoom.memory.otherDamagedStructures.length > 1){
                        thisRoom.memory.desiredRepairers = 1;
                    }
                //DESIRED BUILDERS
                    //Si no hay consSites o la habitacion es lvl1
                    if(thisRoom.memory.constructionSites.length == 0 || expectedMiners == 0){
                        //console.log(1);
                        thisRoom.memory.desiredBuilders = 0;
                    //Si hay consSites y ademas la room es lvl2 o mas
                    }else if(thisRoom.memory.constructionSites.length > 0 && expectedMiners > 0){
                        //console.log(2);
                        thisRoom.memory.desiredBuilders = 1;
                    }
                }
            }
        }
    },
    FindMyCreeps: function(thisRoom){
        let myCreeps = thisRoom.find(FIND_MY_CREEPS);
        let myCreepsIDs = [];
        for (let i in myCreeps){
            myCreepsIDs.push(myCreeps[i].id);
        }
        thisRoom.memory.myCreeps = myCreepsIDs;
    },
    FindDamagedCreeps: function(thisRoom){
        /* let someoneToHeal = thisRoom.find(FIND_MY_CREEPS, {
            filter: function(c){
                return(c.hits < c.hitsMax);
            }
        });
        thisRoom.memory.damagedCreeps =[];
        if(someoneToHeal && someoneToHeal.length > 0){
            for(let i in someoneToHeal){
                
                thisRoom.memory.damagedCreeps.push(someoneToHeal[i].id);
            }
        }
        */
        thisRoom.memory.damagedCreeps = [];
        if(thisRoom.memory.myCreeps && thisRoom.memory.myCreeps.length > 0){
            for (let i in thisRoom.memory.myCreeps){
                let thisCreep = Game.getObjectById(thisRoom.memory.myCreeps[i]);
                if(thisCreep.hits < thisCreep.hitsMax){
                    thisRoom.memory.damagedCreeps.push(thisCreep.id);
                }
            }
        }


    },
    FindUnassignedMiners: function(thisRoom){
        /*
        let unassignedMiners = thisRoom.find(FIND_MY_CREEPS, {
            filter: (c) => {
                return (c.memory.role == 'miner' && c.memory.myContainer == 0);
            }
        });            
        thisRoom.memory.unassignedMiners = unassignedMiners;
        */
       thisRoom.memory.unassignedMiners = [];
       for(let i in thisRoom.memory.myCreeps){
           let thisCreep = Game.getObjectById(thisRoom.memory.myCreeps[i]);
           if(thisCreep.memory.role == 'miner' && thisCreep.memory.myContainer == 0){
               thisRoom.memory.unassignedMiners.push(thisCreep);
           }
       }
    },
    FindDroppedResources: function(thisRoom){
        let drops = thisRoom.find(FIND_DROPPED_RESOURCES, {
            filter: (res) => {
                return ((res.resourceType == RESOURCE_ENERGY && res.amount >= 50) || (res.resourceType != RESOURCE_ENERGY && res.amount > 0));
            }
        });
        drops.sort((a,b) => b.amount - a.amount);
        if(drops != null && drops.length > 0){
            let droppedResources = [];
            let amount = 0;
            for(let i in drops){
                droppedResources.push(drops[i].id);
                amount += drops[i].amount;
                //({name: s.name, id: s.id, pos: {x:s.pos.x, y: s.pos.y}});
            }
            thisRoom.memory.droppedResources = droppedResources;
            //LET'S COUNT THE TOTAL AMOUN OF DROPPED ENERGY FOR THIS ROOM
            thisRoom.memory.totalDropped = amount;
        }else{
            thisRoom.memory.droppedResources = [];
            thisRoom.memory.totalDropped = 0;
        }
    },
    FindEnemies: function(thisRoom){
        if((thisRoom.controller && !thisRoom.controller.my) || !thisRoom.controller){
            let enemies = thisRoom.find(FIND_HOSTILE_CREEPS, {
                filter: (c) => {
//Lista de aliados!!!                    
                    return (c.owner.username != 'Staps' && c.owner.username != 'Robalian');
                }
            });
            let enemiesList = [];
            for(let i in enemies){
                enemiesList.push(enemies[i].id);
            }
            if(enemies && enemies.length >0){
                thisRoom.memory.enemies = enemiesList;
                thisRoom.memory.enemiesDie = Game.time + enemies[0].ticksToLive;
            }else{
                thisRoom.memory.enemies = [];
            }
        }
    }
    
};
module.exports = eachFive; 