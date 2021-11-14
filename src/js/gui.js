import emiter from "./signalEmiter";
import board from "./board";

class Gui {
    constructor() {
        this.cnt = document.createElement("div");
        this.cnt.classList.add("gui");
        document.body.append(this.cnt);

        this.bindEvents();
    }

    showInfo() {
        setTimeout(() => {
            this.cnt.innerHTML = `
                <span>${board.currentTool.name}</span>
                <span>${board.toolParams.size}</span>
                <span>${board.toolParams.color}</span>
            `;
        })
    }

    bindEvents() {
        emiter.changeTool.on(toolName => {
            this.showInfo();
        })

        emiter.changeColor.on(color => {
            this.showInfo();
        })

        emiter.changeSize.on(size => {
            this.showInfo();
        })
    }
}

const gui = new Gui();
export default gui;