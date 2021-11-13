import EventObserver from "./eventObserver";

export default {
	changeTool: new EventObserver(),
	changeColor: new EventObserver(),
	changeSize: new EventObserver(),
}