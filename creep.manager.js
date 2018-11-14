const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');
const roleMiner = require('role.miner');
const roleScavenger = require('role.scavenger');
const roleRefiller = require('role.refiller');
const roleExtractor = require('role.extractor');
const roleMineralHauler = require('role.mineralHauler');
const roleFlagHarvester = require('role.flagHarvester');
const roleFlagClaimer = require('role.flagClaimer');
const roleFlagBuilder = require('role.flagBuilder');
const roleFlagReserver = require('role.flagReserver');
const roleFlagRepairer = require('role.flagRepairer');
const roleFlagMiner = require('role.flagMiner');
const roleFlagScavenger = require('role.flagScavenger');
const roleLinkManager = require('role.linkManager');
const roleFlagAttacker = require('role.flagAttacker');
const roleFlagHealer = require('role.flagHealer');
const roleFlagTowerTest = require('role.flagTowerTest');
const roleRouter = require('role.router');
let manageCreeps = {
    run: function(){
        let start;
        let end;
        let debug = 0;
        
        for(var name in Game.creeps) {
            let c = Game.creeps[name];
            if(debug){
                start = Game.cpu.getUsed();
            }
            switch(c.memory.role){
                case 'router':{
                    if(c.hits == c.hitsMax){
                        //this.ResetTower(c);
                        roleRouter.run(c);
                    }else{
                        this.Flee(c);
                    }
                }break;
                case 'harvester':{
                    if(c.hits == c.hitsMax){
                        //this.ResetTower(c);
                        roleHarvester.run(c);
                    }else{
                        this.Flee(c);
                    }
                }break;
                case 'miner':{
                    if(c.hits == c.hitsMax){
                        //this.ResetTower(c);
                        roleMiner.run(c);
                    }else{
                        this.Flee(c);
                    }
                }break;
                case 'scavenger':{
                    if(c.hits == c.hitsMax){
                        //this.ResetTower(c);
                        roleScavenger.run(c);
                    }else{
                        this.Flee(c);
                    }
                }break;
                case 'refiller':{
                    if(c.hits == c.hitsMax){
                        //this.ResetTower(c);
                        roleRefiller.run(c);
                    }else{
                        this.Flee(c);
                    }
                }break;
                case 'builder':{
                    if(c.hits == c.hitsMax){
                        //this.ResetTower(c);
                        if(!c.room.memory.constructionSites || c.room.memory.constructionSites.length == 0){
                            if((!c.room.memory.damagedStructures || c.room.memory.damagedStructures.length == 0) && (!c.room.memory.otherDamagedStructures || c.room.memory.otherDamagedStructures.length == 0)){
                                roleUpgrader.run(c);
                            }else{
                                roleRepairer.run(c);
                            }
                        }else{
                            roleBuilder.run(c);
                        }
                    }else{
                        this.Flee(c);
                    }
                }break;
                case 'repairer':{
                    if(c.hits == c.hitsMax){
                        //this.ResetTower(c);
                        if((!c.room.memory.damagedStructures || c.room.memory.damagedStructures.length == 0) &&
                        (!c.room.memory.otherDamagedStructures || c.room.memory.otherDamagedStructures.length == 0)){
                            roleUpgrader.run(c);
                        }else{
                            c.memory.inPosition = false;
                            roleRepairer.run(c);
                        }
                    }else{
                        this.Flee(c);
                    }
                }break;
                case 'upgrader':{
                    if(c.hits == c.hitsMax){
                        //this.ResetTower(c);
                        roleUpgrader.run(c);
                    }else{
                        this.Flee(c);
                    }
                }break;
                case 'linkManager':{
                    if(c.hits == c.hitsMax){
                        //this.ResetTower(c);
                        roleLinkManager.run(c);
                    }else{
                        this.Flee(c);
                    }
                }break;
                case 'flagClaimer':{
                    roleFlagClaimer.run(c);
                }break;
                case 'flagHarvester':{
                    roleFlagHarvester.run(c);
                }break;
                case 'flagBuilder':{
                    roleFlagBuilder.run(c);
                }break;
                case 'flagReserver':{
                    roleFlagReserver.run(c);
                }break;
                case 'flagRepairer':{
                    roleFlagRepairer.run(c);
                }break;
                case 'flagMiner':{
                    roleFlagMiner.run(c);
                }break;
                case 'flagScavenger':{
                    roleFlagScavenger.run(c);
                }break;
                case 'flagAttacker':{
                    roleFlagAttacker.run(c);
                }break;
                case 'flagHealer':{
                    roleFlagHealer.run(c);
                }break;
                case 'baiterPack':{
                    packBaiter.run(c);
                }break;
                case 'flagTowerTest':{
                    roleFlagTowerTest.run(c);
                }break;
                case 'extractor':{
                    if(c.hits == c.hitsMax){
                        //this.ResetTower(c);
                        roleExtractor.run(c);
                    }else{
                        this.Flee(c);
                    }
                }break;
                case 'mineralHauler':{
                    if(c.hits == c.hitsMax){
                        //this.ResetTower(c);
                        roleMineralHauler.run(c);
                    }else{
                        this.Flee(c);
                    }
                }
            }
            if(debug){
                end = Game.cpu.getUsed();
                if(end-start > 2){
                    console.log(c.memory.role, " - ", end-start);
                }
            }
            
        }
    },
    Flee: function(creep){
        if(!creep.memory.myTower || creep.memory.myTower == 0){
            let myTower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_TOWER);
                }
            });
            if(myTower){
                creep.memory.myTower = myTower.id;
            }
            
        }else if(creep.memory.myTower != 0){
            let myTower = Game.getObjectById(creep.memory.myTower);
            if(!creep.pos.inRangeTo(myTower, 5)){
                creep.travelTo(myTower);
                if(creep.memory.inPosition){
                    creep.memory.inPosition = false;
                }
            }
        }
    },
    ResetTower: function(c){
        if(!c.memory.myTower || c.memory.myTower != 0){
            c.memory.myTower = 0;
        }
    }
}

module.exports = manageCreeps;