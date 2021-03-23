class WebPaint {
    constructor() {
        this.canvasBg = new Image();
        this.canvasBg.addEventListener('load', () => {
            this.avaibleMode = ['eraser', 'pen', 'line', 'rectangle', 'circle', 'triangle'];

            // container for canvas
            this.canvasCnt = document.querySelector('.webpaint-canvas-cnt');

            this.createCanvas();

            // check for possible of drawing
            this.canDraw = false;
            this.bErasing = false;

            // pinn elements of canvas
            this.setupControls();
            this.bindControls();

            // set default values for canvas
            this.setupInitialCtx();
    });
        this.canvasBg.src = "images/paper-bg.jpg";
    }

    getElementPos(obj) {
        let top = 0;
        let left = 0;
        while (obj && obj.tagName != "BODY") {
            top += obj.offsetTop - obj.scrollTop;
            left += obj.offsetLeft - obj.scrollLeft;
            obj = obj.offsetParent;
        }
        return {
            top: top,
            left: left
        };
    }

    getMousePosition(e) {
        const mouseX = e.pageX - this.getElementPos(this.canvas).left;
        const mouseY = e.pageY - this.getElementPos(this.canvas).top;
        return {
            x: mouseX,
            y: mouseY
        };
    }

    mouseMove(e) {
        if (this.canDraw) {
            if (this.bErasing == true) {
                this.ctx2.globalCompositeOperation = "destination-out";
            } else {
              this.ctx2.globalCompositeOperation = "source-over";
            }
            const mousePos = this.getMousePosition(e);
            switch (this.mode) {
                case "eraser" : {
                    this.erase();
                    this.ctx2.lineTo(mousePos.x, mousePos.y);
                    this.ctx2.stroke();
                    break;
                }
                case "pen": {
                    this.stopErase();
                    this.ctx2.lineTo(mousePos.x, mousePos.y);
                    this.ctx2.stroke();
                    break;
                }

                case "line": {
                    this.stopErase();
                    // each pixel clean canvas
                    this.ctx3.clearRect(0, 0, this.canvas3.width, this.canvas3.height);
                    this.ctx3.beginPath();
                    // draw line from start postion...
                    this.ctx3.moveTo(this.startX, this.startY);
                    // ...to current cursor's position
                    this.ctx3.lineTo(mousePos.x, mousePos.y);
                    this.ctx3.closePath();
                    this.ctx3.stroke();
                    break;
                }

                case "rectangle": {
                    this.stopErase();
                    this.ctx3.clearRect(0, 0, this.canvas3.width, this.canvas3.height);
                    this.ctx3.beginPath();
                    this.ctx3.moveTo(this.startX, this.startY);
                    this.ctx3.rect(this.startX, this.startY, mousePos.x - this.startX, mousePos.y - this.startY);
                    this.ctx3.closePath();
                    this.typeDraw();
                    break;
                }

                case "circle": {
                    this.stopErase();
                    this.ctx3.clearRect(0, 0, this.canvas3.width, this.canvas3.height);
                    this.ctx3.beginPath();
                    this.ctx3.arc(this.startX, this.startY, this.circleRadius(e), 0, 2 * Math.PI, false);
                    this.ctx3.closePath();
                    this.typeDraw();
                    break;
                }

                case "triangle": {
                    this.stopErase();
                    this.ctx3.clearRect(0, 0, this.canvas3.width, this.canvas3.height);
                    this.ctx3.beginPath();
                    this.ctx3.moveTo(this.startX, this.startY);
                    this.ctx3.lineTo(mousePos.x, mousePos.y);
                    this.ctx3.lineTo(this.sideOfTriangle(e), mousePos.y);
                    this.ctx3.closePath();
                    this.typeDraw();
                    break;
                }
            }
        }
    }

    circleRadius(e) {
        const mousePos = this.getMousePosition(e);
        let radius = 0;
        let SquareRadius = Math.pow((mousePos.x - this.startX), 2) + Math.pow((mousePos.y - this.startY), 2);
        radius = Math.sqrt(SquareRadius);
        return radius;
    }

    sideOfTriangle(e) {
        const mousePos = this.getMousePosition(e);
        let halfLength = mousePos.x - this.startX;      // 1/2 distance of lower edge of the triangle
        let sideLenght = this.startX - halfLength;
        return sideLenght;
    }

    mouseEnable(e) {
        this.canDraw = true;
        const mousePos = this.getMousePosition(e);

        this.startX = mousePos.x;
        this.startY = mousePos.y;
        this.ctx2.beginPath();
        this.ctx2.moveTo(this.startX, this.startY);


    }

    mouseDisable(e) {
        this.canDraw = false;
        this.bErasing = false;

        if (this.mode === "line" || this.mode === "rectangle" || this.mode === "circle" || this.mode === "triangle") {
            // copy canvas3 to canvas2
            this.ctx2.drawImage(this.canvas3, 0, 0);
            // clean third canvas
            this.ctx3.clearRect(0, 0, this.canvas3.width, this.canvas3.height);
        }
    }

    setupControls() {
        // element getting paint size
        this.sizeElem  = document.querySelector('.paint-size');

        // element showing paint size
        this.sizeElemVal = document.querySelector('.paint-size-val');
        this.sizeElemVal.innerText = this.sizeElem.value;

        // color picker element
        this.colorElem = document.querySelector('.paint-color');

        // clear button
        this.clearButton = document.getElementById('clear');

        // save button
        this.saveButton = document.getElementById('save');

        //fill button
        this.fillButon = document.getElementById('fill');

        // action button
        this.btnsMode = [...document.querySelectorAll('.webpaint-buttons-cnt .button-mode')];

    }

    bindControls() {
        this.sizeElem.addEventListener('change', this.changeSize.bind(this));
        this.sizeElem.addEventListener('input', this.changeSize.bind(this));

        this.colorElem.addEventListener('change', this.changeColor.bind(this));

        this.canvasCnt.addEventListener('mousemove', this.mouseMove.bind(this));
        this.canvasCnt.addEventListener('mouseup', this.mouseDisable.bind(this));
        this.canvasCnt.addEventListener('mousedown', this.mouseEnable.bind(this));

        this.clearButton.addEventListener('click', this.clear.bind(this));
        this.saveButton.addEventListener('click', this.save.bind(this));
        this.fillButon.addEventListener('click', this.fill.bind(this));

        // after click at change draw mode button
        // turn off .active class for brothers
        // set draw mode from dataset.mode

        for (const el of this.btnsMode) {
            el.addEventListener('click', (e) => {
                e.currentTarget.classList.add('active');
                this.mode = e.currentTarget.dataset.mode;

                for (const el of this.btnsMode) {
                    if (el !== e.currentTarget) {
                        el.classList.remove('active');
                    }
                }
            });
        }
    }

    setupInitialCtx() {
        // canvas background
        this.ctx.drawImage(this.canvasBg, 0, 0);

        //  default settings of pen
        this.ctx2.lineWidth = this.sizeElem.value;
        this.ctx2.lineJoin = "round";
        this.ctx2.lineCap = "round";
        this.ctx2.strokeStyle = this.colorElem.value;

        // settings for third canvas (for example for line mode)
        this.ctx3.lineWidth = this.sizeElem.value;
        this.ctx3.strokeStyle = this.colorElem.value;
    }

    changeSize(e) {
        // displayed value by input:range
        this.sizeElemVal.innerText = e.target.value;
        // this.ctx.lineWidth = e.target.value;
        this.ctx2.lineWidth = e.target.value;
        this.ctx3.lineWidth = e.target.value;
    }

    changeColor(e) {
        const color = this.colorElem.value;
        this.ctx2.strokeStyle = color;
        this.ctx3.strokeStyle = color;
    }

    createCanvas() {
        // frst ctx is for constant not modifiable background
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvasCnt.offsetWidth;
        this.canvas.height = this.canvasCnt.offsetHeight;
        this.canvasCnt.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        // ctx2 is main workspace for drawings
        this.canvas2 = document.createElement("canvas");
        this.canvas2.width = this.canvasCnt.offsetWidth;
        this.canvas2.height = this.canvasCnt.offsetHeight;
        this.canvasCnt.appendChild(this.canvas2);
        this.ctx2 = this.canvas2.getContext("2d");
        // ctx3 is for draw figure purpose
        this.canvas3 = document.createElement("canvas");
        this.canvas3.width = this.canvasCnt.offsetWidth;
        this.canvas3.height = this.canvasCnt.offsetHeight;
        this.canvasCnt.appendChild(this.canvas3);
        this.ctx3 = this.canvas3.getContext("2d");
    }

    enabeMode(mode) {
        // check if the mode is correct
        if (this.avaibleMode.indexOf(mode) !== -1) {
            this.mode = mode;
        }
    }

    angleToRadian(angle) {
        return Math.PI/180 * angle;
    }

    clear() {
        this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
    }

    save() {
        this.imageName = prompt('Enter image name');
        if (this.imageName === null) {
            return;     // break out of the function if user clicked cancel
            }
            else {
                let canvasDataURL = this.canvas.toDataURL();
                this.a = document.createElement('a');
                this.a.href = canvasDataURL;
                this.a.download = this.imageName || 'drawing';
                this.a.click();
            }
    }

    erase() {
        this.bErasing = true;
    }

    stopErase() {
        this.bErasing = false;
    }

    fill() {
        if(this.fillButon.classList.contains('active')) {
            this.fillButon.classList.remove('active');
        } else {
            this.fillButon.classList.add('active');
        }
    }

    typeDraw() {
        let drawMthd = 0;     //variable for kind of sketching (fill or stroke)
        if(this.fillButon.classList.contains('active')) {
            drawMthd = this.ctx3.fill();
            return drawMthd;
        } else {
            drawMthd = this.ctx3.stroke();
            return drawMthd;
        }
    }
}

new WebPaint();

