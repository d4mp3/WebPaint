import board from "../board";
import Tool from "./tool";

export default class Wiper extends Tool {
	constructor() {
		super();
		this.name = "wiper";
		this._draw = false;
        this._prevX = 0;
        this._prevY = 0;
        board.ctx1.clearRect(0, 0, board.ctx1.canvas.width, board.ctx1.canvas.height);
    }

}