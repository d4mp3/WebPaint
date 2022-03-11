import Tool from "./tool";
import board from "../board";
import _ from "lodash";

export default class Undo extends Tool {
	constructor() {
		super();
		this.name = "undo";
		this._draw = false;
        this._prevX = 0;
        this._prevY = 0;
        board.history.splice(-1,1);    // delete last move from history
   }

    drawPaths(){
        board.ctx1.clearRect(0, 0, board.ctx1.canvas.width, board.ctx1.canvas.height);
        console.log("history: ", board.history);
        board.history.forEach(stepObject => {
            board.ctx1.lineWidth = stepObject.toolProps.size;
            board.ctx1.strokeStyle = stepObject.toolProps.color;
            board.ctx1.lineCap = stepObject.toolProps.cap;
            board.ctx1.beginPath();
            let i =  0;
            stepObject.drawedPath.forEach(coords => {
            if (i == 0) {
                board.ctx1.moveTo(coords.x, coords.y);
            } else {
                board.ctx1.lineTo(coords.x, coords.y);
            }
            i += 1;
        })
            board.ctx1.stroke();
        });

    }

}
