import Tool from "./tool";

export default class Brush extends Tool {
	constructor() {
		super();
		this.name = "brush";
		this._draw = false;
        this._prevX = 0;
        this._prevY = 0;
	}

	    //draw pointer at cursor's place
    drawPointer(x, y, ctx, toolProp) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.save();
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = toolProp.color;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(x, y, toolProp.size/2-1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
	}

	onMouseMove(x, y, ctx1, ctx2, toolProp) {
        //if mouse key is pressed draw on canvas
        if (!this._draw) {
            this.drawPointer(x, y, ctx2, toolProp);
        } else {
            ctx1.lineWidth = toolProp.size;
            ctx1.lineCap = "round";
            ctx1.strokeStyle = toolProp.color;
            ctx1.beginPath();
            ctx1.moveTo(this._prevX , this._prevY);
            ctx1.lineTo(x, y);
            ctx1.stroke();
        }

        this._prevX = x;
        this._prevY = y;
    }

	onMouseUp(x, y, ctx1, ctx2, toolProp) {
        this._draw = false;
        ctx1.restore();
    }

	onMouseDown(x, y, ctx1, ctx2, toolProp) {
        if (!this._draw) {
            this._draw = true;
            ctx1.save();
        }
    }
}