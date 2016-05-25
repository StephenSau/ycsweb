(function (requirejs) {
    "use strict";
    requirejs(['jquery', 'handlebars', 'common', 'paginate', 'experts', 'tab'], function ($, Handlebars, common, Paginate, Experts) {
        function Message() {
            this.paginate = null;
            this.init();
        }
        
        Message.TYPE = {
            0: "普通消息",
            10: "系统消息",
            20: "订单通知",
            40: "用户管理"
        };
        
        Message.prototype = {
            currentPage: 1,
            init: function () {
                var expert = new Experts($('#expert_list'));
                this.registerHHelper();
                this.addListener();
                this.packageList();
            },
            
            addListener: function () {
                var that = this,
                    text = $('#ml_checkall_text');
                    
                $('#message_list').on('change', 'input:checkbox', function () {
                    if ($('#message_list input:checkbox').length === $('#message_list input:checkbox:checked').length) {
                        document.getElementById('ml_checkall').checked = true;
                        text.html("取消");
                    } else {
                        document.getElementById('ml_checkall').checked = false;
                        text.html("全选");
                    }
                });
                
                $('#ml_checkall').attr('checked', false).on('change', function () {
                    if (this.checked) {
                        $('#message_list input:checkbox').attr('checked', true);
                        text.html("取消");
                    } else {
                        $('#message_list input:checkbox').attr('checked', false);
                        text.html("全选");
                    }
                });
                
                $('#ml_delBtn').on("click", function () {
                    that.delMessage();
                });
                
                $('#ml_signReadBtn').on('click', function () {
                    that.setRead();
                });

                $('#message_list').on('click', 'span', function () {
                    if (this.getAttribute('data-status') === "0") {
                        that.setRead(this.getAttribute('data-value'));
                    }
                });
            },
            
            delMessage: function () {
                var that = this,
                    params = {
                        ids: ""
                    };
                $('#message_list input:checkbox:checked').each(function (index) {
                    params.ids += this.value + ",";
                });
                if (!params.ids) {
                    return;
                }
                $.ajax({
                    url: common.prefix + "user/delMsgs.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.packageList();
                            common.getMsgDigest();
                        } else {
                            common.errorDialog(data);
                        }
                    },
                    error: function (data) {

                    }

                });
            },
            
            setRead: function (id) {
                var that = this,
                    params = {
                        ids: ""
                    };
                $('#message_list input:checkbox:checked').each(function (index) {
                    params.ids += this.value + ",";
                });
                if (id) {
                    params.ids = id;
                }
                if (!params.ids) {
                    return;
                }
                $.ajax({
                    url: common.prefix + "user/setMsgReaded.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            //that.packageList();
                            that.qryList({
                                readed: 2,
                                pageSize: 10,
                                pageNumber: that.currentPage
                            });
                            common.getMsgDigest();
                        } else {
                            common.errorDialog(data);
                        }
                    },
                    error: function (data) {

                    }

                });
            },
            
            registerHHelper: function () {
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
                
                Handlebars.registerHelper('toText', function (value) {
                    return Message.TYPE[value];
                });
                
                Handlebars.registerHelper('showDate', function (value) {
                    return value.substr(0, 10);
                });
            },
            
            qryList: function (paramsObj) {
                var that = this,
                    key = "",
                    params = {};
                for (key in paramsObj) {
                    params[key] = paramsObj[key];
                }
                delete params.func;
                $.ajax({
                    url: common.prefix + "user/qryMsgListVPage.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.currentPage = data.re.pageNumber;
                            that.writeList(data.re);
                            if (paramsObj.func) {
                                paramsObj.func(that.paginate, params.pageSize, params.pageNumber, data.re.totalPage);
                            }
                        } else {
                            common.errorDialog(data, function () {
                                that.qryList.apply(that, arguments);
                            }, paramsObj);
                        }
                    },
                    error: function (data) {

                    }

                });
            },
            
            writeList: function (data) {
                var html = "",
                    box = $('#message_list'),
                    source = $('#message_list_template').html(),
                    template = Handlebars.compile(source);
                box.empty();
                html = template(data);
                $(html).appendTo(box);
            },
            
            packageList: function (tabVal) {
                var that = this;
                this.paginate = new Paginate({
                    position: "#l_pager",
                    anchorPoint: "header",
                    amount: 10,
                    currentPage: 1,
                    pages: 0,
                    data: {
                        readed: 2,
                        pageSize: 10,
                        pageNumber: 1
                    },
                    invoke: function () {
                        that.qryList.apply(that, arguments);
                    }
                });
            }
        };
        
        var message = new Message();
    });
}(window.requirejs));