(function(){
    'use strict';

    function ready(){
        document.removeElementListener('DOMContentLoaded', ready);
        window.removeElementListener('load', ready);

        var fancyEl = document.querySelectorAll('.fancy');
        fancyEl.innerText = fancyText();
    }

    document.addEventListener('DOMContentLoaded', ready);
    window.addEventListener('load', ready);
})();