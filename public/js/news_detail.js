(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common', 'share', 'tab'], function ($, common) {
        function NewsDetail() {
            this.init();
        }
        
        NewsDetail.prototype = {
            init: function () {
                $('#rank_tab').tab({
                    ant: true,
                    prev: true
                });
            }
        };
        
        var newsDetail = new NewsDetail();
    });
}(window.requirejs));