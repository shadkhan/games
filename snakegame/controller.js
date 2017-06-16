    var mainObj = mainObj || {};
    var Controller = Controller || {};
    var Component = Component || {};
    var tail = tail || {};

    /**
     * Controller keyboard key sets and event handle
     */
    Controller.Keymap = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    /**
     * Actions
     */
    Controller.ControllerEvents = function() {

        // Setts
        var self = this;
        this.pressKey = null;
        this.keymap = Controller.Keymap;

        // Keydown Event
        document.onkeydown = function(event) {
            self.pressKey = event.which;
        };

        // Get Key
        this.getKey = function() {
            return this.keymap[this.pressKey];
        };
    };
