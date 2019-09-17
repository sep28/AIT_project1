// implement your functions here
// ...don't forget to export functions!

const wcwidth = require('wcwidth');
const clear = require('clear');
const readlineSync = require('readline-sync');
const colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];



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

	for (let i = 0; i < Moves.length; i++) {
		let idx = rowColToIndex(newBoard, Moves[i].row, Moves[i].col);
		newBoard.data[idx] = Moves[i].val;
	}
	return newBoard;
}


function boardToString(board) {
	
	const totalRows = board.rows;
	const totalCols = board.cols;

	let widestCell = 0;
	let boardString = '';
	
	for (let i = 0; i < board.data.length; i++) {
		if ((board.data[i] !== null) && (board.data[i].wcwidth > widestCell)) {
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
				for (let count = 0; count < (pad - Math.floor(pad/2)); count++) {
					boardString += ' ';
				}
			}
		}
		boardString += '|\n';
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
	return boardString;	
}
//}

function letterToCol(letter) {
	if (colLabels.includes(letter)) {	
		for (let colNumber = 0; colNumber < colLabels.length; colNumber++) {
			if (colLabels[colNumber] === letter) {
				return colNumber;
			}
		}
	}		
	else {
		return null;
	}	
 }

 function getEmptyRowCol(board, letter, empty = null) {
 	const totalRows = board.rows;
 	let existingColumns = colLabels.slice(0,board.cols);

 	if (existingColumns.includes(letter)) {
 		const column = letterToCol(letter);
 		for (let i = (totalRows - 1); i >= 0; i--) {
 			let validEmptyCell = true;
 			let index = rowColToIndex(board, i, column);
 			if(board.data[index] === empty) { //&& ((board.data[index] != empty) || (board.data[index + 1] != empty))) {

 				/*if (i === (totalRows - 1)) {//checking to see if there is a hole above
 					let topIndex = rowColToIndex(board, i -1, column);
 					if (board.data[topIndex] !== empty) {
 						validEmptyCell = false;
 					}
 				}*/
 				if (i > 0) { //checking to see if there are holes above

 					for(let topCheck = i - 1; topCheck >= 0; topCheck--) {
 						let topIndex = rowColToIndex(board, topCheck, column);
 						if (board.data[topIndex] !== empty) {
 							validEmptyCell = false;
 							break;
 						}
 					}
 					/*
 					let topIndex = rowColToIndex(board, i -1, column);
 					let botIndex = rowColToIndex(board, i + 1, column);
 					if ((board.data[topIndex] !== empty && board.data[botIndex] !== empty)) {
 						validEmptyCell = false;
 					}
 					*/
 				}

 				else { //checking for holes below
 					let botIndex = rowColToIndex(board, i + 1, column);
 					if (board.data[botIndex] === empty) {
 						validEmptyCell = false;
 					}
 				}
 				if (validEmptyCell) {
 					const empty = {};
 					empty.row = i;
 					empty.col = column;
 					return empty;
 				}
 
 			}
 			else {
 				continue;
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
 	let emptyCells = [];

 	for (let j = 0; j < totalCols; j++) { //check each column starting from highest row for empty cell, if found add it to the array and check next col
 		for (let i = (totalRows - 1); i >= 0; i--) {
 			let idx = rowColToIndex(board, i, j);
 			if (board.data[idx] === null) {
 				emptyCells.push(colLabels[j]);
 				break;
 			}
 		}
 	}
 	return emptyCells;
 }

function hasConsecutiveValues(board, row, col, n) {
	const idx = rowColToIndex(board, row, col);
	const val = board.data[idx];
	let count = 0;

	//check horizontally
	for(let i = 0; i < board.totalCols; i++) {
		let pos = rowColToIndex(board, row, i);
		if (board.data[pos] === val) {
			count++;
			if (count >= n) {
				return true;
			}
		}
		else {
			count = 0;
		}
	}

	//check vertically
	count = 0;
	for(let j = (board.totalRows -1); j >= 0; j--) {
		let pos = rowColToIndex(board, j, col);
		if (board.data[pos] === val) {
			count++;
			if (count >= n) {
				return true;
			}
		}
		else {
			count = 0;
		}	
	}

	//check diagonally
	count = 0;
	let rowPos = board.totalRows - 1;
	let colPos = 0;
	while (rowPos >= 0 || colPos < board.totalCols) {
		let pos = rowColToIndex(board, rowPos, colPos);
		if(board.data[pos] === val) {
			count++;
			if (count >= n) {
				return true;
			}
		}
		else {
			count = 0;
		}
		rowPos--;
		colPos++;
	}
	return false;
}


 function autoplay(board, s, numConsecutive) {
 	const result = {
 		board : {},
 		pieces : [],
 		lastPieceMoved: null
 	};
 	const instructions = s.split("");
 	result.pieces.push(instructions[0]);
 	result.pieces.push(instructions[1]);
 	const moves = instructions.slice(2);

 	let winner = false;
 	let playerTurn = 1; //start with the first player
 	let playerPiece = null;

 	for (let i = 0; i < moves.length; i++) {

 		if (winner === true) {
 			result.lastPieceMoved = playerPiece;
 			result.error = {
 				board: null,
 				num: i + 1,
 				val: playerPiece,
 				col: col
 			};
 			return result;
 		}
 		let col = letterToCol(moves[i]);
 		//the next if-else block determines whose turn it is every time a new move is made
 		if(playerTurn % 2 === 0) {
 			playerPiece = result.pieces[1];
 		}
 		else {
 			playerPiece = result.pieces[0];
 		}

 		for (let row = (board.totalRows - 1); row >= 0; row-- ) {
 			let idx = rowColToIndex(board, row, col);

 			if (board.data[idx] === null) { //found a valid empty cell to drop our piece
 				board.data[idx] = playerPiece;
 				if (hasConsecutiveValues(board, row, col, numConsecutive)) { //we placed a piece, lets check for a winner
 					result.winner = playerPiece;
 					result.board = board;
 					winner = true;
 				}
 				else {
 					break; //no winner advance to the next move
 				}
 			}
 			else if(row === 0) { //row is full
 				result.lastPieceMoved = playerPiece;
 				result.error = {
 					board: null,
 					num: i + 1,
 					val: playerPiece,
 					col: col
 				};
 				return result;
 			}
 			else { //cell is not empty, lets check the one above it
 				continue;
 			}
 		}
 		/*
 		//after every move, we sweep the board to see if there is a winner
 		let mostRecentPiece = null;
 		let consectCount = 0;
 		for(let hSweep = (board.totalRows - 1); hSweep >= 0; hSweep--) { //sweeping every row
 			for(let colPos = 0; colPos < board.totalCols; colPos++) {
 				let idx = rowColToIndex(board, hSweep, colPos);
 				if(board.data[idx] === null) { //if there is an empty cell
 					break;
 				}
 				else if (board.data[idx] === mostRecentPiece) { //if the cell contains same piece as the cell adjacent to it
 					consectCount++;
 					if(consectCount === numConsecutive) {
 						//winner = true;
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
 		mostRecentPiece = null;
 		consectCount = 0;
 		 for(let vSweep = 0; vSweep < board.totalCols; vSweep++) { //sweeping every column
 			for(let rowPos = (board.totalRows - 1); rowPos >= 0; rowPos--) {
 				let idx = rowColToIndex(board, rowPos, vSweep);
 				if(board.data[idx] === null) { //if there is an empty cell
 					break;
 				}
 				else if (board.data[idx] === mostRecentPiece) { //if the cell contains same piece as the cell adjacent to it
 					consectCount++;
 					if(consectCount === numConsecutive) {
 						//winner = true;
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
 		*/
 		//after a move is complete and no winner, next player's turn
 		playerTurn++;
	}
	return result;
}

module.exports = {
	generateBoard: generateBoard,
	rowColToIndex: rowColToIndex,
	indexToRowCol: indexToRowCol,
	setCell: setCell,
	setCells: setCells,
	boardToString: boardToString,
	letterToCol: letterToCol,
	getEmptyRowCol: getEmptyRowCol,
	getAvailableColumns: getAvailableColumns,
	hasConsecutiveValues: hasConsecutiveValues,
	autoplay: autoplay
};

	
