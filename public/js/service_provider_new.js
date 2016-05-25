(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common', 'dialog', 'experts' ], function ($, common, dialog, Experts) {
        
        function ServiceProvider() {
            this.paginate = null;
            this.init();
        }
        ServiceProvider.SERVICEITEMLIST = [];
        
        ServiceProvider.prototype = {
            init: function () {
                var that = this,
                    expert = new Experts($('#expert_list'));
                ServiceProvider.SERVICEITEMLIST = this.qrycondition();
                this.linkAction();
            },

            qrycondition: function () {
                var result = "",
                    condition = [],
                    temp = {},
                    temp2 = {},
                    items = [],
                    i = 0,
                    j = 0,
                    iLength = 0,
                    jLength = 0,
                    value = "",
                    li = null,
                    options = $('#pb_options'),
                    lis = options.children('li');
                lis.each(function (index) {
                    temp = {};
                    li = $(this);
                    temp.id = li.attr('id');
                    items = li.find('li');
                    temp.options = [];
                    items.each(function (index) {
                        temp2 = {};
                        temp2.type = $(this).attr('data-type');
                        temp2.name = $(this).attr('data-name');
                        temp2.content = "";
                        $(this).find('input:checked').each(function (index) {
                            if (temp2.content) {
                                temp2.content += "," + this.value;
                            } else {
                                temp2.content = this.value;
                            }
                        });
                        temp.options.push(temp2);
                    });
                    condition.push(temp);
                });
                return condition;
            },

            linkAction: function () {
                var that = this;
                $('#pb_list').on('click', '.btn', function (event) {
                    var form = document.forms.jumpOrderForm,
                        items = $.parseJSON(this.getAttribute('data-value')),
                        lists = ServiceProvider.SERVICEITEMLIST,
                        i = 0,
                        j = 0,
                        iLength = items.length,
                        jLength = lists.length;
                    form.servicerid.value = this.getAttribute('data-sericerid');
                    form.servicername.value = this.getAttribute('data-name');
                    form.amount.value = this.getAttribute('data-amount');
                    form.due.value = this.getAttribute('data-amount');
                    for (i = 0; i < iLength; i += 1) {
                        for (j = 0; j < jLength; j += 1) {
                            if (items[i].serviceItemId === lists[j].id) {
                                items[i].selectedOpts = lists[j].options
                            }
                        }
                    }
                    form.serviceItemInfos.value = $.toJSON(items);
                    $('#jumpOrderForm').submit();
                });
                $('#pb_queryprice_btn').click(function () {
                    var form = document.forms.qryServiceProviderListForm,
                        items = that.qrycondition(),
                        lists = $.parseJSON(form.chooseoptions.value),
                        i = 0,
                        j = 0,
                        k = 0,
                        l = 0,
                        iLength = lists.chooseoptions.length,
                        jLength = items.length,
                        kLength = 0,
                        lLength = 0;

                    form.qryConditions.value = $.toJSON({qrycondition: that.qrycondition()});
                    for (i = 0; i < iLength; i += 1) {
                        for (j = 0; j < jLength; j += 1){
                            if (lists.chooseoptions[i].id === items[j].id) {
                                for (k = 0, kLength = lists.chooseoptions[i].options.length; k < kLength; k += 1) {
                                    for (l = 0, lLength = items[j].options.length; l <lLength; l += 1){
                                        if (lists.chooseoptions[i].options[k].name === items[j].options[l].name) {
                                            lists.chooseoptions[i].options[k].content = items[j].options[l].content;
                                        }
                                    }
                                }
                            }
                        }
                        
                    }
                    form.chooseoptions.value = $.toJSON(lists);
                    $(form).submit();
                });
            }

        };
        
        var serviceProvider = new ServiceProvider();
    });
}(window.requirejs));