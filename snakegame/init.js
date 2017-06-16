//Global modules

    var mainObj = mainObj || {};
    var Controller = Controller || {};
    var Component = Component || {};
    var tail  = tail || {};

    /**
     * Window Load
     */
    window.onload = function() {
        var snake = new mainObj.Snake('mainDiv', {
            fps: 100,
            size: 4
        });
    };