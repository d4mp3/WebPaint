import Tool from "./tool";

export default class Brush extends Tool {
	constructor() {
		super();
		this.name = "brush";
		console.log(this.name);
	}
}