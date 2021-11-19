import control from "../control";
import board from "../board";
export default class Tool {
	constructor() {
		this.name = "";
	}

	drawPointer(x, y, ctx1, ctx2, toolProp) {}

	onMouseMove(x, y, ctx1, ctx2, toolProp) {}

	onMouseUp(x, y, ctx1, ctx2, toolProp) {}

	onMouseDown(x, y, ctx1, ctx2, toolProp) {}
}