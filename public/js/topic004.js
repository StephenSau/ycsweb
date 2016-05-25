(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common'], function ($, common) {
        $('#tc_orderBtn').click(function () {
            document.getElementById('jumpOrderForm').serviceItemInfos.value = $.toJSON([{"price":"0.00","servicerServicesid":"5659","serviceItemId":"143","name":"0元工商注册","servicerServicedetailId":""}]);
            $('#jumpOrderForm').submit();
        });
        $(window).on('scroll', function () {
        	var bodyScrollHeight = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),
        		windowHeight = $(this).height(),
        		scrollLength = bodyScrollHeight - windowHeight,
        		flagPoint = scrollLength - $('#footer').outerHeight();
        	if ($(this).scrollTop() >= flagPoint) {
        		$('#btnLine').css({
        			position: 'relative'
        		});
        	} else {
        		$('#btnLine').css({
        			position: 'fixed'
        		});
        	}
        });
    });
}(window.requirejs));