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

	//     //draw pointer at cursor's place
    // drawPointer(x, y, ctx, toolProp) {
    //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //     ctx.save();
    //     ctx.lineWidth = 2;
    //     ctx.lineCap = "round";
    //     ctx.strokeStyle = toolProp.color;
    //     ctx.globalAlpha = 1;
    //     ctx.beginPath();
    //     ctx.arc(x, y, toolProp.size/2-1, 0, 2 * Math.PI);
    //     ctx.stroke();
    //     ctx.closePath();
    //     ctx.restore();
	// }

	// onMouseMove(x, y, ctx1, ctx2, toolProp) {
    //     this.drawPointer(x, y, ctx2, toolProp);
    // }

	// onMouseUp(x, y, ctx1, ctx2, toolProp) {
    //     this._draw = false;
    //     ctx1.restore();
    // }

	// onMouseDown(x, y, ctx1, ctx2, toolProp) {
    //     if (!this._draw) {
    //         this._draw = true;
    //         ctx1.save();
    //     }
    // }
}