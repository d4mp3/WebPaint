import board from "./board";
import config from "./config";
import makeTool from "./makeTool";

class Control {
    constructor() {
        this.keyUpTool = this.keyUpTool.bind(this);
        this.keyUpColor = this.keyUpColor.bind(this);
        this.wheelSize = this.wheelSize.bind(this);

        document.addEventListener("keyup", this.keyUpTool);
        document.addEventListener("keyup", this.keyUpColor);
        document.addEventListener("wheel", this.wheelSize);
    }

    keyUpTool(e) {
        config.tools.forEach(el => {
            if (e.key === el.key) {
                const tool = makeTool(el.tool);
                board.setTool(tool);
            }
        });
    }

    keyUpColor(e) {
        config.colors.forEach(el => {
            if (e.key === el.key) {
                const color = el.color;
                board.setColor(color);
            }
        });
    }

    wheelSize(e) {
        let size = board.toolParams.size;
        if (e.deltaY > 0) size = this.decreaseWidth(size);
        if (e.deltaY < 0) size = this.increaseWidth(size);
        board.setSize(size);
   }

    decreaseWidth(size) {
        size -= 5;
        return Math.max(10, size);
    }

    increaseWidth(size) {
        size += 5;
        return Math.min(60, size);
    }
}

const control = new Control();
export default control;