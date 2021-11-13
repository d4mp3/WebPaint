import Tool from "./tool";

export default class Rectangle extends Tool {
	constructor() {
		super();
		this.name = "rectangle";
		console.log(this.name);
	}
}