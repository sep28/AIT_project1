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

	for (let colNumber = 0; colNumber < colLabels.length; colNumber++) {
		if (colLabels[colNumber] === letter) {
			return colNumber;
		}
	}
	return null;
}
 
