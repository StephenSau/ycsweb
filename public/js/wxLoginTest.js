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
                    state = common.getParams('state');

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
                    redirect_uri: "http://www.1caishui.com/app/wxLoginTest.html",
                    state: "STATE",
                    style: "black",
                    href: ""
                });
            },


            loginByWx: function (code, state) {
                var params = {
                    code: code,
                    state: state
                };
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
            }          
        };
        
        var login = new Login();
    });
}(window.requirejs));