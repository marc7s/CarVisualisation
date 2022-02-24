function car() { return document.getElementById("car") };
function axis() { return document.getElementById("line") };
var totNumbers = null, minNumber = null, maxNumber = null;
const numberWidth = 60;
const axisMargin = 50;
const gridRows = 11, gridCols = 11;
const pGridRows = Math.floor(gridRows / 2), nGridRows = -1 * pGridRows;
const pGridCols = Math.floor(gridCols / 2), nGridCols = -1 * pGridCols;
const cellSize = 60;

var activeCell = [0, 0];
var lastCell = activeCell;

var traverseOrder = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
]
/* 
    traverseOrder, index layout
        0 1 2
        3   4
        5 6 7

*/

var time = 0;

document.addEventListener('DOMContentLoaded', () => {
    let numbers = document.getElementById("numbers");
    let grid = document.getElementById("grid");
    let numbersWidth = window.innerWidth - 2 * axisMargin;
    totNumbers = Math.floor(numbersWidth / numberWidth);
    totNumbers = totNumbers - (totNumbers + 1) % 2;
    minNumber = -1 * (totNumbers - 1) / 2;
    maxNumber = minNumber + totNumbers - 1;
    
    for(let i = minNumber; i <= maxNumber; i++){
        let num = document.createElement('div');
        num.innerHTML = i;
        num.classList.add('number');
        num.id = 'number_' + i;
        numbers.appendChild(num);
    }

    for(let i = nGridRows; i <= pGridRows; i++){
        let col = document.createElement('div');
        col.classList.add('col');
        grid.appendChild(col);
        for(let j = nGridCols; j <= pGridCols; j++){
            let cell = document.createElement('div');
            cell.innerHTML = '(' + j + ', ' + i + ')';
            cell.classList.add('cell');
            cell.id = 'cell@' + j + '_' + i;
            col.appendChild(cell);
        }
    }
    calcCam(activeCell[0], activeCell[1]);
});
function updateCell(){
    let newCell = getNextCell(activeCell);
    moveCell(newCell[0], newCell[1]);
    calcCam(activeCell[0], activeCell[1]);
}
function getNextCell(cell){
    if(getCellIfExists(cell)){
        let newCell = cell;
        let possible = [];
        for(let i = 0; i < 8; i++){
            let newIndex = cell.map((r, j) => { return r + traverseOrder[i][j] });
            let nc = getCellIfExists(newIndex) ? !document.getElementById('cell@' + newIndex[0] + '_' + newIndex[1]).classList.contains('used') : false;
            possible.push(nc);
        }
        if(!possible.some((a) => { return a }))
            clearInterval(updateInterval);
        else if(possible.every((a) => { return a })){
            newCell = [cell[0], cell[1] + 1];
        }else{
            if(!possible[3] && possible[1])
                newCell = [cell[0] - 1, cell[1]];
            else if(!possible[6] && possible[3])
                newCell = [cell[0], cell[1] - 1];
            else if((!possible[2] || !possible[0]) && possible[4])
                newCell = [cell[0], cell[1] + 1];
            else if(possible[6])
                newCell = [cell[0] + 1, cell[1]];
        }

        if(getCellIfExists(newCell))
            return newCell;
    }
    return cell;
}
function getCellIfExists(cell){
    if(cell[0] >= nGridRows && cell[0] <= pGridRows && cell[1] >= nGridCols && cell[1] <= pGridCols)
        return cell;
    return false;
}
function calcCam(startPos, velocity){
    let ft = f(startPos, velocity, time);
    document.getElementById('function').innerHTML = 
        'f(' + startPos + ', ' + velocity + ') = ' + 
        startPos + ' + ' + velocity + ' * ' + time + ' = ' + ft;
    document.getElementById('time').innerHTML = 'Time: ' + time + 's';
    moveCar(ft);
}
function f(startPos, velocity, t){
    return startPos + velocity * t;
}
function moveCar(number){
    let lpx = 0;
    if(number < minNumber)
        lpx = getNumberTile(minNumber).getBoundingClientRect().left - numberWidth;
    else if(number > maxNumber)
        lpx = getNumberTile(maxNumber).getBoundingClientRect().left + numberWidth;
    else
        lpx = getNumberTile(number).getBoundingClientRect().left;
    car().style.marginLeft = lpx + 'px';
}
function moveCell(row, col){
    lastCell = activeCell;
    let lc = document.getElementById('cell@' + lastCell[0] + '_' + lastCell[1]);
    lc.classList.remove('active');
    lc.classList.add('used');
    activeCell = [row, col];
    document.getElementById('cell@' + row + '_' + col).classList.add('active');
}
function getNumberTile(number){
    return document.getElementById('number_' + number);
}

var updateInterval = setInterval(() => {
    time++;
    updateCell();
}, 1000);