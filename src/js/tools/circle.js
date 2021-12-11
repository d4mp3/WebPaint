import Tool from "./tool";

export default class Circle extends Tool {
    constructor() {
        super();
        this.name = "circle";
        console.log(this.name);
    }
}