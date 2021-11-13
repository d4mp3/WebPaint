import style from "../scss/main.scss";
import board from "./board";
import makeTool from "./makeTool";
import control from "./control";

class App {
	constructor() {
		board.setTool(makeTool("brush"));
		board.setColor("black");
		board.setSize(7);
	}
}

new App();