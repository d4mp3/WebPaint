export default class EventObserver {
	constructor() {
		this.subscribers = [];
	}
	
	on(fn) {	//subscription  - add fn to array
		this.subscribers.push(fn);
	}
	
	off(fn) {	//remove from array
		this.subscribers = this.subscribers.filter(el => el !== fn);
	}
	
	emit(data) {	//invoke all functions in array
		this.subscribers.forEach(fn => {
			fn(data);
		});
	}
}