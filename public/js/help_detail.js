(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common', 'dialog'], function ($, common, dialog) {
    	function HelpDetail () {
    		this.init();
    	}

    	HelpDetail.prototype = {
    		init: function () {
    			var that = this;
    			$('#feedback_useful').click(function () {
    				that.submitAdvice('useful', this.getAttribute('data-value'));
    			});
    			$('#feedback_useless').click(function () {
    				that.submitAdvice('useless', this.getAttribute('data-value'));
    			});
                var form = document.getElementById('searchForm');
                $(form).submit(function (event) {
                    event.preventDefault();
                    window.location.href = '/help/so/' + encodeURIComponent(form.querycondition.value);
                });
    		},
    		submitAdvice: function (status, id) {
    			var that = this,
                    params = {
                    	helpId: id,
                    	useful: status === "useful" ? 1 : 0,
                    	useless: status === "useless" ? 1 : 0
                    };
                $.ajax({
                    url: common.prefix + "help/handleUseful.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            dialog.show({
                            	content: "提交成功"
                            });
                        } else {
                            common.errorDialog(data);
                        }
                    },
                    error: function (data) {

                    }

                });
    		}
    	};
    	var helpDetail = new HelpDetail();
    });
}(window.requirejs));