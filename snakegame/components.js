    var mainObj = mainObj || {};
    var Controller = Controller || {};
    var Component = Component || {};
    var tail = tail || {};


    /**
     *  Component 
     */
    Component.Stage = function(canvas, conf) {

        // Sets
        this.keyEvent = new Controller.ControllerEvents();
        this.width = canvas.width;
        this.height = canvas.height;
        this.length = [];
        this.food = {};
        this.score = 0;
        this.direction = 'right';
        this.conf = {
            cw: 10,
            size: 5,
            fps: 1000
        };

        // Merge Conf
        if (typeof conf == 'object') {
            for (var key in conf) {
                if (conf.hasOwnProperty(key)) {
                    this.conf[key] = conf[key];
                }
            }
        }

    };

    /**
     *  Component Snake
     */
    Component.Snake = function(canvas, conf) {

        // mainObj Stage
        this.stage = new Component.Stage(canvas, conf);

        // Init Snake
        this.initSnake = function() {

            // Itaration in Snake Conf Size
            for (var i = 0; i < this.stage.conf.size; i++) {

                // Add Snake Cells
                this.stage.length.push({
                    x: i,
                    y: 0
                });
            }
        };

        // Call init Snake
        this.initSnake();

        // Init Food  
        this.initFood = function() {

            // Add food on stage
            this.stage.food = {
                x: Math.round(Math.random() * (this.stage.width - this.stage.conf.cw) / this.stage.conf.cw),
                y: Math.round(Math.random() * (this.stage.height - this.stage.conf.cw) / this.stage.conf.cw),
            };
        };

        // Init Food
        this.initFood();

        // Restart Stage
        this.restart = function() {
            this.stage.length = [];
            this.stage.food = {};
            this.stage.score = 0;
            this.stage.direction = 'right';
            this.stage.keyEvent.pressKey = null;
            this.initSnake();
            this.initFood();
        };
    };
