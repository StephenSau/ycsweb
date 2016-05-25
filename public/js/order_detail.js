(function (requirejs) {
    "use strict";
    requirejs(['jquery', 'handlebars', 'common', 'tab', 'info', 'dialog', 'chosen', 'placeholder'], function ($, Handlebars, common, tab, info, dialog) {
        function OrderDetail() {
            this.hadDimCode = false;
            this.init();
        }
        OrderDetail.COUNT = 0;
        OrderDetail.TIMEFLAG = null;
        OrderDetail.ORDERNO = "";
        OrderDetail.DUE = 0;
        
        OrderDetail.STATUSTXT = {
            0: "待确认",
            5: "待付款",
            10: "已付款",
            11: "已付款-金额有误",
            15: "已收款",
            20: "服务中",
            30: "已完成",
            40: "申请中止",
            42: "已取消",
            44: "已中止",
            46: "已删除",
            48: "已作废"
        };
        
        OrderDetail.PAYTYPE = {
            0: "支付宝支付",
            1: "网上银行",
            2: "线下付款",
            3: "微信支付"
        };
        
        OrderDetail.prototype = {
            telphoneReg: /(^1(3[0-9]|4[0-9]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$)|(^(\d{0,4}\-)?\d{8}$)/,
            init: function () {
                OrderDetail.ORDERNO = common.getParams('orderno');
                
                Handlebars.registerHelper('formatIndex', function (value) {
                    return value >= 9 ? (value + 1) : ("0" + (value + 1));
                });
                
                Handlebars.registerHelper('addOne', function (value) {
                    return value + 1;
                });
                
                Handlebars.registerHelper('toText', function (value) {
                    return OrderDetail.PAYTYPE[value];
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
                
                this.getOrderInfo();
                //this.showMessageBox('wxpay');
            },
            
            getOrderInfo: function () {
                var that = this,
                    params = {
                        orderno: OrderDetail.ORDERNO
                    };
                $.ajax({
                    url: common.prefix + "user/orderDetail.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            if (OrderDetail.ORDERNO === data.re.order.orderno) {
                                that.packagePage(data.re);
                            }
                        } else {
                            common.errorDialog(data, function () {
                                that.getOrderInfo.apply(that, arguments);
                            });
                        }
                    },
                    error: function (data) {

                    }
                });
            },
            
            packagePage: function (data) {
                this.changeProgressBar(data.order);
                this.fillOverView(data.order);
                this.changeBtnLine(data.order.status);
                this.packageServiceBox(data.order.status, data);
                this.fillRemark(data.order.status, data.servicer);
                this.packageInfos(data);
                this.fillPayInfos(data);
            },
            
            changeProgressBar: function (data) {
                var bar = document.getElementById('order_progressbar');
                if (data.created) {
                    $('#op_step_01 i').text(data.created);
                }
                if (data.confirmed) {
                    $('#op_step_02 i').text(data.confirmed);
                }
                if (data.paid) {
                    $('#op_step_03 i').text(data.paid);
                }
                
                if (data.started) {
                    $('#op_step_04 i').text(data.started);
                }
                
                if (data.finished && data.status === 30) {
                    $('#op_step_05 i').text(data.finished);
                }
                
                
                switch (data.status) {
                    case 0:
                        bar.className = "order_progressbar op_unconfirm";
                        break;
                    case 5:
                        bar.className = "order_progressbar op_unpay";
                        break;
                    case 10:
                        bar.className = "order_progressbar op_payed_unconfirm";
                        break;
                    case 15:
                        bar.className = "order_progressbar op_payed_confirmed";
                        break;
                    case 20:
                        bar.className = "order_progressbar op_servering";
                        break;
                    case 30:
                        bar.className = "order_progressbar op_finished";
                        break;
                    case 42:
                        bar.className = "order_progressbar op_cancel";
                        break;
                    case 7:
                        $('#op_step_05 em').text("服务中止");
                        bar.className = "order_progressbar op_breakoff";
                        break;
                }
            },
            
            fillOverView: function (data) {
                var status = $('#oso_status');
                $('#oso_number').text(OrderDetail.ORDERNO);
                status.text(OrderDetail.STATUSTXT[data.status]);
                
                if (data.status === 30) {
                    status.addClass('os_done');
                } else if (data.status === 72 || data.status === 44) {
                    status.addClass('os_warning');
                }
            },
            
            changeBtnLine: function (status, isClear) {
                var that = this,
                    btnline = $('#os_btnLine');
                if (isClear) {
                    btnline.empty();
                    return;
                }
                
                btnline.empty().show();
                
                if (status === 0 || status === 5) {
                    $('<a href="javascript:;">取消订单</a>').on('click', function () {
                        that.showMessageBox('cancel');
                    }).appendTo(btnline);
                }
                
                if (status === 20) {
                    $('<a href="javascript:;" class="btn btn_warning">确认完成</a>').on('click', function () {
                        that.showMessageBox('confirm');
                    }).appendTo(btnline);
                }
                
                if (status === 10 || status === 15 || status === 20) {
                    $('<a href="javascript:;">申请中止</a>').on('click', function () {
                        that.showMessageBox('breakOff');
                    }).appendTo(btnline);
                }
                
                if (status === 30) {
                    $('<a href="javascript:;" onclick="document.getElementById(\'qqTalk_header_btn_01\').click()">申请售后</a>').appendTo(btnline);
                }
                
                if (status >= 40) {
                    btnline.empty().hide();
                }
            },
            
            packageServiceBox: function (status, data) {
                var box = $('#order_service'),
                    html = "",
                    source = "",
                    template = null;
                box.empty();
                if (status < 20) {
                    box.hide();
                } else if (status === 20 || status === 30 || status === 44) {
                    box.show();
                    source = $('#service_item_template').html();
                    template = Handlebars.compile(source);
                    html = template(data);
                    $(html).appendTo(box);
                }
            },
            
            fillRemark: function (status, servicer) {
                var that = this,
                    remark = $('#os_remark');
                remark.css({
                    display: 'table-cell'
                });
                if (navigator.userAgent.indexOf('IE 7.0') !== -1) {
                    remark.css({
                        display: 'block'
                    });
                }
                
                if (status === 0) {
                    remark.html('<span>您的订单已经提交成功，服务商将在20分钟内与您联系确认订单！</span>');
                } else if (status === 5) {
                    remark.html('您的订单已确认，请尽快付款，如有疑问，请点此 <a href="#">联系服务商</a>');
                    
                } else if (status === 10) {
                    remark.html('服务商需要1个工作日确认收款，收款后将马上为您提供服务，请耐心等待！如有疑问，请点此 <a href="javascript:;">联系服务商</a>');
                } else if (status === 15) {
                    remark.html('服务商已确认收款，将马上为您提供服务，请耐心等待！如有疑问，请点此 <a href="javascript:;">联系服务商</a>');
                } else {
                    remark.empty();
                    remark.removeAttr('style');
                }
                
                remark.on('click', 'a', function () {
                    that.showMessageBox('phone', servicer.tel);
                });
            },
            
            packageInfos: function (data) {
                var box = $('#od_info'),
                    source = $('#info_template').html(),
                    template = Handlebars.compile(source),
                    html = template(data);
                box.empty();
                $(html).appendTo(box);
            },

            getWxCode: function () {
                var that = this,
                    params = {
                        listOrdernos: OrderDetail.ORDERNO,
                        amount: OrderDetail.DUE,
                        payChannel: "WX_NATIVEAPI"
                    };
                $.ajax({
                    url: common.prefix + "pay/req.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.hadDimCode = true;
                            dialog.close();
                            $('#owx_code_photo').attr('src', data.re.imgUrl);
                            $('#order_weboff').hide();
                            $('#order_wx').show();
                            $('#os_btnLine').hide();
                            $('#os_remark').hide();
                            $('#order_detail').hide();
                            
                        }
                    },
                    error: function (data) {

                    }
                });
            },

            checkPayStatus: function (type) {
                var that = this,
                    interval = 10 * 1000,
                    max = 10 * 60 * 1000;
                clearTimeout(OrderDetail.TIMEFLAG);
                function checkStatus() {
                    OrderDetail.COUNT += interval
                    if (OrderDetail.COUNT <= max){
                        OrderDetail.TIMEFLAG = setTimeout(function () {
                            $.ajax({
                                url: common.prefix + "user/getPayStatus.htm",
                                data: {
                                    orderno: OrderDetail.ORDERNO
                                },
                                dataType: "json",
                                type: "POST",
                                xhrFields: {
                                    withCredentials: true
                                },
                                success: function (data) {
                                    if (data.status === "200") {
                                        if (data.re.haveBeenPaid) {
                                            that.showMessageBox('wxpay');
                                        } else {
                                            checkStatus();
                                        } 
                                    }
                                },
                                error: function (data) {

                                }
                            });
                        }, interval);
                    } else {
                        dialog.show({
                            content: "页面超时，请重新支付",
                            buttons: [{
                                name: "重新支付",
                                callBack: function () {
                                    window.location.reload();
                                    dialog.close();
                                }
                            }]
                        });
                    }
                }
                checkStatus();
            },
            
            fillPayInfos: function (data) {
                var that = this,
                    status = data.order.status;
                OrderDetail.DUE = data.order.due;
                if (OrderDetail.DUE*1 === 0){
                    $('#od_paytype').hide();
                    return;
                }
                if (status === 5) {
                    $('#od_bank_amount').text('￥' + OrderDetail.DUE);
                    $('#order_weboff_amount').text('￥' + OrderDetail.DUE);
                    $('#od_alipay_amount').text('￥' + OrderDetail.DUE);
                    $('#order_weboff_remark').text('订单号 ' + OrderDetail.ORDERNO);
                    $('#od_wxpay_amount').text('￥' + OrderDetail.DUE);
                    $('#order_wx_amount').text('￥' + OrderDetail.DUE);
                    $('#od_paytype').show();
                    $('#order_payline').show();
                    $('#od_paytype_tab').tab();
                    $('.od_bank_confirm').on('click', function () {
                        $('#order_weboff').show();
                        $('#order_wx').hide();
                        $('#os_btnLine').hide();
                        $('#os_remark').hide();
                        $('#order_detail').hide();
                    });

                    $('.od_wxpay_confirm').on('click', function () {
                        if (that.hadDimCode) {
                            $('#order_weboff').hide();
                            $('#order_wx').show();
                            $('#os_btnLine').hide();
                            $('#os_remark').hide();
                            $('#order_detail').hide();
                        } else {
                            dialog.show({
                                content: "正在生成二维码,请稍等"
                            });
                            that.getWxCode();
                        }
                        
                        that.checkPayStatus();
                    });

                    $('.od_alipay_confirm').on('click', function () {
                        that.showMessageBox('alipay');
                    }).attr('href', "/pay/payMoneyByZhiFuBao.htm?outTradeNo=" + OrderDetail.ORDERNO + "&totalFee=" + OrderDetail.DUE);
                } else if (data.order.paid !== "") {
                    $('#od_paid_amount').text('￥' + OrderDetail.DUE);
                    $('#order_payline').show();
                    $('#opl_payedLine').show();
                }  
            },
            
            showMessageBox: function (type, masterCallPhoneNo) {
                var that = this,
                    html = "",
                    source = "",
                    phoneText = null,
                    template = null;
                if (type === "confirm") {
                    source = $('#confirm_over_template').html();
                } else if (type === "breakOff") {
                    source = $('#break_off_template').html();
                } else if (type === "cancel") {
                    source = $('#cancel_template').html();
                } else if (type === "phone") {
                    source = $('#dial_template').html();
                } else if (type === "alipay") {
                    source = $('#confirm_alipay_template').html();
                } else if (type === "wxpay") {
                    source = $('#confirm_wxpay_template').html();
                }
                template = Handlebars.compile(source);
                html = template();
                info.show({
                    content: html
                });
                
                if (type === "phone") {
                    phoneText = $('#dial_phone');
                
                    phoneText.placeholder().on('keyup', function () {
                        var code = event.keyCode;
                        if (!that.telphoneReg.test(this.value)) {
                            phoneText.addClass('invalid');
                            phoneText.removeClass('valid');
                        } else {
                            phoneText.addClass('valid');
                            phoneText.removeClass('invalid');
                            if (code === 13) {
                                info.close();
                                that.dialPhone(masterCallPhoneNo, this.value);
                            }
                        }
                    });

                    $('#dial_btn').on('click', function () {
                        if (!that.telphoneReg.test(phoneText.val())) {
                            phoneText.addClass('invalid');
                        } else {
                            info.close();
                            that.dialPhone(masterCallPhoneNo, phoneText.val());
                        }
                    });
                }
                
                if (type === "cancel") {
                    $('#cancel_reason').chosen();
                }
                $('#message_box').on('click', 'a', function () {
                    if (this.id === "mb_confirmBtn") {
                        that.setOrderStatus(2);
                    } else if (this.id === "mb_cancelBtn") {
                        info.close();
                    } else if (this.id === "mb_breakOffBtn") {
                        
                    } else if (this.id === "mb_submitBtn") {
                        that.setOrderStatus(0);
                    } else if (this.id === "mb_confirmPayBtn") {
                        window.location.href = "/app/order_list.html?qrytype=10";
                    }
                });
            },
            
            dialPhone: function (masterCallPhoneNo, slaveCallPhoneNo) {
                var that = this,
                    params = {
                        masterCallPhoneNo: slaveCallPhoneNo,
                        slaveCallPhoneNo: "4008-310-866"
                    };
                $.ajax({
                    url: common.prefix + "common/requestBinCall4Specialist.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.callParams = data.re;
                            that.showOnCallBox();
                            that.queryCallStatus();
                        } else {
                            common.errorDialog(data);
                        }
                    },
                    error: function (data) {

                    }
                });
            },
            
            queryCallStatus: function () {
                var that = this,
                    poll = function () {
                        $.ajax({
                            url: common.prefix + "common/qryBinCallStatus.htm",
                            data: that.callParams,
                            dataType: "json",
                            type: "POST",
                            xhrFields: {
                                withCredentials: true
                            },
                            success: function (data) {
                                if (data.status === "200") {
                                    if (data.re.isCallFinish === "0") {
                                        setTimeout(poll, 5000);
                                    } else {
                                        info.close();
                                    }
                                } else {
                                    info.close();
                                }
                            },
                            error: function (data) {

                            }

                        });
                    };
                poll();
                
            },
            
            showOnCallBox: function () {
                var html = [];
                html.push('<p class="onCall_box">');
                html.push('<i class="icon"></i> ');
                html.push('电话接通中……');
                html.push('</p>');
                info.show({
                    content: html.join('')
                });
            },
            
            setOrderStatus: function (op) {
                var that = this,
                    params = {
                        op: op,
                        orderno: OrderDetail.ORDERNO
                    };
                if (op === 0) {
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
                            
                            if (op === 0) {
                                window.location.href = "/app/order_list.html?qrytype=42";
                            }
                            
                            if (op === 2) {
                               window.location.href = "/app/order_list.html?qrytype=30";
                            }
                        } else {
                            common.errorDialog(data);
                        }
                    },
                    error: function (data) {
                    }
                });
            }
        };
        
        var orderDetail = new OrderDetail();
    });
}(window.requirejs));