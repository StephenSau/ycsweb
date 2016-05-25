(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common'], function ($, common) {
    	function HelpSearch() {
    		this.init();
    	}

    	HelpSearch.prototype = {
    		init: function () {
    			var form = document.getElementById('searchForm');
    			$(form).submit(function (event) {
    				event.preventDefault();
    				window.location.href = '/help/so/' + encodeURIComponent(form.querycondition.value);
    			});
    		}
    	};

    	var helpSearch = new HelpSearch();
    });
}(window.requirejs));