(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common'], function ($, common) {
    	function Help() {
    		this.init();
    	}

    	Help.prototype = {
    		init: function () {
    			var form = document.getElementById('searchForm');
    			$(form).submit(function (event) {
    				event.preventDefault();
    				window.location.href = '/help/so/' + encodeURIComponent(form.querycondition.value);
    			});
    		}
    	};

    	var help = new Help();
    });
}(window.requirejs));