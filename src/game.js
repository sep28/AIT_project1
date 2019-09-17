// require your module, connectmoji
// require any other modules that you need, like clear and readline-sync
const c = require('./connectmoji.js');
const readlineSync = require('readline-sync');

if (process.argv[2] != null) {

	const arr = process.argv[2];
	const optionsAndMoves = arr.split(',');

	const board = c.generateBoard(optionsAndMoves[2], optionsAndMoves[3]);
	const result = c.autoplay(board, optionsAndMoves[1], optionsAndMoves[4]);

	var pressEnter = readlineSync.question("Please press Enter to continue.../n");
	
	if(result.winner) {
		console.log(c.boardToString(board));
		console.log("\n The winner is... ", result.winner);

	}
	else {
		console.log(c.boardToString(board));
		if (result.lastPieceMoved == optionsAndMoves[0]) {
			console.log("It's your turn now!\n");
		}
		else {
			console.log("It's the computer's turn now...");
		}

	}
	//console.log(c.boardToString(board));

}

