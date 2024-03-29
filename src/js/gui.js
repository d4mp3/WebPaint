import emiter from "./signalEmiter";
import config from "./config";
import makeTool from "./makeTool";
import board from "./board";

class Gui {
    constructor(query) {
        this.cnt = null;

        this.generateHTML(query);
        this.bindEvents();
    }

    //generate html for gui
    generateHTML(query) {
        const icons = {
            "eraser": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12.48 3 7.73 7.75 3 12.59a2 2 0 0 0 0 2.82l4.3 4.3A1 1 0 0 0 8 20h12v-2h-7l7.22-7.22a2 2 0 0 0 0-2.83L15.31 3a2 2 0 0 0-2.83 0zM8.41 18l-4-4 4.75-4.84.74-.75 4.95 4.95-4.56 4.56-.07.08z"></path></svg>`,
            "undo": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M9 10h6c1.654 0 3 1.346 3 3s-1.346 3-3 3h-3v2h3c2.757 0 5-2.243 5-5s-2.243-5-5-5H9V5L4 9l5 4v-3z"></path></svg>`,
            "redo": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M9 18h3v-2H9c-1.654 0-3-1.346-3-3s1.346-3 3-3h6v3l5-4-5-4v3H9c-2.757 0-5 2.243-5 5s2.243 5 5 5z"></path></svg>`,
            "wiper": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"/></svg>`,
            "brush": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15.456 9.678l-.142-.142a5.475 5.475 0 0 0-2.39-1.349c-2.907-.778-5.699.869-6.492 3.83-.043.16-.066.34-.104.791-.154 1.87-.594 3.265-1.8 4.68 2.26.888 4.938 1.514 6.974 1.514a5.505 5.505 0 0 0 5.31-4.078 5.497 5.497 0 0 0-1.356-5.246zM13.29 6.216l4.939-3.841a1 1 0 0 1 1.32.082l2.995 2.994a1 1 0 0 1 .082 1.321l-3.84 4.938a7.505 7.505 0 0 1-7.283 9.292C8 21.002 3.5 19.5 1 18c3.98-3 3.047-4.81 3.5-6.5 1.058-3.95 4.842-6.257 8.789-5.284zm3.413 1.879c.065.063.13.128.193.194l1.135 1.134 2.475-3.182-1.746-1.746-3.182 2.475 1.125 1.125z"/></svg>`,
            "line": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 11H19V13H5z"/></svg>`,
            "rectangle": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20,3H4C3.448,3,3,3.447,3,4v16c0,0.553,0.448,1,1,1h16c0.553,0,1-0.447,1-1V4C21,3.447,20.553,3,20,3z M19,19H5V5h14V19z"/></svg>`,
            "circle": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z"/></svg>`,
            "triangle": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19zm9-12.243L19.092 17H4.908L12 6.757z"></path></svg>`,
            "saver": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"></path></svg>`

        };

        this.cnt = document.createElement("div");
        this.cnt.classList.add("gui");

        this.cnt.innerHTML = `
            <div class="gui-color">
                <span class="gui-color__element"></span>
            </div>
            <ul class="gui-tools">
                ${config.tools.map(el => {
                    return `<li class="gui-tools__element" data-tool="${el.tool}">${icons[el.tool]}</li>`
                }).join("")}
            </ul>
        `;
        document.querySelector(query).append(this.cnt);
    }

    updateToolsList(toolName) {
        if (toolName !== "wiper" &&
            toolName !== "saver" &&
            toolName !== "undo" &&
            toolName !== "redo" ) {
            this.cnt.querySelectorAll(".gui-tools__element").forEach(el => {
                el.classList.remove("is-active");
            });

            this.cnt.querySelector(`.gui-tools__element[data-tool="${toolName}"]`).classList.add("is-active");
        }

    }

    updateColor(color) {
        this.cnt.querySelector(".gui-color__element").style.background = color;
    }

    bindEvents() {
        //after click at list's elements change current tool and emit signal
        this.cnt.querySelectorAll(".gui-tools__element").forEach(el => {
            el.addEventListener("click", e => {
                const tool = makeTool(el.dataset.tool);
                if (el.dataset.tool !== "wiper" &&
                    el.dataset.tool !== "saver" &&
                    el.dataset.tool !== "undo" &&
                    el.dataset.tool !== "redo") {
                    board.setTool(tool);
                }
            })
        })

        emiter.changeTool.on(tool => {
            this.updateToolsList(tool.name);
        })

        emiter.changeColor.on(color => {
            this.updateColor(color);
        })
    }
}

const gui = new Gui("#app");
export default gui;