import style from "../scss/main.scss";
import board from "./board";
import makeTool from "./makeTool";
import control from "./control";
import emiter from "./signalEmiter";

class App {
	constructor() {
		this.test();
		board.setTool(makeTool("brush"));
		board.setColor("black");
		board.setSize(7);
	}
	
	test() {
		emiter.changeTool.on(tool => {
			console.log("Tool changed for ", tool);
		})
		
		emiter.changeSize.on(size => {
			console.log("Resized to ", size);
		})
		
		emiter.changeColor.on(color => {
			console.log("Color changed for ", color);
		})
	}
}

new App();