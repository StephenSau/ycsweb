(function (requirejs) {
    'use strict';
    String.prototype.trim = function () {
        return this.replace(/(^\s+|\s+$)/g, '');
    }
    requirejs(['jquery', 'common', 'tab', 'chosen', 'addrsCtrl', "formVerified", "dialog", 'experts'], function ($, common, tab, chosen, addrsCtrl, FormVerified, dialog, Experts) {
        function Settings() {
            this.init();
        }
        
        Settings.prototype = {
            init: function () {
                var that = this,
                    accountVerifition = new FormVerified(document.forms.accountForm, function () {
                        that.updateform("account");
                    }, true),
                    contactor = new FormVerified(document.forms.contactorForm, function () {
                        that.updateform("contactor");
                    }, true),
                    expert = new Experts($('#expert_list'));
                $('#settings_tab').tab();
                $('select').chosen();
                this.selectAction();
                this.getUserInfo();
                
            },
            
            selectAction: function () {
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('sc_province'), selected: "440000"});
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('sc_city'), value: "440000", selected: "440100", isCity: true});
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('sc_district'), value: "440100", selected: "440106", isCity: false});
                $('#sc_province').change(function () {
                    addrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('sc_city'),
                        value: this.value,
                        resetObj: document.getElementById('sc_district'),
                        isCity: true
                    });
                });
                $('#sc_city').change(function () {
                    addrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('sc_district'),
                        value: this.value,
                        isCity: false
                    });
                });
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
                            common.errorDialog(data, function () {
                                that.getUserInfo.apply(that, arguments);
                            });
                        }
                    },
                    error: function (data) {

                    }

                });
            },
            
            fillForm: function (data) {
                $('#sa_userName').text(data.username || "--");
                $('#sa_nickName').val(data.nickname);
                $('#sc_contacts').val(data.contacts);
                $('#sc_company').val(data.company);
                $('#sc_title').val(data.title);
                $('#sc_contactsmobile').val(data.contactsmobile);
                $('#sc_contactstel').val(data.contactstel);
                $('#sc_contactsemail').val(data.contactsemail);
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('sc_province'), selected: data.contactsprovince});
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('sc_city'), value: data.contactsprovince, selected: data.contactscity, isCity: true});
                addrsCtrl.addressSelectAction({selectObj: document.getElementById('sc_district'), value: data.contactscity, selected: data.contactsdistrict, isCity: false});
                $('#sc_contactsaddress').val(data.contactsaddress);
            },
            
            updateform: function (type) {
                var that = this,
                    params = {},
                    form = null;
                if (type === "account") {
                    form = document.forms.accountForm;
                    params.nickname = form.nickname.value;
                } else if (type === "contactor") {
                    form = document.forms.contactorForm;
                    params.contacts = form.contacts.value;
                    params.company = form.company.value.trim();
                    params.title = form.title.value.trim();
                    params.contactsmobile = form.contactsmobile.value;
                    params.contactstel = form.contactstel.value;
                    params.contactsemail = form.contactsemail.value;
                    params.contactsprovince = form.contactsprovince.value;
                    params.contactscity = form.contactscity.value;
                    params.contactsdistrict = form.contactsdistrict.value;
                    params.contactsaddress = form.contactsaddress.value;
                }
                $.ajax({
                    url: common.prefix + "user/updateUserInfos.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            dialog.show({
                                content: "保存成功"
                            });
                        } else {
                            common.errorDialog(data);
                        }
                        
                    },
                    error: function (data) {

                    }

                });
            }
        };
        
        var settings = new Settings();
    });
}(window.requirejs));