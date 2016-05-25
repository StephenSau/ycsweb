(function ($) {
    'use strict';
    
    function Tab(element, options) {
        this.$element = $(element);
        this.tabs = $(element).find('[data-role="item"]');
        this.tabContents = this.findBox();
        this.options = $.extend({}, Tab.DEFAULTS, options);
        this.init();
    }
    
    Tab.DEFAULTS = {
        ant: false
    };
    
    Tab.prototype = {
        init: function () {
            var that = this;
            this.changeTab(this.options.active || this.tabs.eq(0));
            this.$element.on('click', '[data-role]',  function () {
                that.changeTab($(this));
            });
        },
        
        findBox: function () {
            var boxs = [],
                targets = "",
                taraget = "",
                i = 0,
                length = 0;
            this.tabs.each(function (index) {
                
                targets = $.trim(this.getAttribute('data-target')).split(/\s+/);
                for (i = 0, length = targets.length; i < length; i += 1) {
                    taraget = targets[i];
                    if (document.getElementById(taraget)) {
                        boxs.push($('#' + taraget));
                    }
                }
                
            });
            return boxs;
        },
        
        changeTab: function ($active) {
            var i = 0,
                length = this.tabContents.length,
                item = null,
                $prevContent = null,
                $activeContent = null,
                target = $active.attr('data-target');
            this.tabs.removeClass('active');
            if (this.options.prev) {
                this.tabs.removeClass('prev');
                $active.prev().addClass('prev');
            }
            $active.addClass('active');
            if (this.options.callback) {
                this.options.callback($active);
                return;
            }
            if (length) {
                if (this.options.ant) {
                    for (i = 0; i < length; i += 1) {
                        item = this.tabContents[i];
                        if (target.indexOf(item.attr('id')) !== -1) {
                            $activeContent = item;
                        } else if (item.hasClass('active')) {
                            $prevContent = item;
                        }
                    }
                    
                    if ($prevContent) {
                        $prevContent.fadeOut(400, function () {
                            $prevContent
                                .removeClass('active')
                                .removeAttr('style');
                            $activeContent.addClass('active');
                        });
                    } else {
                        $activeContent.addClass('active');
                    }
                } else {
                    for (i = 0; i < length; i +=1) {
                        item = this.tabContents[i];
                        if (target.indexOf(item.attr('id')) !== -1) {
                            item.addClass('active');
                        } else {
                            item.removeClass('active');
                        }
                    }
                }
                
            }
        }
    };
    
    
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bs.tab'),
                options = typeof option === "object" && option;
            
            if (!data) {
                $this.data('bs.tab', (data = new Tab(this, options)));
            }
            
            if (typeof option === 'string') {
                data[option]();
            }
        });
    }
    
    
    var old = $.fn.tab;
    
    $.fn.tab = Plugin;
    $.fn.tab.Constructor = Tab;
    
    
    $.fn.tab.noConflict = function () {
        $.fn.tab = old;
        return this;
    };
    
    $(window).on('load', function () {
        $('[data-spy="tab"]').each(function () {
            var $spy = $(this),
                data = $spy.data();
            Plugin.call($spy, data);
        });
    });
}(window.jQuery));