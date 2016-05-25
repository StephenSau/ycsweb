(function (requirejs) {
    "use strict";
    requirejs(['jquery', 'json', 'handlebars', 'common', "addrsCtrl", 'formVerified', 'dialog', 'chosen'], function ($, json, Handlebars, common, addrsCtrl, FormVerified, dialog) {
        
        function OrderCommit() {
            this.init();
        }
        
        OrderCommit.SERVICEID = "";
        OrderCommit.SERVICERID = "";
        OrderCommit.SERVICENAME = "";
        OrderCommit.SERVICERNAME = "";
        OrderCommit.SERVICEITEMLIST = "";
        OrderCommit.SERVICEITEMINFOS = "";
        OrderCommit.SELECTEDSERVICESPECS = "";
        OrderCommit.PROVINCE = "";
        OrderCommit.CITY = "";
        OrderCommit.DISTRICT = "";
        OrderCommit.AMOUNT = "";
        OrderCommit.SDCAT1 = "";
        OrderCommit.SDCAT2 = "";
        
        
        
        OrderCommit.prototype = {
            init: function () {
                var that = this,
                    orderVerifition = new FormVerified(document.getElementById('order_commit_form'), function () {
                        that.createOrder();
                    }, true);
                this.saveInLocal();
                this.registerHHelper();
                this.selectAction();
                this.getUserInfo();
                this.packagePage(this.packageData());
            },
            
            saveInLocal: function () {
                if ($.cookie('serviceItemInfos')) {
                    OrderCommit.SERVICEID = $.cookie("serviceid");
                    OrderCommit.SERVICERID = $.cookie("servicerid");
                    OrderCommit.SERVICENAME = $.cookie("servicename");
                    OrderCommit.SERVICERNAME = $.cookie("servicername");
                    OrderCommit.SERVICEITEMLIST = $.cookie('serviceItemList');
                    OrderCommit.SERVICEITEMINFOS = $.cookie('serviceItemInfos');
                    OrderCommit.PROVINCE = $.cookie("province");
                    OrderCommit.CITY = $.cookie("city");
                    OrderCommit.DISTRICT = $.cookie("district");
                    OrderCommit.AMOUNT = $.cookie('amount');
                    OrderCommit.SDCAT1 = $.cookie('mainclass');
                    OrderCommit.SDCAT2 = $.cookie('subclass');
                } else {
                    dialog.show({
                        content: "非法操作",
                        buttons: [{
                            name: "跳回首页",
                            callBack: function () {
                                window.location.href = "/";
                            }
                        }]
                    })
                }
                
            },
            
            registerHHelper: function () {
                Handlebars.registerHelper('addOne', function (value) {
                    return value + 1;
                });
            },
            
            packageData: function () {
                var data = {},
                    items = $.parseJSON(OrderCommit.SERVICEITEMINFOS),
                    lists = $.parseJSON(OrderCommit.SERVICEITEMLIST),
                    i = 0,
                    j = 0,
                    iLength = items.length,
                    jLength = lists.length;
                data.servicename = OrderCommit.SERVICENAME;
                data.provinceName = addrsCtrl.qryName(OrderCommit.PROVINCE);
                data.province = OrderCommit.PROVINCE;
                data.cityName = addrsCtrl.qryName(OrderCommit.CITY);
                data.city = OrderCommit.CITY;
                data.districtName = addrsCtrl.qryName(OrderCommit.DISTRICT);
                data.district = OrderCommit.DISTRICT;
                data.serviceid = OrderCommit.SERVICEID;
                data.servicerid = OrderCommit.SERVICERID;
                data.mainClass = OrderCommit.SDCAT1;
                data.subClass = OrderCommit.SDCAT2;
                data.servicername = OrderCommit.SERVICERNAME;
                for (i = 0; i < iLength; i += 1) {
                    for (j = 0; j < jLength; j += 1) {
                        if (items[i].serviceItemId === lists[j].id) {
                            items[i].selectedOpts = lists[j].options
                        }
                    }
                }
                data.serviceItemList = items;
                return data;
            },
            
            getUserInfo: function () {
                var that = this,
                    params = {};
                $.ajax({
                    url: common.prefix + "user/qryUserInfos.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.fillForm(data.re);
                        } else {
                            common.errorDialog(data);
                        }
                    },
                    error: function (data) {

                    }

                });
            },
            
            packagePage: function (data) {
                var html = "",
                    box = $('#ocb_info'),
                    source = $('#service_info_template').html(),
                    template = Handlebars.compile(source);
                box.empty();
                html = template(data);
                $(html).appendTo(box);
                $('#od_amount').html('￥' + OrderCommit.AMOUNT);
                $.removeCookie('orderCommit');
            },
            
            fillForm: function (data) {
                $('#ocb_contacts').val(data.contacts);
                $('#ocb_contactsmobile').val(data.contactsmobile);
                $('#ocb_contactstel').val(data.contactstel);
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('ocb_province'), selected: data.contactsprovince});
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('ocb_city'), value: data.contactsprovince, selected: data.contactscity, isCity: true});
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('ocb_district'), value: data.contactscity, selected: data.contactsdistrict, isCity: false});
                $('#ocb_contactsaddress').val(data.contactsaddress);
            },
            
            selectAction: function () {
                $('select').chosen();
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('ocb_province'), selected: "440000"});
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('ocb_city'), value: "440000", selected: "440100", isCity: true});
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('ocb_district'), value: "440100", selected: "440106", isCity: false});
                $('#ocb_province').change(function () {
                    addrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('ocb_city'),
                        value: this.value,
                        resetObj: document.getElementById('ocb_district'),
                        isCity: true
                    });
                });
                $('#ocb_city').change(function () {
                    addrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('ocb_district'),
                        value: this.value,
                        isCity: false
                    });
                });

                addrsCtrl.addressSelectAction({selectObj: document.getElementById('ocb_province'), selected: "440000"});
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('ocb_city'), value: "440000", selected: "440100", isCity: true});
                $('#ocb_province').change(function () {
                    addrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('ocb_city'),
                        value: this.value,
                        isCity: true
                    });
                });
            },
            
            createOrder: function () {
                var that = this,
                    items = $.parseJSON(OrderCommit.SERVICEITEMINFOS),
                    lists = $.parseJSON(OrderCommit.SERVICEITEMLIST),
                    i = 0,
                    iLength = items.length,
                    j = 0,
                    jLength = lists.length,
                    params = {
                        contacts: $('#ocb_contacts').val(),
                        contactsmobile: $('#ocb_contactsmobile').val(),
                        contactstel: $('#ocb_contactstel').val(),
                        contactsprovince: $('#ocb_province').val(),
                        contactscity: $('#ocb_city').val(),
                        contactsdistrict: $('#ocb_district').val(),
                        contactsaddress: $('#ocb_contactsaddress').val(),
                        serviceid: OrderCommit.SERVICEID,
                        servicename: OrderCommit.SERVICENAME,
                        province: OrderCommit.PROVINCE,
                        city: OrderCommit.CITY,
                        district: OrderCommit.DISTRICT,
                        servicerid: OrderCommit.SERVICERID,
                        servicername: OrderCommit.SERVICERNAME,
                        comments: $('#ocb_comments').val(),
                        amount: OrderCommit.AMOUNT,
                        sdcat1: OrderCommit.SDCAT1,
                        sdcat2: OrderCommit.SDCAT2,
                        discount: 0,
                        fee: 0,
                        due: OrderCommit.AMOUNT
                    };
                
                for (i = 0; i < iLength; i += 1) {
                    for (j = 0; j < jLength; j += 1) {
                        if (items[i].serviceItemId === lists[j].id) {
                            items[i].selectedOpts = lists[j].options
                        }
                    }
                }

                params.serviceItemInfos = $.toJSON(items)
                
                $.ajax({
                    url: common.prefix + "user/createOrder.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            $.removeCookie('serviceid');
                            $.removeCookie('servicerid');
                            $.removeCookie('servicename');
                            $.removeCookie('servicername');
                            $.removeCookie('serviceItemList');
                            $.removeCookie('serviceItemInfos');
                            $.removeCookie('province');
                            $.removeCookie('city');
                            $.removeCookie('district');
                            $.removeCookie('amount');
                            $.removeCookie('mainclass');
                            $.removeCookie('subclass');
                            window.location.href = "/app/order_list.html?qrytype=0";
                        } else {
                            common.errorDialog(data);
                        }
                    },
                    error: function (data) {

                    }
                });
            }
        };
        
        var orderCommit = new OrderCommit();
    });
}(window.requirejs));