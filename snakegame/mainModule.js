    var mainObj = mainObj || {};
    var Controller = Controller || {};
    var Component = Component || {};
    var tail = tail || {};

    /**
     * mainObj Draw
     */
    mainObj.Draw = function(context, snake) {

        // Draw Stage
        this.drawStage = function() {

            // Check Keypress And Set Stage direction
            var keyPress = snake.stage.keyEvent.getKey();
            if (typeof(keyPress) != 'undefined') {
                snake.stage.direction = keyPress;
            }

            // Draw White Stage
            context.fillStyle = "green";
            context.fillRect(0, 0, snake.stage.width, snake.stage.height);

            // Snake Position
            var nx = snake.stage.length[0].x;
            var ny = snake.stage.length[0].y;

            // Add position by stage direction
            switch (snake.stage.direction) {
                case 'right':
                    nx++;
                    break;
                case 'left':
                    nx--;
                    break;
                case 'up':
                    ny--;
                    break;
                case 'down':
                    ny++;
                    break;
            }

            // Check Collision
            if (this.collision(nx, ny) === true) {
                snake.restart();
                return;
            }

            // Logic of Snake food
            if (nx == snake.stage.food.x && ny == snake.stage.food.y) {
                tail = {
                    x: nx,
                    y: ny
                };
                snake.stage.score++;
                snake.initFood();
            } else {
                tail = snake.stage.length.pop();
                tail.x = nx;
                tail.y = ny;
            }
            snake.stage.length.unshift(tail);

            // Draw Snake
            for (var i = 0; i < snake.stage.length.length; i++) {
                var cell = snake.stage.length[i];
                this.drawCell(cell.x, cell.y);
            }

            // Draw Food
            this.drawCell(snake.stage.food.x, snake.stage.food.y);

            // Draw Score
            context.fillText('Score: ' + snake.stage.score, 5, (snake.stage.height - 5));
        };

        // Draw Cell
        this.drawCell = function(x, y) {
            context.fillStyle = 'rgb(170, 170, 170)';
            context.beginPath();
            context.arc((x * snake.stage.conf.cw + 6), (y * snake.stage.conf.cw + 6), 4, 0, 2 * Math.PI, false);
            context.fill();
        };

        // Check Collision with walls
        this.collision = function(nx, ny) {
            if (nx == -1 || nx == (snake.stage.width / snake.stage.conf.cw) || ny == -1 || ny == (snake.stage.height / snake.stage.conf.cw)) {
                return true;
            }
            return false;
        };
    };


    /**
     * mainObj Snake
     */
    mainObj.Snake = function(elementId, conf) {

        // Sets
        var canvas = document.getElementById(elementId);
        var context = canvas.getContext("2d");
        var snake = new Component.Snake(canvas, conf);
        var mainObjDraw = new mainObj.Draw(context, snake);

        // mainObj Interval
        setInterval(function() {
            mainObjDraw.drawStage();
        }, snake.stage.conf.fps);
    };
