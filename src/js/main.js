import style from "../scss/main.scss";
import board from "./board";
import makeTool from "./makeTool";
import control from "./control";
import emiter from "./signalEmiter";
import gui from "./gui";

class App {
	constructor() {
		this.test();
		board.setTool(makeTool("brush"));
		board.setColor("black");
		board.setSize(8);
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

		emiter.changeModifier.on(modifier => {
			console.log("Modifier changed for: ", modifier);
		})

		emiter.changeCtrl.on(bool => {
			console.log("Ctrl: ", bool);
		})
	}
}

new App();