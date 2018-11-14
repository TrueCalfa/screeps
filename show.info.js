/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Show.info');
 * mod.thing == 'a thing'; // true
 */

let xOffset = 4;
let yOffset = -1.1;
let xTextOffset = 0.5;
let yTextOffset = 0.6;
let xCountOffset = 3.4;
let yCountOffset = 0.6;
let rectProperties  = {fill: 'transparent', stroke: '#0066ff'};

function DrawRect(thisRoom, positionX, positionY, xSize, ySize, properties){
    
    thisRoom.visual.rect(positionX, positionY, xSize, ySize, properties);
    
}

function DrawText(thisRoom, msg, positionX, positionY, properties){

    thisRoom.visual.text(msg, positionX, positionY, properties);
    
}





module.exports = {
    
    progress: function(thisRoom){
        let totalProgress = thisRoom.controller.progressTotal;
        let currentProgress = thisRoom.controller.progress;
        let percProgress = Math.floor((currentProgress*100000)/totalProgress)*0.001;
        if(percProgress > 95){

            thisRoom.visual.text(percProgress+ '%', thisRoom.controller.pos.x, thisRoom.controller.pos.y -1.2
            , {font: 'bold .5 serif', color: 'cyan', align: 'center'} );
        }
    },
    
    assignedMinions: function(flag, desired, current){
        
        switch(flag.color){
            case COLOR_YELLOW:
            {
                new RoomVisual(flag.pos.roomName).text(current+'/'+desired, flag.pos.x-1, flag.pos.y, {font: 'bold .6 serif', color: 'yellow', align: 'left'} );
            }
            break;
            case COLOR_PURPLE:
            {
                new RoomVisual(flag.pos.roomName).text(current+'/'+desired, flag.pos.x-1, flag.pos.y, {font: 'bold .6 serif', color: 'purple', align: 'left'} );
            }
            break;
            case COLOR_BLUE:
            {
                new RoomVisual(flag.pos.roomName).text(current+'/'+desired, flag.pos.x-1, flag.pos.y, {font: 'bold .6 serif', color: '#6699ff', align: 'left'} );
            }
            break;
            case COLOR_GREEN:
            {
                new RoomVisual(flag.pos.roomName).text(current+'/'+desired, flag.pos.x-1, flag.pos.y, {font: 'bold .6 serif', color: '#33cc33', align: 'left'} );
            }
            break;
            case COLOR_ORANGE:
            {
                new RoomVisual(flag.pos.roomName).text(current+'/'+desired, flag.pos.x-1, flag.pos.y, {font: 'bold .6 serif', color: '#33cc33', align: 'left'} );
            }
            default:
            break;
        }
        
    },
    
    flagMinionCount: function(thisRoom){
        
        let flag;
        let purpleFlags = 0;
        let blueFlags = 0;
        let yellowFlags = 0;
        let greenFlags = 0;
        let desiredPurpleCreeps = 0;
        let desiredBlueCreeps = 0;
        let desiredYellowCreeps = 0;
        let desiredGreenCreeps = 0;
        let desiredOrangeCreeps = 0;
        let currentPurpleCreeps = 0;
        let currentBlueCreeps = 0;
        let currentYellowCreeps = 0;
        let currentGreenCreeps = 0;
        let currentOrangeCreeps = 0;
        let redNumbers = [];
        
        for(let i in Game.flags){
            let flag = Game.flags[i];
            switch(flag.color){
                case COLOR_PURPLE:
                    purpleFlags++;
                    desiredPurpleCreeps += flag.memory.desiredMinions;
                    currentPurpleCreeps += flag.memory.currentMinions;
                    if(currentPurpleCreeps<desiredPurpleCreeps){
                        redNumbers.push('PURPLE: ');
                    }
                break;
                case COLOR_ORANGE:
                    orangeFlags++;
                    desiredOrangeCreeps += flag.memory.desiredMinions;
                    currentOrangeCreeps += flag.memory.currentMinions;
                    if(currentOrangeCreeps<desiredOrangeCreeps){
                        redNumbers.push('ORANGE: ');
                    }
                break;
                case COLOR_BLUE:
                    blueFlags++;
                    desiredBlueCreeps += flag.memory.desiredMinions;
                    currentBlueCreeps += flag.memory.currentMinions;
                    if(currentBlueCreeps<desiredBlueCreeps){
                        redNumbers.push('BLUE: ');
                    }
                break;
                case COLOR_YELLOW:
                    yellowFlags++;
                    desiredYellowCreeps += flag.memory.desiredMinions;
                    currentYellowCreeps += flag.memory.currentMinions;
                    if(currentYellowCreeps<desiredYellowCreeps){
                        redNumbers.push('YELLOW: ');
                    }
                break;
                case COLOR_GREEN:
                    greenFlags++;
                    desiredGreenCreeps += flag.memory.desiredMinions;
                    currentGreenCreeps += flag.memory.currentMinions;
                    if(currentGreenCreeps<desiredGreenCreeps){
                        redNumbers.push('YELLOW: ');
                    }
                break;
                default:break;
            }
        }
        
        var debugMsg = ['PURPLE: ','BLUE: ','YELLOW: '];
        var debugCount = [currentPurpleCreeps+'/'+desiredPurpleCreeps,currentBlueCreeps+'/'+desiredBlueCreeps,currentYellowCreeps+'/'+desiredYellowCreeps,currentGreenCreeps+'/'+desiredGreenCreeps];
        
        let xRectSize = 4.5;
        let yRectSize = 2;
        let addYOffset = -2;
        let xPos = thisRoom.controller.pos.x + xOffset;
        let yPos = thisRoom.controller.pos.y + yOffset + addYOffset;
        
        
        let textProperties = {font: 'bold .5 serif', color: 'cyan', align: 'left'};
        let textCountProperties = {font: 'bold .5 serif', color: 'cyan', align: 'left'};
        
        
        DrawRect(thisRoom, xPos, yPos, xRectSize, yRectSize, rectProperties);
        
        for(var i in debugMsg){
            let txtMsg = debugMsg[i];
            let cntMsg = debugCount[i];
            if(redNumbers.length){
                for(let j in redNumbers){
                    if(txtMsg == redNumbers[j]){
                        textCountProperties = {font: 'bold .5 serif', color: 'red', align: 'left'};
                    }else{
                        
                    }
                }
            }
            DrawText(thisRoom, txtMsg, xPos + xTextOffset, yPos + yTextOffset + i * 0.5, textProperties);
            DrawText(thisRoom, cntMsg, xPos + xCountOffset, yPos + yCountOffset + i * 0.5, textCountProperties);
            
        }
        
        
        
        
        
    },
    
    minionCount: function(thisRoom, debugMsg, current, desired){
            
        let xRectSize = 4.5;
        let yRectSize = 5.8;
        let xPos = thisRoom.controller.pos.x + xOffset;
        let yPos = thisRoom.controller.pos.y + yOffset;
        
        let textProperties = {font: 'bold .5 serif', color: 'cyan', align: 'left'};
        
        DrawRect(thisRoom, xPos, yPos, xRectSize, yRectSize, rectProperties);
        
        let txtMsg = [];
        let cntMsg = [];
        for(let i in debugMsg){
            txtMsg = debugMsg[i];
            cntMsg = (current[i]+'/'+desired[i]);
            if(current[i]<desired[i]){
                textProperties = {font: 'bold .5 serif', color: 'red', align: 'left'};
            }else{
                textProperties = {font: 'bold .5 serif', color: 'cyan', align: 'left'};
            }
            if(i == 0){
                DrawText(thisRoom, txtMsg, xPos + 0.85 + xTextOffset, yPos + yTextOffset + i*0.5, textProperties);
            }else{
                DrawText(thisRoom, txtMsg, xPos + xTextOffset, yPos + yTextOffset + i*0.5, textProperties);
                DrawText(thisRoom, cntMsg, xPos + xCountOffset, yPos + yCountOffset + i*0.5, textProperties);
            }
        }
    },

    
    
    energy: function(thisRoom){
        if(thisRoom.controller.my && thisRoom.find(FIND_MY_SPAWNS).length){
            var spawnsInThisRoom = thisRoom.find(FIND_MY_SPAWNS);
            var energyBuildings = thisRoom.find(FIND_STRUCTURES, {
                filter: (function(structure){
                    return structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN;
                    
                })
                
            });
            var currentEnergy = 0;
            var totalEnergy = 0;
            for(var i in energyBuildings){
                currentEnergy += energyBuildings[i].energy;
                totalEnergy += energyBuildings[i].energyCapacity;
            }
            
            thisRoom.visual.text(currentEnergy+'/'+totalEnergy, spawnsInThisRoom[0].pos.x+1.2, spawnsInThisRoom[0].pos.y+0.15, {font: 'bold .6 serif', color: 'green', align: 'left'} );

        
        }
    }

};













