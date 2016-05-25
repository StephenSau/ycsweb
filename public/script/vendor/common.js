(function (define) {
    "use strict";
    define(['jquery', 'ajax', 'dialog', 'info', 'cookie', 'json', 'placeholder'], function ($, Ajax, dialog, info) {
        function Common() {
            this.name = "";
            this.id = "";
            this.prefix = "/";
            this.message = 0;
            this.onImgCode = false;
            this.telphone = "";
            this.formStatus = "common";
            this.onCountDown = false;
            this.rememberme = false;
            this.init();
        }

        Common.FRONTPAGE = [
            "index",
            "service_detail",
            "service_provider",
            "provider_detail",
            "404",
            "500",
            "about",
            "aptitude",
            "chronicle",
            "contact",
            "exempt",
            "help",
            "help_detail",
            "help_list",
            "help_search",
            "jobs",
            "news",
            "news_detail",
            "news_list",
            "SearchArticleList",
            "team"
        ];
        
        Common.NORETURNPAGE = [
             
        ];
        
        Common.BACKPAGE = [
            "login",
            "register",
            "404",
            "500",
            "order_commit",
            "order_detail",
            "order_list",
            "setting",
            "modify_password",
            "message",
            "gotoEditOrder",
            "createOrderPage"
        ];

        Common.prototype = {
            init: function () {
                var that = this;
                this.getUserInfo();
                this.watchLink();
                this.mapCtrl();
                this.codeBoxCtrl();
                this.assist();
                this.addQQTalk();
                this.searchFormCtrl();
            },
            
            addQQTalk: function () {
                
                var number = '1001',
                    url = window.location.href;
                if (url.indexOf("service_detail") !== -1 ||
                   url.indexOf("service_provider") !== -1 ||
                   url.indexOf("provider_detail") !== -1) {
                    number = '1002';
                } else if (this.isOnBack()) {
                    number = '1003';
                }
                
                try{
                    BizQQWPA.addCustom([
                    {
                        aty: '1',
                        a: number,
                        nameAccount: 4008310866,
                        node: document.body
                    }, {
                        aty: '1',
                        a: number,
                        nameAccount: 4008310866,
                        selector: 'qqTalk_fixed_btn_01'
                    }, {
                        aty: '1',
                        a: number,
                        nameAccount: 4008310866,
                        selector: 'qqTalk_fixed_btn_02'
                    }, {
                        aty: '1',
                        a: number,
                        nameAccount: 4008310866,
                        selector: 'qqTalk_header_btn_01'
                    }, {
                        aty: '1',
                        a: number,
                        nameAccount: 4008310866,
                        selector: 'qqTalk_backyard_btn_01'
                    }, {
                        aty: '1',
                        a: number,
                        nameAccount: 4008310866,
                        selector: 'qqTalk_font_btn_01'
                    },
                     {
                        aty: '1',
                        a: number,
                        nameAccount: 4008310866,
                        selector: 'qqTalk_contact_btn_01'
                    }
                    ]);
                } catch (e) {
                    
                }  
            },
            
            searchFormCtrl: function () {
                var form = document.getElementById('articleSearchForm');
                $(form).submit(function (event) {
                    event.preventDefault();
                    window.location.href = '/so/' + encodeURIComponent(form.querycondition.value);
                });
            },

            watchLink: function () {
                $(document).delegate('a', 'click', $.proxy(this.beforeJump, this));
            },

            beforeJump: function () {
                if (!this.isOnBack()) {
                    $.cookie('backpage', window.location.href);
                }
            },

            getUserInfo: function (callback) {
                var that = this,
                    request = new Ajax('/user/qryUserInfos.htm');
                request.done(function (data) {
                    if (data.status === "200") {
                        if (data.re.isLogin === "0") {
                            that.delUserInfo();
                            that.changeStatus(false);
                        } else {
                            that.setUserInfo({
                                id: data.re.id,
                                username: data.re.username
                            });
                            that.name = data.re.username;
                            that.id = data.re.id;
                            that.message = data.re.msgCount;
                            that.changeStatus(true);
                        }
                        if (callback && typeof callback === 'function') {
                            callback(data.re);
                        }
                    } else { 
                        dialog.show({
                                content: data.errormsg
                            });
                    }
                });
            },

            mapCtrl: function () {
                var map = $('#h_map');
                $('#h_showMap').on('mouseenter', function () {
                    if (!map.data('status') || map.data('status') === "hidden") {
                        map.show();
                        map.data('status', 'show');
                    } else {
                        map.hide();
                        map.data('status', 'hidden');
                    }
                });

                map.on('mouseleave', function () {
                    map.hide();
                    map.data('status', 'hidden');
                });
            },

            codeBoxCtrl: function () {
                var box = $('#h_codeBox');
                $('#h_showCodeBox').on('mouseenter', function () {
                    if (!box.data('status') || box.data('status') === "hidden") {
                        box.show();
                        box.data('status', 'show');
                    } else {
                        box.hide();
                        box.data('status', 'hidden');
                    }
                });
                box.on('mouseleave', function () {
                    box.hide();
                    box.data('status', 'hidden');
                });
            },

            changeStatus: function (isLogin) {
                var that = this,
                    html = [];
                if (document.getElementById('h_status')){
                    if (isLogin) {
                        html.push('<li>' + this.name + ' <a id="h_loginout" href="javascript:;">退出</a></li>');
                        html.push('<li><a href="/app/message.html">消息通知</a> <span class="h_red"' + (this.message === "0" ? ' style="display:none"' : '') + '>' + this.message + '</span></li>');
                        html.push('<li class="h_noline"><a href="/app/order_list.html">我的订单</a></li>');
                    } else {
                        html.push('<li><a href="/app/register.html" class="line">注册</a></li>');
                        html.push('<li class="h_noline"><a id="loginBtn" href="javascript:;">登录</a></li>');
                    }

                    $('#h_status').html(html.join(''));

                    if (document.getElementById('h_loginout')) {
                        $('#h_loginout').unbind('click').bind('click', $.proxy(this.loginOut, this));
                    }

                    if(document.getElementById('loginBtn')){
                        $('#loginBtn').on('click', function (event) {
                            that.showLoginBox();
                        });
                    }
                }
            },

            showLoginBox: function (callback, args) {
                var that = this,
                    html = [],
                    accountName = $.cookie('accountname'),
                    userTelphone = $.cookie('usertelphone'),
                    phone = null;
                this.formStatus = "common";
                html.push('<div class="ui-info-loginBox">');
                html.push('<ul class="lb_tab clearfix" id="plb_tab">');
                html.push('<li data-role="item" data-target="common" class="active">');
                html.push('<a href="javascript:;">普通登录</a>');
                html.push('</li>');
                html.push('<li data-role="item" data-target="telphone">');
                html.push('<a href="javascript:;">手机验证登录</a>');
                html.push('</li>');
                html.push('</ul>');
                html.push('<form action="/user/login" name="popuploginform" id="popup_login_form">');
                html.push('<ol>');
                html.push('<li class="ui-tips" id="ui-tips">测试</li>');
                html.push('<li id="plb_nameLine">');
                html.push('<label class="lb_title" for="pl_name">用户名</label>');
                html.push('<input class="lb_text" type="text" id="pl_name" name="username" tabindex="1" maxlength="20" value="' + (accountName ? accountName : '') + '" />');
                html.push('</li>');
                html.push('<li id="plb_passwordLine">');
                html.push('<label class="lb_title" for="pl_password">密码</label>');
                html.push('<input class="lb_text" type="password" id="pl_password" name="password" tabindex="2" maxlength="20" />');
                html.push('<a class="lb_find" href="javascript:;" onclick="document.getElementById(\'qqTalk_header_btn_01\').click()">找回密码</a>');
                html.push('</li>');
                html.push('<li id="plb_telphoneLine" class="lb_telphoneLine">');
                html.push('<label class="lb_title" for="pl_telphone">手机号码</label>');
                html.push('<input class="lb_text" type="text" id="pl_telphone" name="telphone" tabindex="3" maxlength="11" value="' + (userTelphone ? userTelphone : '') + '" />');
                html.push('</li>');
                html.push('<li id="plb_phoneCodeLine" class="lb_phoneCodeLine">');
                html.push('<label class="lb_title" for="pl_telCode">验证码</label>');
                html.push('<input class="lb_text" type="text" id="pl_telCode" name="telCode" tabindex="4" maxlength="4" />');
                html.push('<a href="javascript:;" id="plb_getPhoneCode">获取手机验证码</a>');
                html.push('</li>');
                html.push('<li id="plb_rememberLine" class="lb_rememberline">');
                html.push('<input checked="checked" type="checkbox" name="rememberme" id="pl_remember" tabindex="3">');
                html.push('<label for="pl_remember">记住我</label>');
                html.push('</li>');
                html.push('<li id="plb_imgCodeLine" class="lb_imgCodeLine">');
                html.push('<label class="lb_title" for="pl_imgCode">图片验证</label>');
                html.push('<input class="lb_text" type="text" id="pl_imgCode" name="imgCode" tabindex="5" maxlength="4" />');
                html.push('<img src="/vc.htm" id="plb_imgCode" width="100" height="36" />');
                html.push('<a class="lb_find" href="javascript:;" id="plb_changeImgCode">换一换</a>');
                html.push('</li>');
                html.push('<li class="lb_btnline">');
                html.push('<button type="submit" class="btn btn_warning" id="plb_submitBtn">登录</button>');
                html.push('</li>');
                html.push('</ol>');
                html.push('</form>');
                html.push('<p class="lb_registerline">还没注册？<a href="/app/register.html">免费注册</a></p>');
                html.push('</div>');

                info.show({
                    content: html.join('')
                });

                $(document.forms.popuploginform).submit(function (event) {
                    event.preventDefault();
                    if (that.formStatus === "common") {
                        that.loginPass(callback, args);
                    } else if (that.formStatus === "telphone") {
                        that.loginByPhone(callback, args);
                    } else if (that.formStatus === "image") {
                        that.checkImageCode();
                    }
                });

                $('#plb_imgCode').on('click', $.proxy(this.changeImgCode, this));
                $('#plb_changeImgCode').unbind('click').on('click', $.proxy(this.changeImgCode, this));

                $('#plb_tab').on('click', 'li', function () {
                    $(this).addClass('active').siblings('li').removeClass('active');
                    that.tabChange(this);
                });
                phone = $('#pl_telphone');

                phone.on('keyup', function () {
                    if (!/^1(3[0-9]|4[0-9]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/.test(phone.val())){
                        $(this).addClass('invalid').removeClass('valid');
                    } else {
                        $(this).removeClass('invalid').addClass('valid');
                    }
                });

                $('#plb_getPhoneCode').on('click', function () {
                    if (!/^1(3[0-9]|4[0-9]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/.test(phone.val())){
                        return;
                    }
                    if (!that.onCountDown) {
                        that.getPhoneCode();
                    }
                });

                $('#plb_checkImgCodeBtn').on('click', function () {
                    that.checkImageCode();
                });
            },

            tabChange: function (obj) {
                var target = $(obj).attr('data-target');
                $('#ui-tips').hide();
                $('#popup_login_form input').removeAttr('style');
                if (target === "common") {
                    this.formStatus = "common";
                    $('#plb_nameLine').show();
                    $('#plb_passwordLine').show();
                    $('#plb_telphoneLine').hide();
                    $('#plb_phoneCodeLine').hide();
                    $('#plb_imgCodeLine').hide();
                    $('#plb_rememberLine').show();
                    $('#plb_submitBtn').text("登录");
                } else if (target === "telphone") {
                    $('#plb_nameLine').hide();
                    $('#plb_passwordLine').hide();
                    if (this.onImgCode) {
                        this.formStatus = "image";
                        $('#plb_telphoneLine').hide();
                        $('#plb_phoneCodeLine').hide();
                        $('#plb_imgCodeLine').show();
                        $('#plb_rememberLine').hide();
                        $('#plb_submitBtn').text("确定");
                    } else {
                        this.formStatus = "telphone";
                        $('#plb_telphoneLine').show();
                        $('#plb_phoneCodeLine').show();
                        $('#plb_imgCodeLine').hide();
                        $('#plb_rememberLine').show();
                        $('#plb_submitBtn').text("登录");
                    }
                } 
            },

            changeImgCode: function () {
                $('#plb_imgCode').attr('src', "/vc.htm?time=" + new Date().getTime());
            },

            getPhoneCode: function (validateCode) {
                var that = this,
                    request = null,
                    tips = $('#ui-tips'),
                    params = {
                        phoneNo: $('#pl_telphone').val()
                    };
                if (validateCode) {
                    params.authCodeImg = validateCode;
                }
                request = new Ajax("/user/sendAuthCode4Login.htm", params);
                request.done(function (data) {
                    if (data.status === "200"){
                        that.startCountDown();
                    } else if (data.status === "-100") {
                        if (data.errorcode === "2084") {
                            that.changeImageBox();
                        } else {
                            tips.html(data.errormsg).show();
                        }
                    }
                });
            },

            changeImageBox: function () {
                $('#ui-tips').hide();
                $('#popup_login_form input').removeAttr('style');
                if (this.onImgCode) {
                    this.onImgCode = false;
                    this.formStatus = 'telphone';
                    $('#plb_telphoneLine').show();
                    $('#plb_phoneCodeLine').show();
                    $('#plb_imgCodeLine').hide();
                    $('#plb_rememberLine').show();
                    $('#plb_submitBtn').text("登录");
                } else {
                    this.onImgCode = true;
                    this.formStatus = "image";
                    $('#plb_telphoneLine').hide();
                    $('#plb_phoneCodeLine').hide();
                    $('#plb_imgCodeLine').show();
                    $('#pl_imgCode').val('');
                    $('#plb_rememberLine').hide();
                    $('#plb_submitBtn').text("确定");
                    this.changeImgCode();
                }     
            },

            packageSupplement: function (data, callback, args) {
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
                        that.getUserInfo();
                        if (typeof callback === 'function') {
                            callback(args);
                        }
                    }
                });
                $('#sf_username').placeholder();
                $('#sf_password').placeholder();

                $('#supplementForm').on('submit', function (event) {
                    event.preventDefault();
                    that.supplementSubmit(callback, args);
                });

                $('#sf_showForm').on('click', function (event) {
                    $('#sf_form').show();
                    $(this).hide();
                });
            },

            supplementSubmit: function (callback, args) {
                var that = this,
                    form = document.forms.supplementForm,
                    tips = $('#ui-supplement-tips'),
                    request = null,
                    params = {
                        username: form.username.value,
                        password: form.password.value
                    };
                $(form.username).removeClass('invalid');
                $(form.password).removeClass('invalid');
                if (!/^[A-Za-z0-9\-\_]{4,20}$/.test(form.username.value)) {
                    tips.html('用户名有误，请输入4-20位字母、数字或“-”、“_”字符').show();
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
                    tips.html('密码有误，请输入6-20位非空格字符').show();
                    $(form.password).css({
                        'border-color': '#db281f'
                    });
                    return;
                }
                request = new Ajax("/user/setIDAndPwd.htm", params);
                request.done(function (data) {
                    if (data.status === "200") {
                        info.close();
                        that.getUserInfo();
                        that.packageSuccessTips();
                        if (typeof callback === 'function') {
                            callback(args);
                        }
                    } else {
                        $(form.username).removeAttr('style');
                        $(form.password).removeAttr('style');
                        tips.html(data.errormsg).show();
                        
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
                        validateCode: $('#pl_imgCode').val()
                    },
                    request = new Ajax("/common/checkValidateCode4Img.htm", params);
                request.done(function (data) {
                   if (data.status === "200") {
                        $('#pl_imgCode').css({
                            'border-color': '#dddddd'
                        });
                        that.changeImageBox();
                        that.getPhoneCode($('#pl_imgCode').val());
                        that.startCountDown();
                    } else {
                        tips.html(data.errormsg).show();
                        $('#pl_imgCode').css({
                            'border-color': '#db281f'
                        });
                    } 
                });
            },

            startCountDown: function () {
                var that = this,
                    btn = $('#plb_getPhoneCode'),
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

            loginByPhone: function (callback, args) {
                var that = this,
                    form = document.forms.popuploginform,
                    tips = $('#ui-tips'),
                    params = {
                        phoneNo: form.telphone.value,
                        authCode: form.telCode.value
                    },
                    request = null;
                if (!form.telphone.value) {
                    tips.html('请填写手机').show();
                    return;
                } else if (!form.telCode.value) {
                    tips.html('请输入验证码').show();
                    return;
                }

                request = new Ajax("/user/loginByPhone.htm", params);
                request.done(function (data) {
                    if (data.status === "200") {
                        if (form.rememberme.checked) {
                            $.cookie('usertelphone', form.telphone.value, {expires: 7, path: '/'});
                        } else {
                            $.removeCookie('usertelphone', {path: '/'});
                        }

                        if (data.re.needSetPwd) {
                            info.close();
                            data.re.mobile = form.telphone.value;
                            that.packageSupplement(data.re, callback, args);
                        } else {
                            that.getUserInfo();
                            info.close();
                            if (typeof callback === 'function') {
                                callback(args);
                            }
                        }
                    } else {
                        tips.html(data.errormsg).show();
                        $(form.telphone).removeClass('invalid');
                        $(form.telCode).removeClass('invalid');
                    }
                });
            },

            loginPass: function (callback, args) {
                var that = this,
                    form = document.forms.popuploginform,
                    tips = $('#ui-tips'),
                    params = {
                        username: form.username.value,
                        password: form.password.value
                    },
                    request = null;
                if (!form.username.value) {
                    tips.html('请填写用户名').show();
                    $(form.username).css({
                        'border-color': '#db281f'
                    });
                    return;
                } else if (!form.password.value) {
                    tips.html('请填写密码').show();
                    $(form.password).css({
                        'border-color': '#db281f'
                    });
                    return;
                }

                request = new Ajax("/user/login.htm", params);
                request.done(function (data) {
                    if (data.status === "200") {
                        if (form.rememberme.checked) {
                            $.cookie('accountname', form.username.value, {expires: 7, path: '/'});
                        } else {
                            $.removeCookie('accountname', {path: '/'});
                        }
                        that.getUserInfo();
                        if (typeof callback === 'function') {
                            callback(args);
                        }
                        info.close();
                    } else {
                        $(form.username).removeAttr('style');
                        $(form.password).removeAttr('style');
                        tips.html(data.errormsg).show();
                        if (data.errorcode === "3001") {
                            $(form.username).css({
                                'border-color': '#db281f'
                            });
                        } else if (data.errorcode === "3119") {
                            $(form.password).css({
                                'border-color': '#db281f'
                            });
                        }
                    }
                });
            },

            loginOut: function () {
                var that = this,
                    request = new Ajax("/user/loginout.htm");
                request.done(function (data) {
                    if (data.status === "200") {
                            if (that.isOnBack()) {
                                that.delUserInfo();
                                that.changeStatus(false);
                                window.location.href = "/";
                            } else {
                                that.delUserInfo();
                                that.changeStatus(false);
                            }
                        }
                });
            },
            
            errorDialog: function (data, callback, args) {
                var that = this,
                    message = data.errormsg,
                    code = data.errorcode,
                    actions = [];
                if (code === "1034" || code === "3400" || code === "3000") {
                    this.delUserInfo();
                    this.changeStatus(false);
                    actions = [{
                            name: "重新登录",
                            callBack: function () {
                                dialog.close();
                                that.showLoginBox(callback, args);
                            }
                        }];
                    
                } else {
                    actions = [{
                            name: "确定",
                            callback: function () {
                                dialog.close();
                            }
                        }];
                }
                
                dialog.show({
                        content: message,
                        buttons: actions
                    });
            },

            isOnBack: function () {
                var i = 0,
                    url = window.location.href,
                    length = Common.BACKPAGE.length,
                    result = false;
                for (i = 0; i < length; i += 1) {
                    if (url.indexOf(Common.BACKPAGE[i]) !== -1) {
                        result = true;
                        break;
                    }
                }
                return result;
            },

            delUserInfo: function () {
                $.removeCookie('username', {path: '/'});
                $.removeCookie('id', {path: '/'});
            },

            setUserInfo: function (params) {
                var key = "";
                for (key in params) {
                    if (params.hasOwnProperty(key)) {
                        $.cookie(key, params[key], { expires: 7, path: '/'});
                    }
                }
            },

            getParams: function (seg) {
                if (window.location.search) {
                    var items = window.location.search.substring(1).split("&"),
                        params = {},
                        i = 0;
                    for (i = 0; i < items.length; i += 1) {
                        params[items[i].split('=')[0]] = items[i].split('=')[1];
                    }
                    if (params[seg]) {
                        return params[seg];
                    } else {
                        return "";
                    }
                } else {
                    return "";
                }
            },

            getAreaById: function (callback) {
                var that = this,
                    request = new Ajax('/area/getAreaById.htm');
                request.done(function (data) {
                    if (data.status === "200") {
                            callback(data.re);
                        } else {
                            callback({
                                "province": "440000",
                                "city": "440100",
                                "area": "440106"
                            });
                        }
                    }).fail(function (data) {
                        callback({
                            "province": "440000",
                            "city": "440100",
                            "area": "440106"
                        });
                    });
            },

            saveParams: function (data) {
                var key = "";
                for (key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (typeof data[key] === "object") {
                            $.removeCookie(key);
                            $.cookie(key, $.toJSON(data[key]));
                        } else {
                            $.cookie(key, data[key]);
                        }
                    }
                }
            },

            assist: function () {
                var btn = null,
                    html = '<div id="fixed_box" class="fixed_box">' +
                                '<a href="javascript:void(0);" id="qqTalk_fixed_btn_01">在线客服</a>' +
                                '<a href="javascript:void(0);" id="qqTalk_fixed_btn_02">意见反馈</a>' +
                                '<a id="topBtn" href="javascript:void(0);"><i class="icon"></i>顶部</a>' +
                            '</div>',
                    returnTop = function () {
                        var t = 0,
                            b = $(window).scrollTop(),
                            c = 0,
                            d = 360,
                            temp = 0,
                            easeInSine = function (x, t, b, c, d) {
                                if (c < b) {
                                    temp = c;
                                    c = b;
                                    b = temp;
                                    return c - (-c * Math.cos(t / d * (Math.PI / 2)) + c + b);
                                }
                                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
                            },
                            animate = function () {
                                if (t >= d) {
                                    $(window).scrollTop(c);
                                    $(this).css({
                                        'visibility': 'hidden'
                                    });
                                } else {
                                    $(window).scrollTop(easeInSine(0, t, b, c, d));
                                    setTimeout(animate, 30);
                                }
                                t += 30;
                            };
                        animate();
                    },
                    showTopBtn = function () {
                        if ($(this).scrollTop() > 0) {
                            btn.css({
                                'visibility': 'visible'
                            });
                        } else {
                            btn.css({
                                'visibility': 'hidden'
                            });
                        }
                    };
                $('body').append(html);
                btn = $('#topBtn');
                $(window).on('scroll', showTopBtn);
                btn.on('click', returnTop);
                showTopBtn.call(window);
            }
        };
        
        return new Common();
    });
}(window.define));