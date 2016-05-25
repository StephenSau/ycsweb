(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common'], function ($, common) {
    	$('#tc_notice_btn').click(function (event) {
    		var status = $(this).data('status');
    		if (!status || status === "hide") {
    			$('#tc_notice_box').show();
    			$(this).data('status', 'show');
    			$(this).children('img').attr('src', '../public/img/topic/topic002022.png');
    				
    		} else if ( status === "show") {
    			$('#tc_notice_box').hide();
    			$(this).data('status', 'hide');
    			$(this).children('img').attr('src', '../public/img/topic/topic002020.png');		
    		}
    	});

        $('#tc_orderBtn').click(function () {
            document.getElementById('jumpOrderForm').serviceItemInfos.value = $.toJSON([{"price":"0.00","servicerServicesid":"5659","serviceItemId":"143","name":"0元工商注册","servicerServicedetailId":""}]);
            $('#jumpOrderForm').submit();
        });
        
    });
}(window.requirejs));