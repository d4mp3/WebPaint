import emiter from "./signalEmiter";

function createCanvas(id, parentElement) {
    const canvas = document.createElement("canvas");
    canvas.width =  parentElement.offsetWidth;
    canvas.height = parentElement.offsetHeight;
    canvas.id = id;
    return canvas;
}

class Board {
    constructor(query) {
        this.container = document.querySelector(query);

        this.canvas1 = createCanvas("mainCanvas", this.container);
        this.canvas2 = createCanvas("secondaryCanvas", this.container);

        this.container.append(this.canvas1);
        this.container.append(this.canvas2);

        this.ctx1 = this.canvas1.getContext("2d");
        this.ctx2 = this.canvas2.getContext("2d");

        this.history = [];
        this.trace = [];
        this.pressedMouse = false;

        this.mouse = { x: 0, y : 0 };
        this.currentTool = null;
        this.toolParams = {
            color: "black",
            size: 8,
            cap: "round",
            isCtrl: false,
            modifier: null,
        };

        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener("mousemove", e => {
            this.mouse.x = e.pageX;
            this.mouse.y = e.pageY;

            if (this.currentTool) {
                this.currentTool.onMouseMove(e.pageX, e.pageY, this.ctx1, this.ctx2, this.toolParams);
                if (this.pressedMouse == true) {
                    this.trace.push({
                        x: e.pageX,
                        y: e.pageY
                    });
                }
            }
        });


        this.canvas1.addEventListener("mousedown", e => {
            if (this.currentTool) {
                this.currentTool.onMouseDown(e.offsetX, e.offsetY, this.ctx1, this.ctx2, this.toolParams);
                this.trace.push({
                    x: e.offsetX,
                    y: e.offsetY
                });
            }

            this.pressedMouse = true;
        });

        //push trace to history
        this.canvas1.addEventListener("mouseup", e => {
            this.pressedMouse = false;
            this.toolProps = structuredClone(this.toolParams);
            this.history.push({
                drawedPath: this.trace,
                tool: this.currentTool,
                toolProps: this.toolProps
            });
            if (this.currentTool) {
                this.currentTool.onMouseUp(e.offsetX, e.offsetY, this.ctx1, this.ctx2, this.toolParams);
            }
            this.trace = [];
        });
    }

    setColor(color) {
        this.toolParams.color = color;
        this.currentTool.onMouseMove(this.mouse.x, this.mouse.y, this.ctx1, this.ctx2, this.toolParams);
		emiter.changeColor.emit(color);
    }

    setSize(size) {
        this.toolParams.size = size;
        this.currentTool.onMouseMove(this.mouse.x, this.mouse.y, this.ctx1, this.ctx2, this.toolParams);
		emiter.changeSize.emit(size);
    }

    setTool(tool) {
        this.currentTool = tool;
        this.currentTool.onMouseMove(this.mouse.x, this.mouse.y, this.ctx1, this.ctx2, this.toolParams);
		emiter.changeTool.emit(tool);
    }

    setModifier(modifier) {
        this.toolParams.modifier = modifier;
        this.currentTool.onMouseMove(this.mouse.x, this.mouse.y, this.ctx1, this.ctx2, this.toolParams);
		emiter.changeModifier.emit(modifier);
    }

    // setCtrl(bool) {
    //     this.toolParams.isCtrl = bool;
    //     this.currentTool.onMouseMove(this.mouse.x, this.mouse.y, this.ctx1, this.ctx2, this.toolParams);
	// 	emiter.changeCtrl.emit(bool);
    // }
}

const board = new Board("#canvasCnt");
export default board;