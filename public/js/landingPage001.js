(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common'], function ($, common) {
        $('.tc_orderBtn').click(function () { 
            $('#jumpOrderForm').submit();
        });

        $('.tc_orderBtn_2').click(function () {
            $('#jumpOrderForm_2').submit();
        });
        $('#fixed_box').remove();
    });
}(window.requirejs));