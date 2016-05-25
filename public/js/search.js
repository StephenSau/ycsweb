(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common', 'dialog', 'share'], function ($, common, dialog) {
        function Search() {
            this.init();
        }
        
        Search.prototype = {
            init: function () {
                var that = this;
                this.showMore();
                this.getHistory();
            },
            
            showMore: function () {
                var content = $('#ob_conent'),
                    showMoreLine = $('#ob_showmoreline'),
                    changeStatus = function () {
                        var btn = $(this);
                        if (!btn.data('status') || btn.data('status') === "hide") {
                            content.css({
                                height: 'auto',
                                overflow: 'auto'
                            });
                            btn.text("收起详情").data('status', 'show');
                        } else if (btn.data('status') === "show") {
                            content.css({
                                height: '226px',
                                overflow: 'hidden'
                            });
                            btn.text("查看更多").data('status', 'hide');
                        }
                    };
                if (content.height() > 226) {
                    showMoreLine.show();
                    content.css({
                        height: '226px',
                        overflow: 'hidden'
                    });
                    $('#ob_showmore').unbind('click', changeStatus).bind('click', changeStatus);
                } else {
                    content.removeAttr('style');
                    showMoreLine.hide();
                }
            },
            
            getHistory: function () {
                var history = $.cookie('searchhistory'),
                    items = [];
                if (history) {
                    items = history.split('|');
                }
                this.packageHistory(items);
            },
            
            saveHistory: function (items) {
                var querycondition = $('#headerSearch').val(),
                    i = 0,
                    length = items.length;
                if (length) {
                    for (i = 0; i < length; i += 1) {
                        if (items[i] === querycondition) {
                            items.splice(i, 1);
                            break;
                        }
                    }
                    if (querycondition) {
                        for (i = items.length; i >= 1; i -= 1) {
                            items[i] = items[i - 1];
                        }
                        items[0] = querycondition;
                    }
                    if (items.length > 10) {
                        items = items.slice(0, 10);
                    }
                    $.cookie('searchhistory', items.join('|'), {expires: 7});
                } else {
                    if (querycondition) {
                        $.cookie('searchhistory', querycondition, {expires: 7});
                    }
                    
                }
            },
            
            packageHistory: function (items) {
                var box = $('#search_history'),
                    list = $('#sh_list'),
                    i = 0,
                    html = [],
                    length = items.length;
                if (length) {
                    list.empty();
                    for (i = 0; i < length; i += 1) {
                        if (items[i]) {
                            html.push('<a href="/so/' + encodeURIComponent(items[i]) + '">' + items[i] + '</a>');
                        }
                        
                    }
                    list.append(html.join(''));
                    box.show();
                } else {
                    box.hide();
                }
                this.saveHistory(items);
            }
        };
        
        var search = new Search();
    });
}(window.requirejs));