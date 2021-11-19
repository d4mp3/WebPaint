import Tool from "./tool.js";

export default class Line extends Tool {
    constructor() {
        super();
        this.name = "line";
        this._draw = false;
        this._startX = 0;
        this._startY = 0;
    }

    drawFigure(x, y, ctx, toolProp) {
        ctx.lineWidth = toolProp.size;
        ctx.lineCap = "square";
        ctx.strokeStyle = toolProp.color;
        ctx.beginPath();
        ctx.moveTo(this._startX, this._startY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    drawPointer(x, y, ctx, toolProp) {
        ctx.save();
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = toolProp.color;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.strokeRect(x - toolProp.size / 2, y - toolProp.size / 2, toolProp.size, toolProp.size);
        ctx.restore();
    }

    onMouseMove(x, y, ctx1, ctx2, toolProp) {
        ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);

 		//if user does't hold key draw straight pointer
		//if key is pressed draw line on secondary canvas
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

	//if user hold mouse key set start position of line
    onMouseDown(x, y, ctx1, ctx2, toolProp) {
        if (!this._draw) {
            this._draw = true;
            this._startX = x;
            this._startY = y;
        }
    }
}