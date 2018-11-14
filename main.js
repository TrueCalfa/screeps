const Traveler = require('Traveler');
const settings = require('user.Settings');
//const CreateCreep = require('routines.spawnCreep');
const ManageRoom = require('room.manager');
const ClearMemory = require('memory.clear');
//const CountCreeps = require('creep.count');
const ManageCreeps = require('creep.manager');
//const FlagInit = require('flag.init');
const FlagManager = require('flag.manager');

const profiler = require('screeps-profiler');

// This line monkey patches the global prototypes.
//profiler.enable();
module.exports.loop = function() {
    profiler.wrap(function() {
        
        let start;
        let end;
        let debug = 0;
        if(debug){
            start = Game.cpu.getUsed();
        }

        ClearMemory.run();
        
        // Main.js logic should go here.
        for(let i in Game.rooms){
            let thisRoom = Game.rooms[i];
            ManageRoom.run(thisRoom);
            
        }
        
        ManageCreeps.run();
        if(Game.time % 5 == 0){
            for(let i in Game.flags){
                let thisFlag = Game.flags[i];
                //FlagInit.run(thisFlag);
                FlagManager.run(thisFlag);
            }
        }

        if(debug){
            end = Game.cpu.getUsed();
            console.log("Main", end-start, "cpu");
        }
  });
}













