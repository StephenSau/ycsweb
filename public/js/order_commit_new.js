(function (requirejs) {
    "use strict";
    requirejs(['jquery', 'common', "addrsCtrl", 'formVerified', 'dialog', 'chosen'], function ($, common, addrsCtrl, FormVerified, dialog) {
        
        function OrderCommit() {
            this.init();
        }
        
        OrderCommit.prototype = {
            init: function () {
                var that = this,
                    orderVerifition = new FormVerified(document.getElementById('order_commit_form'), undefined, true);
                this.selectAction();
            },
            
            selectAction: function () {
                $('select').chosen();
                var province = $('#contactsprovince').val(),
                    city = $('#contactscity').val(),
                    district = $('#contactsdistrict').val();
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
                if (province && city && district) {
                    addrsCtrl.addressSelectAction({selectObj: document.getElementById('ocb_province'), selected: province});
                    addrsCtrl.addressSelectAction({selectObj: document.getElementById('ocb_city'), value: province, selected: city, isCity: true});
                    addrsCtrl.addressSelectAction({selectObj: document.getElementById('ocb_district'), value: city, selected: district, isCity: false});
                }
                
            },
            
            createOrder: function () {
                var that = this,
                    params = {
                        contacts: $('#ocb_contacts').val(),
                        contactsmobile: $('#ocb_contactsmobile').val(),
                        contactstel: $('#ocb_contactstel').val(),
                        contactsprovince: $('#ocb_province').val(),
                        contactscity: $('#ocb_city').val(),
                        contactsdistrict: $('#ocb_district').val(),
                        contactsaddress: $('#ocb_contactsaddress').val(),
                        serviceid: $('#serviceid').val(),
                        servicename: $('#servicename').val(),
                        province: $('#province').val(),
                        city: $('#city').val(),
                        district: $('#district').val(),
                        servicerid: $('#servicerid').val(),
                        servicername: $('#servicername').val(),
                        comments: $('#ocb_comments').val(),
                        amount: $('#amount').val(),
                        sdcat1: $('#sdcat1').val(),
                        sdcat2: $('#sdcat2').val(),
                        discount: $('#discount').val(),
                        fee: $('#fee').val(),
                        due: $('#due').val(),
                        serviceItemInfos: $('#serviceItemInfosJSONStr').val()
                    };
                
                $.ajax({
                    url: common.prefix + "user/createOrderPage.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
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