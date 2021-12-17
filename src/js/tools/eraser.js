import Tool from "./tool";

export default class Eraser extends Tool {
	constructor() {
		super();
		this.name = "eraser";
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
        ctx.strokeRect(x - toolProp.size / 2, y - toolProp.size / 2, toolProp.size, toolProp.size);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
	}

	onMouseMove(x, y, ctx1, ctx2, toolProp) {
        //if mouse key is pressed draw on canvas
        if (!this._draw) {
            this.drawPointer(x, y, ctx2, toolProp);
        } else {
            this.drawPointer(x, y, ctx2, toolProp);
            ctx1.globalCompositeOperation = "destination-out";
            ctx1.lineWidth = toolProp.size;
            ctx1.lineCap = "round";
            ctx1.strokeStyle = "rgba(255,255,255,1)";
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