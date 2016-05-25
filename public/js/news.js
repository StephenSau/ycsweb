(function (requirejs) {
    "use strict";
    requirejs(['jquery',  'common', 'tab', 'carousel'], function ($, common, tab, carousel) {
        function News() {
            this.init();
        }
        
        News.prototype = {
            init: function () {
                $('#carouselBox').carousel();
                $('#rank_tab').tab({
                    prev: true,
                    ant: true
                });
            }
        };
        
        var news = new News();
    });
}(window.requirejs));