(function (requirejs) {
    "use strict";
    requirejs(['jquery', 'common', 'formVerified', 'info', 'dialog', ], function ($, common, FormVerified, info, dialog) {
        function OrderConfirm() {
            this.hasLogined = false;
            this.needForcedStop = false;
            this.loginSatus = "telphone";
            this.onImgCode = false;
            this.init();
        }

        OrderConfirm.prototype = {
            init: function () {
                var orderVerifition = new FormVerified(document.getElementById('order_commit_form'), undefined, true);
                this.initLogin();
                this.listener();
            },

            listener: function () {
                var that = this,
                    phone = $('#l_telphone');
                $(document.forms.loginform).submit(function (event) {
                    event.preventDefault();
                    if (!that.hasLogined) {
                        if (that.loginSatus === "common") {
                            that.loginPass();
                        } else if (that.loginSatus === "telphone") {
                            that.loginByPhone();
                        } else if (that.loginSatus === "image") {
                            that.checkImageCode();
                        }
                    }   
                });

                $('#lb_imgCode').on('click', $.proxy(this.changeImgCode, this));
                $('#lb_changeImgCode').on('click', $.proxy(this.changeImgCode, this));
                $('#toPhoneLogin').on('click', function () {
                    if (!that.hasLogined) {
                        that.changeLoginBox('telphone');
                    }
                });
                $('#lb_toNormalLogin').on('click', function () {
                    if (!that.hasLogined) {
                        that.changeLoginBox('common');
                    }
                });

                phone.on('keyup', function () {
                    if (!/^1(3[0-9]|4[0-9]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/.test(phone.val())){
                        $(this).addClass('invalid').removeClass('valid');
                    } else {
                        $(this).removeClass('invalid').addClass('valid');
                    }
                });

                $('#lb_getPhoneCode').on('click', function () {
                    if (!that.hasLogined) {
                        if (!/^1(3[0-9]|4[0-9]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/.test(phone.val())){
                            return;
                        }
                        if (!that.onCountDown) {
                            that.getPhoneCode();
                        }
                    }
                });

                $('#lb_checkImgCodeBtn').on('click', function () {
                    that.checkImageCode();
                });
            },

            changeImgCode: function () {
                $('#lb_imgCode').attr('src', common.prefix + "vc.htm?time=" + new Date().getTime());
            },

            getPhoneCode: function (validateCode) {
                var that = this,
                    params = {
                        phoneNo: $('#l_telphone').val()
                    };
                if (validateCode) {
                    params.validateCodeImg = validateCode;
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
                                that.changeImageBox();
                            } else if (data.errorcode === "2087") {
                                dialog.show({
                                    content: data.errormsg,
                                    buttons: [{
                                        name: "普通登录",
                                        callBack: function () {
                                            that.changeLoginBox('common');
                                            dialog.close();
                                        }
                                    }]
                                });
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

            changeImageBox: function () {
                if (this.onImgCode) {
                    this.onImgCode = false;
                    this.loginSatus = 'telphone';
                    $('#lb_telphoneLine').show();
                    $('#lb_phoneCodeLine').show();
                    $('#lb_imgCodeLine').hide();
                    $('#lb_rememberLine').show();
                    $('#lb_submitBtn').text("登录");
                } else {
                    this.onImgCode = true;
                    this.loginSatus = "image";
                    $('#lb_telphoneLine').hide();
                    $('#lb_phoneCodeLine').hide();
                    $('#lb_imgCodeLine').show();
                    $('#l_imgCode').val('');
                    $('#lb_rememberLine').hide();
                    $('#lb_submitBtn').text("确定");
                    this.changeImgCode();
                }     
            },

            checkImageCode: function () {
                var that = this,
                    params = {
                        validateCode: $('#l_imgCode').val()
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
                            $('#l_imgCode').css({
                                'border-color': '#dddddd'
                            });
                            that.changeImageBox();
                            that.getPhoneCode($('#l_imgCode').val());
                            that.startCountDown();
                        } else {
                            common.errorDialog(data);
                            $('#l_imgCode').css({
                                'border-color': '#db281f'
                            });
                        }
                    },
                    error: function (data) {

                    }

                });
            },

            startCountDown: function () {
                var that = this,
                    btn = $('#lb_getPhoneCode'),
                    i = 60,
                    countDown = function () {
                        i -= 1;
                        if (i <= 0 || that.needForcedStop) {
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

            loginByPhone: function () {
                var that = this,
                    form = document.forms.loginform,
                    params = {
                        phoneNo: form.telphone.value,
                        validatecode: form.telCode.value
                    };
                if (!form.telphone.value) {
                    dialog.show({
                        content: "请填写手机"
                    });
                    return;
                } else if (!form.telCode.value) {
                    dialog.show({
                        content: "请输入验证码"
                    });
                    return;
                }
                
                $.ajax({
                    url: common.prefix + "user/qryUserInfosByPhoneNoVLogin.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.needForcedStop = true;
                            that.hasLogined = true;
                            if (data.re.isFind === "1") {
                                $('#ocb_contacts').val(data.re.userInfos.contacts);
                                $('#ocb_contactsmobile').val(data.re.userInfos.contactsmobile); 
                            } else if (data.re.isFind === "0") {
                                $('#ocb_contacts').val("");
                                $('#ocb_contactsmobile').val("");
                            }
                            common.getUserInfo();
                            that.changeLogin(true);
                        } else {
                            dialog.show({
                                content: data.errormsg
                            });
                            $(form.telphone).removeClass('invalid');
                            $(form.telCode).removeClass('invalid');
                        }
                    },
                    
                    error: function (data) {
                    }

                });
            },

            loginPass: function () {
                var that = this,
                    form = document.forms.loginform,
                    params = {
                        username: form.username.value,
                        password: form.password.value
                    };
                if (!form.username.value) {
                    dialog.show({
                        content: "请填写用户名"
                    });
                    return;
                } else if (!form.password.value) {
                    dialog.show({
                        content: "请输入密码"
                    });
                    return;
                }
                
                $.ajax({
                    url: common.prefix + "user/login.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.hasLogined = true;
                            $('#ocb_contacts').val(data.re.contacts);
                            $('#ocb_contactsmobile').val(data.re.contactsmobile); 
                            common.getUserInfo();
                            that.changeLogin(true);
                        } else {
                            dialog.show({
                                content: data.errormsg
                            });
                            $(form.username).removeClass('invalid');
                            $(form.password).removeClass('invalid');
                            if (data.errorcode === "3001") {
                                $(form.username)
                                    .addClass('invalid');
                            } else if (data.errorcode === "3119") {
                                $(form.password)
                                    .addClass('invalid');
                            } else if (data.errorcode === "3020") {
                                if (!form.username.value) {
                                    $(form.username)
                                        .addClass('invalid');
                                } else if (!form.password.value) {
                                    $(form.password)
                                        .addClass('invalid');
                                }
                            }
                        }
                    },
                    
                    error: function (data) {
                    }

                });
            },

            initLogin: function () {
                var that = this;
                common.getUserInfo(function (data) {
                    if (data.isLogin === "0") {
                        $('#order_login_box').show();
                        $('#order_login_box input').removeAttr('disabled');
                    } else if (data.isLogin === "1") {
                        that.hasLogined = true;
                        $('#ocb_contacts').val(data.contacts);
                        $('#ocb_contactsmobile').val(data.contactsmobile);
                        that.changeLogin(true);
                    }
                });
            },

            changeLogin: function (status) {
                if (status) {
                    $('#order_login_box').addClass('olb_disabled');
                    $('#order_login_box input').attr('disabled', true);
                    $('#lb_btnline').hide();
                    $('#order_commit_box').show();
                    $('#lb_toNormalLine').hide();
                    $('#lb_forget').hide();
                    $('#toPhoneLogin').hide();
                    $('#lb_getPhoneCode').addClass('lb_getPhone_disabled');
                }
            },

            changeLoginBox: function (flag) {
                if (flag === "common") {
                    this.loginSatus = "common";
                    $('#lb_nameLine').show();
                    $('#lb_passwordLine').show();
                    $('#lb_telphoneLine').hide();
                    $('#lb_phoneCodeLine').hide();
                    $('#lb_imgCodeLine').hide();
                    $('#lb_rememberLine').show();
                    $('#lb_submitBtn').text("登录");
                } else if (flag === "telphone") {
                    $('#lb_nameLine').hide();
                    $('#lb_passwordLine').hide();
                    if (this.onImgCode) {
                        this.loginSatus = "image";
                        $('#lb_telphoneLine').hide();
                        $('#lb_phoneCodeLine').hide();
                        $('#lb_imgCodeLine').show();
                        $('#lb_rememberLine').hide();
                        $('#lb_submitBtn').text("确定");
                    } else {
                        this.loginSatus = "telphone";
                        $('#lb_telphoneLine').show();
                        $('#lb_phoneCodeLine').show();
                        $('#lb_imgCodeLine').hide();
                        $('#lb_rememberLine').show();
                        $('#lb_submitBtn').text("提交");
                    }
                } 
            }
        };

        var orderConfirm = new OrderConfirm();  
    });
}(window.requirejs));