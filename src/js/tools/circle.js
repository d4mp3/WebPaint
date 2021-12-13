import Tool from "./tool";

export default class Circle extends Tool {
	constructor() {
		super();
		this.name = "circle";
		this._draw = false;
		this._startX = 0;
		this._startY = 0;
	}

	drawFigure(x, y, ctx, toolProp) {
		ctx.lineWidth = toolProp.size;
		ctx.lineCap = "round";
		ctx.strokeStyle = toolProp.color;
		ctx.beginPath();
		// ctx.strokeRect(this._startX, this._startY, x - this._startX, y - this._startY);
        ctx.arc(this._startX, this._startY, x - this._startX, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
		ctx.restore();
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
        ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);

        if (!this._draw) {
            this.drawPointer(x, y, ctx2, toolProp);
        } else {
            this.drawFigure(x, y, ctx2, toolProp);
        }

    }

    onMouseUp(x, y, ctx1, ctx2, toolProp) {
        if (this._draw) {
            this.drawFigure(x, y, ctx1, toolProp);
        }
        this._draw = false;
    }

    onMouseDown(x, y, ctx1, ctx2, toolProp) {
        if (!this._draw) {
            this._draw = true;
            this._startX = x;
            this._startY = y;
        }
    }
}