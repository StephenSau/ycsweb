(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common'], function ($, common) {
        function startCountDown () {
            var time = 5,
                text = $('#rsb_countDownText'),
                countDown = function () {
                    time = time - 1;
                    text.text(time);
                    if (time > 0) {
                        setTimeout(countDown, 1000);
                    } else {
                        window.history.back();
                    }
                };
            $('#register_form').hide();
            $('#rb_loginLink').hide();
            $('#register_success_box').show();
            setTimeout(countDown, 1000);
        }
        startCountDown();
    });
}(window.requirejs));