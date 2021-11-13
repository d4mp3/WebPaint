import Tool from "./tool";

export default class Line extends Tool {
	constructor() {
		super();
		this.name = "line";
		console.log(this.name);
	}
}