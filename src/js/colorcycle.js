(function(global){
    'use strict';

    global.colorCycle = function(cycle, offset) {
        offset = offset || 0;
        cycle = cycle || 0;

        var r = Math.floor(Math.sin(0.3 * cycle + offset + 0) * 127 + 128),
            g = Math.floor(Math.sin(0.3 * cycle + offset + 2) * 127 + 128),
            b = Math.floor(Math.sin(0.3 * cycle + offset + 4) * 127 + 128),
            a = 0.1;
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };
})(this);