(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common'], function ($, common) {
    	$('#tc_orderBtn').click(function () {
            document.getElementById('jumpOrderForm').serviceItemInfos.value = $.toJSON([{"price":"199.00","servicerServicesid":"5660","serviceItemId":"173","name":"199元/年 个体工商户代理申报","servicerServicedetailId":""}]);
            $('#jumpOrderForm').submit();
        });
    });
}(window.requirejs));