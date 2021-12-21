import board from "../board";
import Tool from "./tool";

export default class Saver extends Tool {
	constructor() {
		super();
		this.name = "saver";
		this._draw = false;
        this._prevX = 0;
        this._prevY = 0;
        this.imageName = prompt('Enter image name');

        if (this.imageName === null) {
            return;     // break out of the function if user clicked cancel
            }
        else {
            const canvasDataURL = board.canvas1.toDataURL();
            this.a = document.createElement('a');
            this.a.href = canvasDataURL;
            this.a.download = this.imageName || 'drawing';
            this.a.click();
        }
    }

}