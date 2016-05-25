(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common'], function ($, common) {
    	function HelpList() {
    		this.init();
    	}

    	HelpList.prototype = {
    		init: function () {
    			var form = document.getElementById('searchForm');
    			$(form).submit(function (event) {
    				event.preventDefault();
    				window.location.href = '/help/so/' + encodeURIComponent(form.querycondition.value);
    			});
    		}
    	};

    	var helpList = new HelpList();
    });
}(window.requirejs));