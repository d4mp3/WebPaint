import Brush from "./tools/brush";
import Line from "./tools/line";
import Rectangle from "./tools/rectangle";

export default function(tool) {
	switch (tool) {
		case "brush":
			return new Brush();
		case "line":
			return  new Line();
		case "rectangle":
			return new Rectangle();
	}
}