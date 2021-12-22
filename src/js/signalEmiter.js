import EventObserver from "./eventObserver";

export default {
	changeTool: new EventObserver(),
	changeColor: new EventObserver(),
	changeSize: new EventObserver(),
	changeCtrl: new EventObserver(),
	changeModifier: new EventObserver(),
}
