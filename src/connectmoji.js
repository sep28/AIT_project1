// implement your functions here
// ...don't forget to export functions!

const wcwidth = require('wcwidth');
const clear = require('clear');
const readlineSync = require('readline-sync');



function generateBoard(rows, cols, fill = null) {
	
	const B = {
		data: new Array((rows*cols)),
		rows: rows,
		cols: cols
	};
	B.data.fill(fill);

	//let arraySize = rows * cols;
	//for (let i = 0; i < arraySize; i++) {
		//B.data.push(fill);
	//}
	return B;
}

function rowColToIndex(board, row, col) {
	
	let totalCols = board.cols; 
	const idx = (totalCols * row) + col;
	return idx;
}

function indexToRowCol(board, i) {
	
	const totalRows = board.rows;
	const totalCols = board.cols;
	
	const row = Math.floor(i / totalCols);
	const col = i - (row * totalCols);
	
	const rowCol = {
		row: row,
		col: col
	};
	return rowCol;
}

function setCell(board, row, col, value) {
	
	const newBoard = {
		data:  [...board.data],
		rows: board.rows,
		cols: board.cols
	};
	
	const idx = rowColToIndex(newBoard, row, col);
	newBoard.data[idx] = value;
	
	return newBoard;
}

function setCells(board, ...Moves) {

	const newBoard = {
		data: [...board.data],
		rows: board.rows,
		cols: board.cols
	};
	
	for (let i = 0; i< Moves.length; i++) {
		let idx = rowColToIndex(newBoard, Moves[i].row, Moves[i].col);
		newBoard[idx] = Moves[i].val;
	}

}


function boardToString(board) {
	
	const totalRows = board.rows;
	const totalCols = board.cols;
	
	const colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	var widestCell = 0;
	var boardString = '';
	
	for (let i = 0; i < board.data.length; i++) {
		if (board.data[i].wcwidth > widestCell) {
			widestCell = board.data[i].wcwidth;
		}
	}
	
	widestCell = widestCell + 2;
	
	for (let rowCount = 0; rowCount < totalRows; rowCount++) {
		for (let colCount = 0; colCount < totalCols; colCount++) {
			boardString += '|';
			let idx = rowColToIndex(board, rowCount, colCount);
			if (board.data[idx] === null || board.data[idx] === '') {
				for (let count = 0; count < widestCell; count ++) {
					boardString += ' ';
				}
			}
			else {
				let val = board.data[idx];
				let pad = widestCell - val.wcwidth;
				for (let count = 0; count < Math.floor(pad/2); count++) {
					boardString += ' ';
				}
				boardString += val;
				for (let count = 0; count < (pad  - Math.floor(pad/2)); count++) {
					boardString += ' ';
				}
			}
			boardString += '|\n';
		}
	}
	boardString += '|';

	for (let colCount = 0; colCount < totalCols; colCount++) {
		for (let dashCount = 0; dashCount < widestCell; dashCount++) {
			boardString += '-';
		}
		boardString += '+';
	}
	boardString += '|\n';
	
	boardString += '|';
	for (let colCount = 0; colCount < totalCols; colCount++) {
		let labelWidth = widestCell - colLabels[colCount].wcwidth;
		for (let pos = 0; pos < Math.floor(labelWidth/2); pos++) {
			boardString += ' ';
		}
		boardString += colLabels[colCount];
		for (let pos = 0; pos < (labelWidth - Math.floor(labelWidth/2)); pos++) {
			boardString += ' ';
		}
	}
	boardString += '|';
}

