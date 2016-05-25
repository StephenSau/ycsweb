(function (requirejs) {
    'use strict';
    requirejs(['addrsCtrl', 'jquery', 'handlebars', 'common'], function (addrsCtrl, $, Handlebars, common) {
        function ProviderDetail() {
            this.init();
        }
        
        ProviderDetail.PEOPLES = {
            "-1": "",
            "0": "1-10人",
            "1": "11-20人",
            "2": "21-50人",
            "3": "51-100人",
            "4": "101-300人",
            "5": "301-1000人",
            "6": "1000-5000人",
            "7": "5000-10000人",
            "8": "10000人以上"
        };
        
        ProviderDetail.prototype = {
            init: function () {
                this.getServicerDetail();
                $.fn.setText = function (value) {
                    this.html(value || "--");
                    return this;
                };
            },
            
            getServicerDetail: function () {
                var that = this,
                    params = {
                        servicerid: common.getParams('servicerid'),
                        agent: navigator.userAgent
                    };
                $.ajax({
                    url: "/servicer/queryServicerDetail.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.packagePage(data.re);
                        }
                    },
                    error: function (data) {

                    }

                });
            },
            
            packagePage: function (data) {
                var html = "",
                    box = $('#p_photo_list'),
                    source = $('#phote_list_template').html(),
                    template = Handlebars.compile(source),
                    items = data.photos.split("|"),
                    item = [],
                    i = 0,
                    temp = {},
                    length = 0,
                    photos = [];
                box.empty();
                for (i = 0, length = items.length; i < length; i += 1) {
                    if (items[i]) {
                        item = items[i].split(',');
                        temp = {};
                        temp.name = item[0];
                        temp.url = item[1];
                        photos.push(temp);
                    }
                }
                html = template(photos);
                $(html).appendTo(box);
                $('#p_name').empty().setText(data.name);
                
                if (data.accountant) {
                    $('#p_name').append('<i class="icon icon_acc"></i>');
                }
                
                if (data.taxation) {
                    $('#p_name').append('<i class="icon icon_tax"></i>');
                }
                if (data.logo) {
                    $('#p_logo').attr('src', data.logo);
                    $('#p_logoline').show();
                } else {
                    $('#p_logoline').hide();
                }
                
                $('#p_description').setText(data.description);
                $('#p_registedyear').setText(data.registedyear);
                $('#p_peoples').setText(ProviderDetail.PEOPLES[data.peoples]);
                $('#p_webcreateyear').setText(data.webcreateyear);
                $('#p_business').setText(data.business);
                data.advantage = data.advantage.replace(/\n/g, '<br/>');
                $('#p_advantage').setText(data.advantage);
                
                $('#p_fax').setText(data.fax);
                $('#p_zip').setText(data.zip);
                $('#p_address').setText(data.address);
                // Phoenix 150928：Remove vendor's homepage info
                // $('#p_website').setText(data.web);
                $('#p_customers_text').setText(data.customers);
                
                
            }
        };
        
        var providerDetail = new ProviderDetail();
    });
}(window.requirejs));