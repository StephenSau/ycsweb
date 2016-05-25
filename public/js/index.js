(function (requirejs) {
    'use strict'; 
    requirejs(['jquery', "sersAddrsCtrl", 'serviceCtrl', 'common', 'formVerified', 'experts', 'dialog', 'carousel', "chosen"], function ($, sersAddrsCtrl, serviceCtrl, common, FormVerified, Experts, dialog) {
        function Index() {
            this.init();
        }

        Index.prototype = {
            init: function () {
                var that = this,
                    searchVerifition = new FormVerified(document.getElementById('serviceSearchForm')),
                    orderVerifition = new FormVerified(document.getElementById('orderForm'), function () {
                        that.submitOrderService();
                    }),
                    expert = new Experts($('#expert_list'), {
                        effective: ['10004', '10006', '10003']
                    });
                $('select').chosen();
                $('#carouselBox').carousel();
                this.selectAction();
            },
            
            submitOrderService: function () {
                var that = this,
                    form = document.forms.orderForm,
                    params = {
                        pcode: form.pcode.value,
                        ccode: form.ccode.value,
                        province: form.province.value,
                        city: form.city.value,
                        comments: form.comments.value,
                        title: form.title.value,
                        tel: form.tel.value
                    };
                $.ajax({
                    url: common.prefix + "service/orderServiceGoods.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            $(form).find('.valid').removeClass('valid');
                            dialog.show({
                                content: "提交成功"
                            });
                        }
                    },
                    error: function (data) {

                    }

                });
            },

            selectAction: function () {
                var mainclass = document.getElementById('ssb_mainclass'),
                    mainclassVal = "",
                    subclass = document.getElementById('ssb_subclass'),
                    subclassVal = "",
                    serviceid = document.getElementById('ssb_service'),
                    serviceidVal = "";
                common.getAreaById(function (data) {
                    sersAddrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('ssb_province'),
                        selected: data.province.toString()
                    });
                    sersAddrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('ssb_city'),
                        value: data.province.toString(),
                        selected: data.city.toString(),
                        isCity: true
                    });
                    sersAddrsCtrl.addressSelectAction({
                         selectObj: document.getElementById('ssb_district'),
                         value: data.city.toString(),
                         selected: data.area.toString(),
                         isCity: false
                     });
                    sersAddrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('osb_province'),
                        selected: data.province.toString()
                    });
                    sersAddrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('osb_city'),
                        value: data.province.toString(),
                        selected: data.city.toString(),
                        isCity: true
                    });
                });
                
                serviceCtrl.serviceSelectAction({
                    selectObj: mainclass
                });
                
                mainclassVal = mainclass.options[1].value;
                if (mainclassVal) {
                    $(mainclass)
                        .val(mainclassVal)
                        .trigger('chosen:update');
                    serviceCtrl.serviceSelectAction({
                        selectObj: subclass,
                        value: mainclassVal,
                        isService: false
                    });
                    subclassVal = subclass.options[1].value;
                    if (subclassVal) {
                        $(subclass)
                            .val(subclassVal)
                            .trigger('chosen:update');
                        serviceCtrl.serviceSelectAction({
                            selectObj: serviceid,
                            value: subclassVal,
                            isService: true
                        });
                        serviceidVal = serviceid.options[1].value;
                        if (serviceidVal) {
                            $(serviceid)
                                .val(serviceidVal)
                                .trigger('chosen:update');
                        }
                    }
                }
                
                mainclass = document.getElementById('osb_mainclass');
                subclass = document.getElementById('osb_subclass');
                
                serviceCtrl.serviceSelectAction({
                    selectObj: mainclass
                });
                mainclassVal = mainclass.options[1].value;
                $(mainclass)
                    .val(mainclassVal)
                    .trigger('chosen:update');
                
                serviceCtrl.serviceSelectAction({
                    selectObj: subclass,
                    value: mainclassVal,
                    isService: false
                });
                
                subclassVal = subclass.options[1].value;
                $(subclass)
                    .val(subclassVal)
                    .trigger('chosen:update');
                
                
                
                
                
                $('#ssb_mainclass').change(function () {
                    serviceCtrl.serviceSelectAction({
                        selectObj: document.getElementById('ssb_subclass'),
                        value: this.value,
                        resetObj: document.getElementById('ssb_service'),
                        isService: false
                    });
                });
                
                $('#ssb_subclass').change(function () {
                    serviceCtrl.serviceSelectAction({
                        selectObj: document.getElementById('ssb_service'),
                        value: this.value,
                        isService: true
                    });
                });
                
                
                $('#osb_mainclass').change(function () {
                    serviceCtrl.serviceSelectAction({
                        selectObj: document.getElementById('osb_subclass'),
                        value: this.value,
                        isService: false
                    });
                });
                
                
                $('#ssb_province').change(function () {
                    sersAddrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('ssb_city'),
                        value: this.value,
                        resetObj: document.getElementById('ssb_district'),
                        isCity: true
                    });
                });
                
                $('#ssb_city').change(function () {
                    sersAddrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('ssb_district'),
                        value: this.value,
                        isCity: false
                    });
                });

                $('#osb_province').change(function () {
                    sersAddrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('osb_city'),
                        value: this.value,
                        isCity: true
                    });
                });
            }
        };
        
        var index = new Index();
    });
    
}(window.requirejs));