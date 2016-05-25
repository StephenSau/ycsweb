(function (requirejs) {
    'use strict';
    requirejs(['jquery', "common", 'dialog', 'info', 'tab', 'placeholder'], function ($, common, dialog, info) {
        function Login() {
            this.onImgCode = false;
            this.telphone = "";
            this.formStatus = "common";
            this.onCountDown = false;
            this.rememberme = false;
            this.init();
        }

        Login.prototype = {
            init: function () {
                var that = this,
                    code = common.getParams('code'),
                    state = common.getParams('state'),
                    phone = $('#l_telphone');
                $(document.forms.loginform).submit(function (event) {
                    event.preventDefault();
                    if (that.formStatus === "common") {
                        that.loginPass();
                    } else if (that.formStatus === "telphone") {
                        that.loginByPhone();
                    } else if (that.formStatus === "image") {
                        that.checkImageCode();
                    }
                });
                this.getAccountName();
                $('#lb_imgCode').on('click', $.proxy(this.changeImgCode, this));
                $('#lb_changeImgCode').on('click', $.proxy(this.changeImgCode, this));
                $('#lb_tab').tab({
                    callback: function () {
                        that.tabChange.apply(that, arguments);
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
                    if (!/^1(3[0-9]|4[0-9]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/.test(phone.val())){
                        dialog.show({
                            content: "请填写正确手机号码"
                        });
                        return;
                    }
                    if (!that.onCountDown) {
                        that.getPhoneCode();
                    }
                });

                $('#lb_checkImgCodeBtn').on('click', function () {
                    that.checkImageCode();
                });

                $('#lb_wxLogin').on('click', function () {
                    that.showWXlogin();
                });

                if (code && state) {
                    that.loginByWx(code, state);
                }
            },

            showWXlogin: function () {
                var html = [],
                    obj = null;
                html.push('<div class="wxLoginBox" id="wxLoginBox">');
                html.push('</div>');
                info.show({
                    content: html.join('')
                });
                obj = new WxLogin({
                    id: "wxLoginBox",
                    appid: "wx3d09fbc212f8fa1e",
                    scope: "snsapi_login",
                    redirect_uri: "http://www.1caishui.com/app/login.html",
                    state: "STATE",
                    style: "black",
                    href: ""
                });
            },

            showLoading: function () {
                var html = [];
                html.push('<div class="loadingBox">');
                html.push('<img src="../public/img/loading.gif" />');
                html.push('<p>加载中...</p>');
                html.push('</div>');
                info.show({
                    content: html.join('')
                });
            },

            tabChange: function (obj) {
                var target = obj.attr('data-target');
                if (target === "common") {
                    this.formStatus = "common";
                    $('#lb_nameLine').show();
                    $('#lb_passwordLine').show();
                    $('#lb_telphoneLine').hide();
                    $('#lb_phoneCodeLine').hide();
                    $('#lb_imgCodeLine').hide();
                    $('#lb_rememberLine').show();
                    $('#lb_submitBtn').text("登录");
                } else if (target === "telphone") {
                    $('#lb_nameLine').hide();
                    $('#lb_passwordLine').hide();
                    if (this.onImgCode) {
                        this.formStatus = "image";
                        $('#lb_telphoneLine').hide();
                        $('#lb_phoneCodeLine').hide();
                        $('#lb_imgCodeLine').show();
                        $('#lb_rememberLine').hide();
                        $('#lb_submitBtn').text("确定");
                    } else {
                        this.formStatus = "telphone";
                        $('#lb_telphoneLine').show();
                        $('#lb_phoneCodeLine').show();
                        $('#lb_imgCodeLine').hide();
                        $('#lb_rememberLine').show();
                        $('#lb_submitBtn').text("登录");
                    }
                } 
            },

            changeImgCode: function () {
                $('#lb_imgCode').attr('src', common.prefix + "vc.htm?time=" + new Date().getTime());
            },

            getPhoneCode: function (validateCode) {
                var that = this,
                    tips = $('#ui-tips'),
                    params = {
                        phoneNo: $('#l_telphone').val()
                    };
                if (validateCode) {
                    params.authCodeImg = validateCode;
                }
                $.ajax({
                    url: common.prefix + "user/sendAuthCode4Login.htm",
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
                            } else {
                                tips.html(data.errormsg).show();
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
                    this.formStatus = 'telphone';
                    $('#lb_telphoneLine').show();
                    $('#lb_phoneCodeLine').show();
                    $('#lb_imgCodeLine').hide();
                    $('#lb_rememberLine').show();
                    $('#lb_submitBtn').text("登录");
                } else {
                    this.onImgCode = true;
                    this.formStatus = "image";
                    $('#lb_telphoneLine').hide();
                    $('#lb_phoneCodeLine').hide();
                    $('#lb_imgCodeLine').show();
                    $('#l_imgCode').val('');
                    $('#lb_rememberLine').hide();
                    $('#lb_submitBtn').text("确定");
                    this.changeImgCode();
                }     
            },

            packageSupplement: function (data) {
                var that = this,
                    html = [];
                html.push('<div class="ui-info-supplement">');
                html.push('<div class="sf_messageBox">');
                html.push('<p class="sf_iconLine"><span class="icon"></span></p>');
                html.push('<h3>登录成功！</h3>');
                if (data.password) {
                    html.push('<p class="sf_textLine">' + data.mobile + ' 的手机用户，欢迎您登录壹财税网站！我们已为您自动生成用户名和密码：</p>');
                    html.push('<p class="sf_userLine"><span>用户名：' + data.username + '</span><span>密码：' + data.password + '</span><a href="javascript:;" id="sf_showForm">修改</a></p>');
                } else {
                    html.push('<p class="sf_textLine">' + data.mobile + ' 的手机用户，欢迎您登录壹财税网站！为了保障您的账号安全，请设置用户名和密码：<a href="javascript:;" id="sf_showForm">设置</a></p>');
                }
                html.push('</div>');
                html.push('<form action="/user/setIDAndPwd.htm" method="post" name="supplementForm" id="supplementForm">');
                html.push('<ol id="sf_form">');
                html.push('<li class="ui-tips" id="ui-supplement-tips">测试</li>');
                html.push('<li>');
                html.push('<label class="sf_title" for="sf_username"><em>*</em>用户名</label>');
                html.push('<input class="sf_text" type="text" name="username" id="sf_username" placeholder="请输入4-20位字母、数字或“-”、“_”" />');
                html.push('</li>');
                html.push('<li>');
                html.push('<label class="sf_title" for="sf_password"><em>*</em>密码</label>');
                html.push('<input class="sf_text" type="password" name="password" id="sf_password" placeholder="6-20位字符，不能包含空格" />');
                html.push('</li>');
                html.push('<li class="sf_btnLine">');
                html.push('<button type="submit" class="btn btn_warning">确认</button>');
                html.push('</li>');
                html.push('</ol>');
                html.push('</form>');
                html.push('</div>');
                info.show({
                    content: html.join(''),
                    closeAction: function () {
                        window.history.back();
                    }
                });
                $('#sf_username').placeholder();
                $('#sf_password').placeholder();

                $('#supplementForm').on('submit', function (event) {
                    event.preventDefault();
                    that.supplementSubmit();
                });

                $('#sf_showForm').on('click', function (event) {
                    $('#sf_form').show();
                    $(this).hide();
                });
            },

            supplementSubmit: function () {
                var that = this,
                    form = document.forms.supplementForm,
                    tips = $('#ui-supplement-tips'),
                    params = {
                        username: form.username.value,
                        password: form.password.value
                    };
                $(form.username).removeClass('invalid');
                $(form.password).removeClass('invalid');
                if (!/^[A-Za-z0-9\-\_]{4,20}$/.test(form.username.value)) {
                    tips.html('用户名错误，请输入4-20位字母、数字或“-”、“_”字符').show();
                    $(form.username).css({
                        'border-color': '#db281f'
                    });
                    return;
                } else if (/^\d+$/.test(form.username.value)) {
                    tips.html('对不起，您输入的用户名不能为纯数字').show();
                    $(form.username).css({
                        'border-color': '#db281f'
                    });
                    return;
                } else if (!/^\S{6,20}$/.test(form.password.value)) {
                    tips.html('请输入6-20位非空格字符').show();
                    $(form.password).css({
                        'border-color': '#db281f'
                    });
                    return;
                }
                
                $.ajax({
                    url: "/user/setIDAndPwd.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            common.setUserInfo({
                                id: data.re.id,
                                username: data.re.username
                            });
                            info.close();
                            window.history.back();
                        } else {
                            $(form.username).removeAttr('style');
                            $(form.password).removeAttr('style');
                            tips.html(data.errormsg).show();
                            
                        }
                    },
                    error: function (data) {
                    }

                });   
            },

            packageSuccessTips: function () {
                var that = this,
                    html = [];
                html.push('<div class="ui-info-supplement">');
                html.push('<div class="sf_messageBox">');
                html.push('<p class="sf_iconLine"><span class="icon"></span></p>');
                html.push('<h3>用户名密码修改成功！</h3>');
                html.push('</div>');
                html.push('</div>');
                info.show({
                    content: html.join('')
                });
            },

            checkImageCode: function () {
                var that = this,
                    tips = $('#ui-tips'),
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
                            tips.html(data.errormsg).show();
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

            loginByPhone: function () {
                var that = this,
                    form = document.forms.loginform,
                    params = {
                        phoneNo: form.telphone.value,
                        authCode: form.telCode.value
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
                    url: common.prefix + "user/loginByPhone.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            common.setUserInfo({
                                id: data.re.id,
                                username: data.re.username
                            });

                            if (form.rememberme.checked) {
                                $.cookie('usertelphone', form.telphone.value, {expires: 7, path: '/'});
                            } else {
                                $.removeCookie('usertelphone', {path: '/'});
                            }

                            if (data.re.needSetPwd) {
                                that.telphone = form.telphone.value;
                                that.rememberme = form.rememberme.checked;
                                data.re.mobile = form.telphone.value;
                                that.packageSupplement(data.re);
                            } else {
                                window.history.back();
                            }
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

            loginByWx: function (code, state) {
                var that = this,
                    params = {
                        code: code,
                        state: state
                    };
                that.showLoading();
                $.ajax({
                    url: common.prefix + "user/loginByWX.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            info.close();
                            if (data.re.needBond) {
                                window.location.href = '/app/wxBinding.html?id=' + data.re.id;
                            } else {
                                window.history.go(-2);
                                setTimeout(function () {
                                    window.location.href = "/";
                                }, 1000);
                            }
                        } else {
                            
                        }
                    },
                    
                    error: function (data) {
                    }

                });
            },

            loginPass: function () {
                var form = document.forms.loginform,
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
                            if (form.rememberme.checked) {
                                $.cookie('accountname', form.username.value, {expires: 7, path: '/'});
                            } else {
                                $.removeCookie('accountname', {path: '/'});
                            }
                            common.setUserInfo({
                                id: data.re.id,
                                username: data.re.username
                            });
                            window.history.back();
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

            getAccountName: function () {
                var accountName = $.cookie('accountname'),
                    userTelphone = $.cookie('usertelphone');
                if (accountName) {
                    document.forms.loginform.username.value = accountName;
                }

                if (userTelphone) {
                    document.forms.loginform.telphone.value = userTelphone;
                }
            }
        };
        
        var login = new Login();
    });
}(window.requirejs));