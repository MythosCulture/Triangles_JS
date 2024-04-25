let cells;
let rows, cols, numLines, lineWeight;
let cellSize;
let bk = '#FFF8DC';
let color1 = '#4793AF';
let color2 = '#DD5746';
let color3 = '#003C43';
let color4 = '#FFC470';

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  
  numLines = 10;
  lineWeight = 3; //default 3, 0 for none
  cellSize = 60; //width and height of cell
  cols = int(displayWidth / cellSize + 1);
  rows = int(displayHeight / cellSize + 1);
  
  CreateGrid();
  
  noLoop();
}


function draw() {
  background(bk);
  
  for (let cell of cells) {
    noStroke();
    switch (cell.rndColor) {
        case 0: fill(color1); break;
        case 1: fill(color2); break;
        case 2: fill(color3); break;
        case 3:
        case 4: fill(color4); break;
      }
      
     switch (cell.rndDirection) {
      case 0: triangle(cell.left_x, cell.top_y, cell.left_x, cell.bott_y, cell.right_x, cell.bott_y); break; // Left/Bottom Triangle
      case 1: triangle(cell.left_x, cell.bott_y, cell.left_x, cell.top_y, cell.right_x, cell.top_y); break; // Left/Top Triangle
      case 2: triangle(cell.left_x, cell.top_y, cell.right_x, cell.top_y, cell.right_x, cell.bott_y); break; // Right/Top Triangle
      case 3:
      case 4: triangle(cell.right_x, cell.top_y, cell.right_x, cell.bott_y, cell.left_x, cell.bott_y); break; // Right/Bottom Triangle
    }
     
    for (let i = 0; i < rows; i++) {
      strokeWeight(lineWeight);
      stroke(bk);
      
      let lineSpace = Math.round(cellSize / numLines);
      
      for (let l = 0; l < numLines; l++) {
        let lineY  = (i * cellSize) + (lineSpace * l);
        line(0, lineY, width, lineY);
      }
    }
    
  } //end for loop
}

function CreateGrid() {
    cells = new Array(rows * cols); 
    
    let index = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            
            let centerX = c * cellSize;
            let centerY = r * cellSize;
            
            cells[index] = new Cell(centerX,centerY,index);
            
            index++;
        }
    }
}

class Cell {  
    constructor(x, y, gridIndex) {
      //Add variables to cells as needed...
        this.x = x;
        this.y = y;
        this.gridIndex = gridIndex;
        
        this.left_x = this.x - cellSize/2;
        this.right_x = this.x + cellSize/2;
        this.top_y = this.y - cellSize/2;
        this.bott_y = this.y + cellSize/2;
        
        this.rndDirection = int(Math.round(Math.random() * 4));
        this.rndColor = int(Math.round(Math.random() * 4));
        //console.log('Cell Index: ' + this.gridIndex + '/tDirection/Color: ' + this.rndDirection + '/' + this.rndColor);
    }
}

function windowResized(){
     resizeCanvas(windowWidth, windowHeight);
   }
