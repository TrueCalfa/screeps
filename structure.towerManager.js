const TowerRepair = require('structure.towerRepair');
const TowerScout = require('structure.towerScout');
var towerManager = {
    run: function(tower){
        let scoutResult = TowerScout.run(tower);
        if(scoutResult != 'attacking'){
            TowerRepair.run(tower);
        }
        
    }
};
module.exports = towerManager;