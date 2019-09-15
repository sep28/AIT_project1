// implement your functions here
// ...don't forget to export functions!

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
	
	let totalRows = board.rows;
	let totalCols = board.cols;
	
	const row = Math.floor(i / totalCols);
	const col = i - (row * totalCols);
	
	const rowCol = {
		row: row;
		col: col;
	}
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

	
