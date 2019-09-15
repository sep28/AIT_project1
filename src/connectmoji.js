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


		
