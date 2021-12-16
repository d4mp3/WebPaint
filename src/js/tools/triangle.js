import Tool from "./tool";

export default class Triangle extends Tool {
	constructor() {
		super();
		this.name = "triangle";
		this._draw = false;
		this._startX = 0;
		this._startY = 0;
	}


    sideOfTriangle(x) {
        return this._startX - (x - this._startX)
    }

	drawFigure(x, y, ctx, toolProp) {
		ctx.lineWidth = toolProp.size;
		ctx.lineCap = "round";
		ctx.strokeStyle = toolProp.color;
		ctx.beginPath();
        ctx.moveTo(this._startX, this._startY);
        ctx.lineTo(x, y);
        ctx.lineTo(this.sideOfTriangle(x), y);
        ctx.closePath();
        ctx.stroke();
		ctx.restore();
	}

	drawPointer(x, y, ctx, toolProp) {
        ctx.save();
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = toolProp.color;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(x, y - toolProp.size / 2);
        ctx.lineTo((x - toolProp.size / 2) + toolProp.size, (y - toolProp.size / 2) + toolProp.size);
        ctx.lineTo((x - toolProp.size / 2), (y - toolProp.size / 2) + toolProp.size);
        ctx.closePath();
        ctx.stroke();
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