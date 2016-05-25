(function (requirejs) {
    'use strict';
    requirejs(['jquery', "common", "formVerified", "info", "dialog", 'placeholder'], function ($, common, FormVerified, info, dialog) {
        function Register() {
            this.onCountDown = false;
            this.init();
        }

        Register.prototype = {
            onchecking: false,
            init: function () {
                var that = this,
                    phone = $('#rb_phone'),
                    formVerified = new FormVerified(document.getElementById("register_form"), function () {
                        that.registerPass();
                    }, true);
                
                formVerified.checkAccount = function (value, notRequire) {
                    if (this.checkDirty(value, notRequire)) {
                        return this.messageInfo.dirty;
                    } else if (!value) {
                        return "";
                    }
                    if (!/^[A-Za-z0-9\-\_]{4,20}$/.test(value)) {
                        return "请输入4-20位字母、数字或“-”、“_”字符";
                    }
                    return "";
                }
                
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

                formVerified.checkPhoneCode = function (value, notRequire) {
                    if (this.checkDirty(value, notRequire)) {
                        return this.messageInfo.dirty;
                    } else if (!value) {
                        return "";
                    }
                    if (value.length !== 4) {
                        return "验证码错误";
                    }
                    return "";
                }
                
                $('input[placeholder]').placeholder();

                phone.on('keyup', function () {
                    var error = null;
                    if (this.getAttribute('data-error-target')) {
                        error = $('#' + this.getAttribute('data-error-target'));
                        if (!/^1(3[0-9]|4[0-9]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/.test($('#rb_phone').val())){
                            $(this).addClass('invalid').removeClass('valid');
                            error.show();
                        } else {
                            $(this).removeClass('invalid').addClass('valid');
                            error.hide();
                        }
                    }
                });
                
                $('#rb_getPhoneCodeBtn').on('click', function () {
                    var error = null,
                        area = document.getElementById('rb_phone'),
                        id = area.getAttribute('data-error-target');
                    if (!id) {
                        id = 'e' + parseInt(Math.random()*1e16, 10);
                        area.setAttribute('data-error-target', id);
                    }
                    if (!document.getElementById(id)) {
                        error = $('<span class="error" id="' + id + '" style="display:none;"></span>');
                        $(area).parent().append(error);
                    } else {
                        error = $('#' + id);
                    }
                    if (!/^1(3[0-9]|4[0-9]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/.test($('#rb_phone').val())){
                        $(area).addClass('invalid').removeClass('valid');
                        error.html("请输入正确的手机号码").show();
                        return;
                    }

                    if (!that.onCountDown) {
                        that.getPhoneCode();
                    }

                    $(area).removeClass('invalid').addClass('valid');
                    error.hide();
                });
                
                $('#ui-info')
                    .on('click', '#rb_imageCode', $.proxy(this.changeImageCode, this))
                    .on('click', '#rbi_change', $.proxy(this.changeImageCode, this))
                    .on('click', '#rbi_submit', function () {
                        that.checkImageCode();
                });
            },
            
            startCountDown: function () {
                var that = this,
                    btn = $('#rb_getPhoneCodeBtn'),
                    i = 60,
                    countDown = function () {
                        i -= 1;
                        if (i <= 0) {
                            that.onCountDown = false;
                            btn.html('获取手机验证码');
                        } else {
                            btn.html('<em>' + i + '</em>秒后可重新获取');
                            setTimeout(countDown, 1000);
                        }
                    };
                this.onCountDown = true;
                countDown();
            },
            
            packageImageCode: function () {
                var that = this;
                info.show({
                    content: '<div class="rb_imageCodeBox">' +
                                '<h2>图片验证</h2>' +
                                '<p class="rbi_inputline">' +
                                    '<label for="rbi_text">输入验证码</label>' +
                                    '<input type="text" maxlength="4" id="rbi_text" />' +
                                    '<img src="' + common.prefix + 'vc.htm?time=' + new Date().getTime() + '" width="100" height="30" id="rb_imageCode" />' +
                                    '<a href="javascript:;" id="rbi_change">换一换</a>' +
                                '</p>' +
                                '<p class="rbi_btnline">' +
                                    '<a id="rbi_submit" href="javascript:;" class="btn btn_warning">确定</a>' +
                                '</p>' +
                            '</div>'
                });
                
                
            },
            
            changeImageCode: function () {
                $('#rb_imageCode').attr('src', common.prefix + "vc.htm?time=" + new Date().getTime());
            },
            
            checkImageCode: function () {
                var that = this,
                    params = {
                        validateCode: $('#rbi_text').val()
                    };
                $.ajax({
                    url: common.prefix + "common/checkValidateCode4Img.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            $('#rbi_text').css({
                                'border-color': '#73A80D'
                            });
                            info.close();
                            that.getPhoneCode($('#rbi_text').val());
                            that.startCountDown();
                        } else {
                            $('#rbi_text').css({
                                'border-color': '#db281f'
                            });
                        }
                    },
                    error: function (data) {

                    }

                });
            },

            registerPass: function () {
                var that = this,
                    form = document.forms.registerForm,
                    params = {
                        username: form.username.value,
                        password: form.password.value,
                        confirmpassword: form.confirmpassword.value,
                        mobile: form.mobile.value,
                        validatecode: form.validatecode.value
                    };

                $.ajax({
                    url: common.prefix + "user/registuser.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            common.setUserInfo(data.re);
                            //that.showSuccessBox();
                            window.location.replace('/app/confirm.html');
                            info.close();
                        } else {
                            dialog.show({
                                content: data.errormsg
                            });
                        }
                    },
                    error: function (data) {

                    }

                });
            },
            
            getPhoneCode: function (validateCode) {
                var that = this,
                    form = document.forms.registerForm,
                    params = {
                        phoneNo: form.mobile.value
                    };
                if (validateCode) {
                    params.validateCodeImg = validateCode
                }
                $.ajax({
                    url: common.prefix + "common/sendValidateCode.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200"){
                            that.startCountDown();
                        } else if (data.status === "-100") {
                            if (data.errorcode === "2084") {
                                that.packageImageCode();
                            } else {
                                dialog.show({
                                    content: data.errormsg
                                });
                            }
                        }
                    },
                    error: function (data) {

                    }

                });
            },

            showSuccessBox: function () {
                var time = 5,
                    text = $('#rsb_countDownText'),
                    countDown = function () {
                        time = time - 1;
                        text.text(time);
                        if (time > 0) {
                            setTimeout(countDown, 1000);
                        } else {
                            if ($.cookie('orderCommit')) {
                                window.location.href = "/app/order_commit.html";
                            } else {
                                //window.location.href = $.cookie('backpage');
                                window.history.back();
                            }
                        }
                    };
                $('#register_form').hide();
                $('#rb_loginLink').hide();
                $('#register_success_box').show();
                setTimeout(countDown, 1000);

            }
        };
        var register = new Register();
    });
    
}(window.requirejs));