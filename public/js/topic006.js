(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common','carousel'], function ($, common,carousel) {
        $('#carouselBox').carousel({
        	callback: function (obj) {
        		$('#info').html(obj.data('title')).attr("href",obj.children("a").attr("href"));

        	}
        });
    });
}(window.requirejs));/**
 * Created by Administrator on 2015/11/23 0023.
 */
