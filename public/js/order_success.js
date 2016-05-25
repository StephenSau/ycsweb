(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'common', 'info', 'placeholder'], function ($, common, info) {
    	function OrderSuccess () {
            this.init();
        }

        OrderSuccess.prototype = {
            init: function () {
                if (document.getElementById('needSetPwd').value === "1") {
                    this.packageSupplement();
                }
            },

            packageSupplement: function () {
                var that = this,
                    html = [];
                html.push('<div class="ui-info-supplement">');
                html.push('<div class="sf_messageBox">');
                html.push('<p class="sf_iconLine"><span class="icon"></span></p>');
                html.push('<h3>提交成功！</h3>');
                if (document.getElementById('plainPassword').value !== "") {
                    html.push('<p class="sf_textLine">' + $('#contactsmobile').val() + ' 的手机用户，欢迎您登录壹财税网站！我们已为您自动生成用户名和密码：</p>');
                    html.push('<p class="sf_userLine"><span>用户名：' + $('#username').val() + '</span><span>密码：' + $('#plainPassword').val() + '</span><a href="javascript:;" id="sf_showForm">修改</a></p>');
                } else {
                    html.push('<p class="sf_textLine">' + $('#contactsmobile').val() + ' 的手机用户，欢迎您登录壹财税网站！为了保障您的账号安全，请设置用户名和密码：<a href="javascript:;" id="sf_showForm">设置</a></p>');
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
                    content: html.join('')
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

                    tips
                    
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
                            info.close();
                            common.getUserInfo();
                            that.packageSuccessTips();
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
            }
        };

        var orderSuccess = new OrderSuccess();
    });
}(window.requirejs));