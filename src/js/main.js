(function(){
    'use strict';

    function ready(){
        document.removeEventListener('DOMContentLoaded', ready, false);
        window.removeEventListener('load', ready, false);

        var ribbons = new Ribbons();
    }

    document.addEventListener('DOMContentLoaded', ready, false);
    window.addEventListener('load', ready, false);
})();