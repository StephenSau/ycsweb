(function (requirejs) {
    "use strict";
    requirejs(['jquery', 'handlebars', 'common', 'paginate', 'experts','info', 'tab',  'chosen'], function ($, Handlebars, common, Paginate, Experts, info) {
        function OrderList() {
            this.orderListPaginate = null;
            this.init();
        }
        
        OrderList.CURRENTTAB = -1;
        
        OrderList.prototype = {
            init: function () {
                var that = this,
                    currentTab = null,
                    expert = new Experts($('#expert_list'));
                this.registerHHelper();
                if (common.getParams('qrytype')) {
                    OrderList.CURRENTTAB = parseInt(common.getParams('qrytype'), 10);
                    $('#ol_tab li').each(function (index) {
                        if (this.getAttribute('data-value') * 1 === OrderList.CURRENTTAB) {
                            currentTab = $(this);
                        }
                    });
                }
                $('#ol_tab').on('click', 'li', function () {
                    that.packageOrderList(this.getAttribute('data-value') * 1);
                }).tab({
                    active: currentTab
                });
                this.packageOrderList(OrderList.CURRENTTAB);
                this.regiterButtonAction();
            },
            
            regiterButtonAction: function () {
                var that = this;
                $('#ol_list').on('click', '[data-role="delBtn"]', function () {
                    that.setOrderStatus(1, this.getAttribute('data-value'));
                }).on('click', '[data-role="confirmBtn"]', function () {
                    that.showMessageBox({
                        'orderno': this.getAttribute('data-value')
                    }, 'confirm');
                }).on('click', '[data-role="breakOffBtn"]', function () {
                    that.showMessageBox({
                        'orderno': this.getAttribute('data-value')
                    }, 'breakOff');
                }).on('click', '[data-role="cancelBtn"]', function () {
                    that.showMessageBox({
                        'orderno': this.getAttribute('data-value')
                    }, 'cancel');
                });
            },
            
            showMessageBox: function (data, type) {
                var that = this,
                    html = "",
                    source = "",
                    template = null;
                if (type === "confirm") {
                    source = $('#confirm_over_template').html();
                } else if (type === "breakOff") {
                    source = $('#break_off_template').html();
                } else if (type === "cancel") {
                    source = $('#cancel_template').html();
                }
                template = Handlebars.compile(source);
                html = template(data);
                info.show({
                    content: html
                });
                if (type === "cancel") {
                    $('#cancel_reason').chosen();
                }
                $('#message_box').on('click', 'a', function () {
                    if (this.id === "mb_confirmBtn") {
                        that.setOrderStatus(2, this.getAttribute('data-value') );
                    } else if (this.id === "mb_cancelBtn") {
                        info.close();
                    } else if (this.id === "mb_breakOffBtn") {
                        
                    } else if (this.id === "mb_submitBtn") {
                        that.setOrderStatus(0, this.getAttribute('data-value') );
                    }
                });
                
            },
            
            setOrderStatus: function (op, orderno) {
                var that = this,
                    params = {
                        op: op,
                        orderno: orderno
                    };
                if (op === 0) {
                    if (!document.getElementById('cancel_reason').value) {
                        return;
                    }
                    params.desc = document.getElementById('cancel_reason').value;
                }
                $.ajax({
                    url: common.prefix + "user/setOrderStatus.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            if (op !== 1) {
                                info.close();
                            }
                            that.packageOrderList(OrderList.CURRENTTAB);
                        } else {
                            common.errorDialog(data);
                        }
                    },
                    error: function (data) {

                    }
                });
            },
            
            registerHHelper: function () {
                Handlebars.registerHelper('toText', function (value, options) {
                    switch (value) {
                        case 0:
                            return "待确认";
                        case 5:
                            return "待付款";
                        case 10:
                            return "已付款";
                        case 11:
                            return "已付款-金额有误";
                        case 15:
                            return "已收款";
                        case 20:
                            return "服务中";
                        case 30:
                            return "已完成";
                        case 40:
                            return "申请中止";
                        case 42:
                            return "已取消";
                        case 44:
                            return "已中止";
                        case 46:
                            return "已删除";
                        case 48:
                            return "已作废";
                    }
                });
                
                Handlebars.registerHelper('compare', function (left, operator, right, options) {
                    if (arguments.length < 3) {
                        throw new Error('Handlerbars Helper "compare" needs 2 parameters');
                    }
                    var operators = {
                        '==': function (l, r) {
                            return l == r;
                        },
                        '===': function (l, r) {
                            return l === r;
                        },
                        '!=': function (l, r) {
                            return l != r;
                        },
                        '!==': function (l, r) {
                            return l !== r;
                        },
                        '<': function (l, r) {
                            return l < r;
                        },
                        '>': function (l, r) {
                            return l > r;
                        },
                        '<=': function (l, r) {
                            return l <= r;
                        },
                        '>=': function (l, r) {
                            return l >= r;
                        },
                        'typeof': function (l, r) {
                            return typeof l == r;
                        }
                    };

                    if (!operators[operator]) {
                        throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
                    }

                    var result = operators[operator](left, right);

                    if (result) {
                        return options.fn(this);
                    } else {
                        return options.inverse(this);
                    }
                });
            },
            
            qryOrderList: function (paramsObj) {
                var that = this,
                    key = "",
                    params = {};
                for (key in paramsObj) {
                    params[key] = paramsObj[key];
                }
                delete params.func;
                $.ajax({
                    url: common.prefix + "user/orderListVPage.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.writeTable(data.re);
                            paramsObj.func(that.orderListPaginate, params.pageSize, params.pageNumber, data.re.totalPage);
                        } else {
                            common.errorDialog(data, function () {
                                that.qryOrderList.apply(that, arguments);
                            }, paramsObj);
                        }
                    },
                    error: function (data) {

                    }

                });
            },
            
            writeTable: function (data) {
                var html = "",
                    box = $('#ol_list'),
                    nodata = $('#ol_nodata_line'),
                    table = $('#ol_table'),
                    source = $('#order_list_template').html(),
                    template = Handlebars.compile(source);
                box.empty();
                if (data.totalRow) {
                    table.show();
                    nodata.hide();
                    html = template(data);
                    $(html).appendTo(box);
                } else {
                    table.hide();
                    nodata.show();
                }
                
            },
            
            packageOrderList: function (tabVal) {
                var that = this;
                OrderList.CURRENTTAB = tabVal * 1;
                this.orderListPaginate = new Paginate({
                    position: "#ol_pager",
                    anchorPoint: "header",
                    amount: 20,
                    currentPage: 1,
                    pages: 20,
                    data: {
                        qrytype: tabVal,
                        pageSize: 20,
                        pageNumber: 1
                    },
                    invoke: function () {
                        that.qryOrderList.apply(that, arguments);
                    }
                });
            }
        };
        
        var orderList = new OrderList();
    });
}(window.requirejs));