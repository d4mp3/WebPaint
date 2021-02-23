class WebPaint {
    constructor() {
        this.canvasBg = new Image();
        this.canvasBg.addEventListener('load', () => {
            this.avaibleMode = ['pen', 'line', 'rectangle'];

            // container for canvas
            this.canvasCnt = document.querySelector('.webpaint-canvas-cnt');

            this.createCanvas();

            // check for possible of drawing
            this.canDraw = false;
            this.mode = 'pen';

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
        }
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
    }

    setupControls() {
        // element getting paint size
        this.sizeElem  = document.querySelector('.paint-size');

        // element showing paint size
        this.sizeElemVal = document.querySelector('.paint-size-val');
        this.sizeElemVal.innerText = this.sizeElem.value;

        // color picker element
        this.colorElem = document.querySelector('.paint-color');

        // action button
        this.btnsMode = [...document.querySelectorAll('.webpaint-buttons-cnt .button-mode')];

        // activate draw mode
        this.btnsMode.filter(function(el) {
            return el.dataset.mode === "pen"
        })[0].classList.add('active');
    }

    bindControls() {
        this.sizeElem.addEventListener('change', this.changeSize.bind(this));
        this.sizeElem.addEventListener('input', this.changeSize.bind(this));

        this.colorElem.addEventListener('change', this.changeColor.bind(this));

        this.canvasCnt.addEventListener('mousemove', this.mouseMove.bind(this));
        this.canvasCnt.addEventListener('mouseup', this.mouseDisable.bind(this));
        this.canvasCnt.addEventListener('mousedown', this.mouseEnable.bind(this));

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
    }

    changeSize(e) {
        // displayed value by input:range
        this.sizeElemVal.innerText = e.target.value;
        this.ctx.lineWidth = e.target.value;
    }

    changeColor(e) {
        const color = this.colorElem.value;
        this.ctx.strokeStyle = color;
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvasCnt.offsetWidth;
        this.canvas.height = this.canvasCnt.offsetHeight;
        this.canvasCnt.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    enabeMode(mode) {
        // check if the mode is correct
        if (this.avaibleMode.indexOf(mode) !== -1) {
            this.mode = mode;
        }
    }



}

new WebPaint();