function letterToCol(letter) {
	if (coLabels.includes(letter)) {	
		for (let colNumber = 0; colNumber < colLabels.length; colNumber++) {
			if (colLabels[colNumber] === letter) {
				return colNumber;
			}
		}
	}		
	else {
		return null
	}	
 }

 function getEmptyRowCol(board, letter, empty = null) {
 	const totalRows = board.rows;
 	if (colLabels.includes(letter)) {
 		const column = letterToCol(letter);

 		for (let (i = totalRows - 1); i >= 0; i--) {
 			let index = rowColToIndex(board, i, column);
 			if(board[index] === null) {
 				const empty = {};
 				empty.row = i;
 				empty.col = column;
 				return empty;
 			}
 		}
 		return null;	
 	}
 	else { //the letter parameter is invalid
 		return null;
 	}
 }

 function getAvailableColumns(board) {
 	const totalRows = board.rows;
 	const totalCols = board.cols;
 	var emptyCells = [];

 	for (let j = 0; j < totalCols) { //check each column starting from highest row for empty cell, if found add it to the array and check next col
 		for ((let i = totalRows - 1); i >= 0; i--) {
 			let idx = rowColToIndex(boarc, i, j);
 			if (board[idx] === null) {
 				emptyCells.push(coLabels[j]);
 				break;
 			}
 		}
 	}
 	return emptyCells;
 }

 function autoplay(board, s, numConsecutive) {
 	const result = {
 		board : {},
 		pieces : [],
 		lastPieceMoved: null
 	};
 	const instructions = s.split();
 	result.pieces.push(moves[0]);
 	result.pieces.push(moves[1]);
 	const moves = instructions.slice(2);

 	let playerTurn = 1; //start with the first player

 	for (let i = 0; i < moves.length; i++) {

 		let winner = false;
 		let col = letterToCol(moves[i]);
 		//the next if-else block determines whose turn it is every time a new move is made
 		if(playerTurn % 2 == 0) {
 			let playerPiece = result.pieces[1];
 		}
 		else {
 			let playerPiece = result.pieces[0];
 		}

 		for ((let row = board.totalRows - 1); row >= 0, row-- ) {
 			let idx = rowColToIndex(board, row, col);

 			if (board[idx] === null) {
 				board[idx] = playerPiece;
 				break; //advance to the next move
 			}
 			else {
 				if(row == 0) {
 					result.lastPieceMoved = playerPiece;
 					result.error = {
 						num: i + 1,
 						val: playerPiece,
 						col: col
 					}
 					return result;
 				}
 			}
 		}
 		//after every move, we sweep the board to see if there is a winner
 		let mostRecentPiece = null;
 		let consectCount = 0;
 		for(let hSweep = (board.totalRows - 1); hSweep >= 0; hSweep--) { //sweeping every row
 			for(let colPos = 0; colPos < board.totalCols; colPos++) {
 				let idx = rowColToIndex(board, hSweep, colPos);
 				if(board[idx] === null) { //if there is an empty cell
 					break;
 				}
 				else if (board[idx] === mostRecentPiece) { //if the cell contains same piece as the cell adjacent to it
 					consectCount++;
 					if(consectCount === numConsecutive) {
 						winner = true;
 						result.winner = playerPiece;
 						return result;
 					}
 				}
 				else { //the cell contains a different value than the previous adjacent cell
 					mostRecentPiece = playerPiece;
 					consectCount = 0;
 				}
 			}
 		}
 		let mostRecentPiece = null;
 		let consectCount = 0;
 		 for(let vSweep = 0; vSweep < board.totalCols; vSweep++) { //sweeping every column
 			for(let rowPos = (board.totalRows - 1); rowPos >= 0; rowPos--) {
 				let idx = rowColToIndex(board, rowPos, vSweep);
 				if(board[idx] === null) { //if there is an empty cell
 					break;
 				}
 				else if (board[idx] === mostRecentPiece) { //if the cell contains same piece as the cell adjacent to it
 					consectCount++;
 					if(consectCount === numConsecutive) {
 						winner = true;
 						result.winner = playerPiece;
 						return result;
 					}

 				}
 				else { //the cell contains a different value than the previous adjacent cell
 					mostRecentPiece = playerPiece;
 					consectCount = 0;
 				}
 			}
 		}
 		//after a move is complete and no winner, next player's turn
 		playerTurn++;
 	}
 	return result;
}
	
