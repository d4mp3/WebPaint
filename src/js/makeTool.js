import Brush from "./tools/brush";
import Line from "./tools/line";
import Rectangle from "./tools/rectangle";
import Circle from "./tools/circle";
import Triangle from "./tools/Triangle";
import Eraser from "./tools/Eraser";
import Wiper from "./tools/wiper";
import Saver from "./tools/saver";

export default function(tool) {
    switch (tool) {
        case "brush":
            return new Brush();
        case "line":
            return new Line();
        case "rectangle":
            return new Rectangle();
         case "circle":
            return new Circle();
        case "triangle":
            return new Triangle();
        case "eraser":
            return new Eraser();
        case "wiper":
            return new Wiper();
        case "saver":
            return new Saver();
    }
}