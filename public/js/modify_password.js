(function (requirejs) {
    'use strict';
    requirejs(["jquery", "common", "formVerified", "dialog", 'experts'], function ($, common, FormVerified, dialog, Experts) {
        function ModifyPassword() {
            this.init();
        }
        
        ModifyPassword.prototype = {
            init: function () {
                var that = this,
                    formVerified = new FormVerified(document.getElementById("mpform"), function () {
                        that.modifyPass();
                    }, true),
                    expert = new Experts($('#expert_list'));
                
                formVerified.checkPassword = function (value, notRequire) {
                    if (this.checkDirty(value, notRequire)) {
                        return this.messageInfo.dirty;
                    } else if (!value) {
                        return "";
                    }
                    if (!/^\S{6,20}$/.test(value)){
                        return "请输入6-20位非空格字符"
                    }
                    return "";
                }
            },
            
            modifyPass: function () {
                var that = this,
                    form = document.forms.mpform,
                    params = {
                        oldpassword: form.oldpassword.value,
                        newpassword: form.newpassword.value,
                        confirmpassword: form.confirmpassword.value
                    };

                $.ajax({
                    url: common.prefix + "user/updateUserPassword.htm",
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
        
        var modifyPassword = new ModifyPassword();
    });
}(window.requirejs));