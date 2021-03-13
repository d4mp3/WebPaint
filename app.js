class WebPaint {
    constructor() {
        this.canvasBg = new Image();
        this.canvasBg.addEventListener('load', () => {
            this.avaibleMode = ['pen', 'line', 'rectangle', 'circle', 'triangle'];

            // container for canvas
            this.canvasCnt = document.querySelector('.webpaint-canvas-cnt');

            this.createCanvas();

            // check for possible of drawing
            this.canDraw = false;

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
            const mousePos = this.getMousePosition(e);

            if (this.mode === "pen") {
                this.ctx.lineTo(mousePos.x, mousePos.y)
                this.ctx.stroke();
            }
            if (this.mode === "line") {
                // each pixel clean canvas
                this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
                this.ctx2.beginPath();
                // draw line from start postion...
                this.ctx2.moveTo(this.startX, this.startY);
                // ...to current cursor's position
                this.ctx2.lineTo(mousePos.x, mousePos.y);
                this.ctx2.closePath();
                this.ctx2.stroke();
            }
            if (this.mode === "rectangle") {
                this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
                this.ctx2.beginPath();
                this.ctx2.moveTo(this.startX, this.startY);
                this.ctx2.rect(this.startX, this.startY, mousePos.x - this.startX, mousePos.y - this.startY);
                this.ctx2.closePath();
                this.ctx2.stroke();
            }
            if (this.mode === "circle") {
                this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
                this.ctx2.beginPath();
                this.ctx2.arc(this.startX, this.startY, this.circleRadius(e), 0, 2 * Math.PI, false);
                this.ctx2.closePath();
                this.ctx2.stroke();
            }
            if (this.mode === "triangle") {
                this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
                this.ctx2.beginPath();
                this.ctx2.moveTo(this.startX, this.startY);
                this.ctx2.lineTo(mousePos.x, mousePos.y);
                this.ctx2.lineTo(this.sideOfTriangle(e), mousePos.y);
                this.ctx2.closePath();
                this.ctx2.stroke();
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

        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
    }

    mouseDisable(e) {
        this.canDraw = false;

        if (this.mode === "line" || this.mode === "rectangle" || this.mode === "circle" || this.mode === "triangle") {
            // copy canvas2 to canvas1
            this.ctx.drawImage(this.canvas2, 0, 0);
            // clean second canvas
            this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
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
        this.ctx.lineWidth = this.sizeElem.value;
        this.ctx.lineJoin = "round";
        this.lineCap = "round";
        this.ctx.strokeStyle = this.colorElem.value;

        // settings for second canvas (line mode)
        this.ctx2.lineWidth = this.sizeElem.value;
        this.ctx2.strokeStyle = this.colorElem.value;
    }

    changeSize(e) {
        // displayed value by input:range
        this.sizeElemVal.innerText = e.target.value;
        this.ctx.lineWidth = e.target.value;
        this.ctx2.lineWidth = e.target.value;
    }

    changeColor(e) {
        const color = this.colorElem.value;
        this.ctx.strokeStyle = color;
        this.ctx2.strokeStyle = color;
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvasCnt.offsetWidth;
        this.canvas.height = this.canvasCnt.offsetHeight;
        this.canvasCnt.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.canvas2 = document.createElement("canvas");
        this.canvas2.width = this.canvasCnt.offsetWidth;
        this.canvas2.height = this.canvasCnt.offsetHeight;
        this.canvasCnt.appendChild(this.canvas2);
        this.ctx2 = this.canvas2.getContext("2d");
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasBg.src = "images/paper-bg.jpg";
    }

    save() {
        this.imageName = prompt('Enter image name');
        let canvasDataURL = this.canvas.toDataURL();
        this.a = document.createElement('a');
        this.a.href = canvasDataURL;
        this.a.download = this.imageName || 'drawing';
        this.a.click();
    }
}

new WebPaint();

