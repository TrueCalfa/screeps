let GoHarvest = require('job.harvest');


var roleMiner = {

    run: function(creep) {
	    GoHarvest.mine(creep);
    }
};

module.exports = roleMiner;

