(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'handlebars',  'addrsCtrl', 'paginate', 'common', 'dialog', 'experts', 'serviceCtrl'], function ($, Handlebars,  addrsCtrl, Paginate, common, dialog, Experts, serviceCtrl) {
        
        function ServiceProvider() {
            this.paginate = null;
            this.init();
        }
        
        ServiceProvider.PROVINCE = common.getParams('province') * 1;
        ServiceProvider.CITY = common.getParams('city') * 1;
        ServiceProvider.AREA = common.getParams('area') * 1;
        ServiceProvider.ID = common.getParams('id') * 1;
        ServiceProvider.MAINCLASS = common.getParams('mainClass') * 1;
        ServiceProvider.SUBCLASS = common.getParams('subClass') * 1;
        ServiceProvider.SERVICEITEMLIST = [];
        ServiceProvider.QRYCONDITIONS = function () {
            var result = "",
                qrycondition = [],
                temp = {},
                temp_s = {},
                temp2 = {},
                items = [],
                i = 0,
                j = 0,
                iLength = 0,
                jLength = 0,
                value = "",
                li = null,
                options = $('#pb_options'),
                lis = options.children('li');
            ServiceProvider.SERVICEITEMLIST = [];
            lis.each(function (index) {
                temp = {};
                temp_s = {};
                li = $(this);
                temp.id = li.attr('id');
                temp_s.name = li.attr('data-name');
                temp_s.id = li.attr('id');
                items = li.find('li');
                temp.options = [];
                temp_s.options = temp.options;
                items.each(function (index) {
                    temp2 = {};
                    temp2.type = $(this).attr('data-type');
                    temp2.name = $(this).attr('data-name');
                    temp2.content = "";
                    $(this).find('input:checked').each(function (index) {
                        if (temp2.content) {
                            temp2.content += "," + this.value;
                        } else {
                            temp2.content = this.value;
                        }
                    });
                    temp.options.push(temp2);
                });
                qrycondition.push(temp);
                ServiceProvider.SERVICEITEMLIST.push(temp_s);
            });
            return $.toJSON({qrycondition: qrycondition});
        };
        
        
        ServiceProvider.prototype = {
            init: function () {
                var that = this,
                    expert = new Experts($('#expert_list'));
                this.registerHHelper();
                this.packageOptions();
                this.packageList();
                this.getServiceDetail();
                this.selectAction();
            },
            
            selectAction: function () {
                var that = this;
                common.getAreaById(function (data) {
                    var province = common.getParams('province') || data.province.toString(),
                        city = common.getParams('city') || data.city.toString(),
                        area = common.getParams('area') || data.area.toString();
                    $('#crumbs_pageName').html($.cookie('servicename') + ' <span>[' + addrsCtrl.qryName(province) + '][' + addrsCtrl.qryName(city) + '][' + addrsCtrl.qryName(area) + ']</span>');
                });
            },
            
            packageOptions: function () {
                var that = this,
                    html = "",
                    data = $.parseJSON($.cookie("specificationlist")),
                    line = $('#pb_queryprice_line'),
                    box = $('#pb_options'),
                    source = $('#options_template').html(),
                    template = Handlebars.compile(source);
                box.empty();
                if (data && data.length) {
                    box.show();
                    line.show();
                    html = template(data);
                    $(html).appendTo(box);

                    $('#pb_queryprice_btn').on('click', function ()　{
                        that.packageList();
                    });
                } else {
                    box.hide();
                    line.hide();
                }
                
                
            },
            
            registerHHelper: function () {
                Handlebars.registerHelper('currency', function (value) {
                    var values = value.match(/^(\d+)(\.\d+)?$/),
                        i = 0,
                        intagerStr = "",
                        length = values[1].length,
                        result = "",
                        time = Math.floor(length / 3);
                    
                    for (i = time; i >= 0; i -= 1) {
                        intagerStr = values[1].substring(length - (i + 1) * 3, length - i * 3);
                        if (intagerStr) {
                            result += intagerStr + (i === 0 ? "" : ",");
                        }
                    }
                    return result + (values[2] || "");
                });
                
                Handlebars.registerHelper('toJSON', function (value) {
                    return $.toJSON(value);
                });
                
                Handlebars.registerHelper('toScore', function (value) {
                    if (value < 0) {
                        return value.toString();
                    } else {
                        return "+" + value;
                    }
                });
                
                Handlebars.registerHelper('cutText', function (value) {
                    if (value.length > 156) {
                        return value.substr(0, 156) + "...";
                    } else {
                        return value;
                    }
                })
                
                Handlebars.registerHelper('toYuan', function (value) {
                    return value * 1;
                });
                
                Handlebars.registerHelper('compare', function (left, operator, right, options) {
                    if (arguments.length < 3) {
                        throw new Error('Handlerbars Helper "compare" needs 2 parameters');
                    }
                    var operators = {
                        '==': function (l, r) {
                            return l == r;
                        },
                        '===': function (l, r) {
                            return l === r;
                        },
                        '!=': function (l, r) {
                            return l != r;
                        },
                        '!==': function (l, r) {
                            return l !== r;
                        },
                        '<': function (l, r) {
                            return l < r;
                        },
                        '>': function (l, r) {
                            return l > r;
                        },
                        '<=': function (l, r) {
                            return l <= r;
                        },
                        '>=': function (l, r) {
                            return l >= r;
                        },
                        'typeof': function (l, r) {
                            return typeof l == r;
                        }
                    };

                    if (!operators[operator]) {
                        throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
                    }

                    var result = operators[operator](left, right);

                    if (result) {
                        return options.fn(this);
                    } else {
                        return options.inverse(this);
                    }
                });
            },
            
            getServiceDetail: function () {
                var that = this,
                    params = {
                        id: ServiceProvider.ID,
                        pcode: ServiceProvider.MAINCLASS,
                        ccode: ServiceProvider.SUBCLASS,
                        area: ServiceProvider.AREA,
                        city: ServiceProvider.CITY,
                        province: ServiceProvider.PROVINCE,
                        useragent: navigator.userAgent
                    };
                jQuery.ajax({
                    url: common.prefix + "service/qryServiceDetailByCode.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    success: function (data) {
                        if (data.status === "200") {
                            that.packageRelatedServices(data.re);
                            that.packageMajor(data.re);
                        } else {
                            
                        }
                    },
                    
                    error: function (data) {

                    }
                });
            },
            
            packageRelatedServices: function (data) {
                var html = "",
                    box = $('#other_service_list'),
                    items = data.relateservicegoods,
                    des = "",
                    i = 0,
                    length = data.relateservicegoods.length,
                    source = $('#other_service_template').html(),
                    template = Handlebars.compile(source);
                box.empty();
                
                if (length) {
                    for(i = 0; i < length; i += 1){
                        items[i].province = ServiceProvider.PROVINCE;
                        items[i].city = ServiceProvider.CITY;
                        items[i].district = ServiceProvider.AREA;
                        des = items[i].description.replace(/<\/?[A-Za-z]+>/g, "");
                        items[i].description = des.substr(0, 20) + "...";
                    }
                    html = template(items);
                    $(html).appendTo(box);
                    $('#other_service_box').show();
                } else {
                    $('#other_service_box').hide();
                }
            },
            
            packageMajor: function (data) {
                var items = data.tag,
                    box = $('#major_box'),
                    list = $('#mb_content'),
                    html = [],
                    i = 0,
                    length = items.length;
                if (length) {
                    list.empty();
                    for (i = 0; i < length; i += 1) {
                        html.push('<a href="/article/SearchArticleList.htm?querycondition=' + items[i] + '" target="_blank">' + items[i] + '</a>');
                    }
                    list.append(html.join(''));
                    box.show();
                } else {
                    box.hide();
                }
            },
            
            qryServiceProvider: function (paramsObj) {
                var that = this,
                    key = "",
                    params = {};
                for (key in paramsObj) {
                    params[key] = paramsObj[key];
                }
                delete params.func;
                $('#pbl_pager').hide();
                $.ajax({
                    url: common.prefix + "service/qryServiceProviders.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.writeList(data.re);
                            paramsObj.func(that.paginate, params.pageSize, params.pageNumber, data.re.totalPage);
                        }
                    },
                    error: function (data) {

                    }

                });
            },
            
            writeList: function (data) {
                var html = "",
                    box = $('#pb_list'),
                    source = $('#provider_list_template').html(),
                    template = Handlebars.compile(source);
                box.empty();
                html = template(data);
                $(html).appendTo(box);
                box.on('click', '.btn', function (event) {
                    common.saveParams({
                        serviceItemInfos: this.getAttribute('data-value'),
                        amount: this.getAttribute('data-amount'),
                        mainclass: ServiceProvider.MAINCLASS,
                        subclass: ServiceProvider.SUBCLASS,
                        servicerid: this.getAttribute('data-sericerid'),
                        servicername: this.getAttribute('data-name'),
                        serviceItemList: $.toJSON(ServiceProvider.SERVICEITEMLIST)
                    });
                    if (!$.cookie('username')) {
                        $.cookie('orderCommit', 'true');
                        common.showLoginBox();
                    } else {
                        window.location.href = "/app/order_commit.html";
                    }
                });
                $('#pbl_pager').show();
            },
            
            packageList: function () {
                var that = this;
                this.paginate = new Paginate({
                    position: "#pbl_pager",
                    anchorPoint: "header",
                    amount: 10,
                    currentPage: 1,
                    pages: 10,
                    data: {
                        area: ServiceProvider.AREA,
                        city: ServiceProvider.CITY,
                        province: ServiceProvider.PROVINCE,
                        id: ServiceProvider.ID,
                        qryConditions: ServiceProvider.QRYCONDITIONS,
                        pageSize: 10,
                        pageNumber: 1
                    },
                    invoke: function () {
                        that.qryServiceProvider.apply(that, arguments);
                    }
                });
            }
        };
        
        var serviceProvider = new ServiceProvider();
    });
}(window.requirejs));