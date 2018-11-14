//AVISO DEL TRAVELER:
TRAVELER: heavy cpu use: Flag_Miner827205, cpu: 2285 origin: [room E7N4 pos 9,36], dest: [room E7N4 pos 9,34]


1-11-18

[5:06:56] [shard3]calls		time		avg		function
84386		21526.7		0.255		Creep.travelTo
70165		14649.1		0.209		Creep.move
51424		10612.9		0.206		Creep.harvest
614704		9057.7		0.015		Room.toJSON
30594		6652.2		0.217		Creep.upgradeController
21529		4639.6		0.216		Creep.reserveController
1184112		3004.5		0.003		RoomPosition.getRangeTo
284085		2837.7		0.010		Room.find
4097		2595.9		0.634		RoomPosition.findClosestByPath
54358		2269.0		0.042		Creep.toJSON
7564		1883.6		0.249		Creep.transfer
63743		1554.6		0.024		RoomPosition.findInRange
66024		1134.4		0.017		RoomPosition.findClosestByRange
4123		905.2		0.220		Creep.repair
194815		631.0		0.003		RoomPosition.isNearTo
2152		415.9		0.193		Creep.withdraw
100168		279.3		0.003		RoomPosition.getDirectionTo
184359		270.0		0.001		RoomPosition.inRangeTo
629		150.0		0.239		Creep.pickup
58178		105.8		0.002		RoomPosition.isEqualTo
284		97.9		0.345		Spawn.createCreep
60568		95.3		0.002		Game.getObjectById
Avg: 22.39	Total: 134267.04	Ticks: 5998


//Tras quitar los scavengers:
[19:09:31][shard3]calls		time		avg		function
12647		3030.0		0.240		Creep.travelTo
10273		2161.0		0.210		Creep.move
7881		1640.5		0.208		Creep.harvest
94049		1167.7		0.012		Room.toJSON
4421		859.5		0.194		Creep.upgradeController
3562		767.9		0.216		Creep.reserveController
208593		634.0		0.003		RoomPosition.getRangeTo
8102		486.1		0.060		Creep.toJSON
12800		381.5		0.030		RoomPosition.findInRange
49720		301.4		0.006		Room.find
455		    249.8		0.549		RoomPosition.findClosestByPath
686		    170.2		0.248		Creep.transfer
675		    146.3		0.217		Creep.repair
12002		130.3		0.011		RoomPosition.findClosestByRange
327	    	68.8		0.210		Creep.withdraw
4738		56.4		0.012		Structure.toString
25416		47.8		0.002		RoomPosition.isNearTo
33719		44.8		0.001		RoomPosition.inRangeTo
13223		28.0		0.002		RoomPosition.getDirectionTo
10953		26.7		0.002		Game.getObjectById
120		    17.7		0.148		Creep.pickup
34		    10.1		0.296		Spawn.createCreep
5108		6.6		    0.001		RoomPosition.isEqualTo
Avg: 21.52	Total: 21473.66	Ticks: 998

//Tras reducir los findClosestByPath
[1:11:33] [shard3]calls		time		avg		function
12562		3053.2		0.243		Creep.travelTo
10377		2194.7		0.211		Creep.move
105987		1706.3		0.016		Room.toJSON
7785		1610.1		0.207		Creep.harvest
4850		1069.1		0.220		Creep.upgradeController
235264		620.2		0.003		RoomPosition.getRangeTo
972		    525.8		0.541		RoomPosition.findClosestByPath
38264		513.5		0.013		Room.find
8481		495.3		0.058		Creep.toJSON
2290		494.3		0.216		Creep.reserveController
2952		303.9		0.103		Creep.transfer
12803		295.0		0.023		RoomPosition.findInRange
719	    	156.7		0.218		Creep.repair
32327		67.2		0.002		RoomPosition.isNearTo
311		    62.5		0.201		Creep.withdraw
30		    50.6		1.685		Spawn.createCreep
33822		46.1		0.001		RoomPosition.inRangeTo
30	    	36.0		1.201		Spawn.canCreateCreep
149 		35.3		0.237		Creep.pickup
13542		29.2		0.002		RoomPosition.getDirectionTo
8945		19.6		0.002		RoomPosition.isEqualTo
12722		17.4		0.001		Game.getObjectById
4685		8.8 		0.002		Structure.toString
Avg: 21.67	Total: 21628.84	Ticks: 998