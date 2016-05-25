<%@ page language="java" contentType="text/html; charset=utf-8"  pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>公司注册_工商注册_代理记账_一站式企业财税服务平台-壹财税</title>
    <meta name="keywords" content="公司注册,工商注册,代理记账,财税服务,纳税申报,会计培训,税务咨询,税收筹划,税务代理,税务咨询" />
    <meta name="description" content="壹财税 - 最任性的一站式企业财税服务电商平台，提供公司注册，代理记账，工商代理、税务代理、税务咨询，涉税鉴证，税收筹划，税务审计等财税服务，税收筹划、涉税的法律咨询、税收政策、税务知识、会计培训等服务。" />
    <link type="text/css" rel="stylesheet" href="http://static.ycs.com/public/css/service_detail.css" />
    <script charset="utf-8" src="http://wpa.b.qq.com/cgi/wpa.php"></script>
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?7f22c04f525c4961b0b57297567c105d";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
    <script type="text/javascript" src="http://cbjs.baidu.com/js/m.js"></script>

</head>
<body>
   <!-- header model start-->
    <div class="header">
        <div class="h_container">
            <ul class="h_leftside" id="h_status">
                <li><a href="/app/register.html" class="line">注册</a></li>
                <li class="h_noline"><a href="/app/login.html">登录</a></li>
            </ul>
            <ul class="h_rightside">
                <li class="line"><a href="/">壹财税首页</a></li>    
                <li class="line"><a id="qqTalk_header_btn_01" href="javascript:void(0);">在线客服</a></li>
                <li class="h_hassub">
                    <a href="javascript:;" id="h_showCodeBox">
                        <span class="icon_weixin"></span>
                    </a>
                    <a href="http://weibo.com/u/5514445672" target="_blank">
                        <span class="icon_weibo"></span>   
                    </a>
                    <div class="h_two_code_box" id="h_codeBox">
                        <p class="htcb_photeline">
                            <span>
                                <img src="../public/img/tdc_01.png" alt="" width="110" height="110" />
                                <em>官方微信服务号</em>
                            </span>
                            <span>
                                <img src="../public/img/tdc_02.png" alt="" width="110" height="110" />
                                <em>官方微信订阅号</em>
                            </span>
                        </p>
                        <p class="htcb_readme">专业财税资讯、优质财税服务，财税疑问在线解答，壹财税微信号帮到您</p>
                    </div>
                </li>
                <li class="h_hassub h_noline">
                    <a href="javascript:;" id="h_showMap">
                        <i class="icon_nav"></i>网站地图<i class="icon_arrow"></i>
                    </a>
                    <ul class="h_subbox" id="h_map">
                        <li><a href="/">首页</a></li>
                        <li><a href="/app/service_detail.html">财税服务</a></li>
                        <li class="h_noline"><a href="/article/indexList.htm">资讯</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <!-- header model end-->
    <!-- navigation model start-->
    <div class="nav">
       <div class="n_container">
           <h2 class="n_logo">
                <a href="/" title="壹财税-一站式财税服务平台">
                    <img src="../public/img/logo.png" width="230" height="30" alt="壹财税-一站式财税服务平台">
                </a>
            </h2>
            <ul >
                <li><a href="/">首页</a></li>
                <li><a class="active" href="/app/service_detail.html">财税服务</a></li>
                <li><a href="/article/indexList.htm">资讯</a></li>
            </ul>
            <div class="search_line">
                <form action="/article/SearchArticleList.htm" target="_blank" method="get">
                    <label for="headerSearch">搜索</label>
                    <input name="querycondition" id="headerSearch" type="text" maxlength="20" />
                </form>
            </div>
        </div>
    </div>
    <!-- navigation model end-->
    
    <div class="content">
        <div class="mside">
            <!--search box model start-->
            <div class="search_box">
                <ol>
                    <li>
                        <label>服务地区</label>
                        <span style="width:140px;" class="chosen sb_province"><span style="width:113px" class="chosen_facade"><em id="sb_province_text" class="chosen_selected_text">广东省</em><i class="chosen_arrow_icon"></i></span><select class="sb_province chosn_options" id="sb_province" name="province" data-target="sb_province_text">
                            
                        <option value="">请选择</option><option value="110000">北京市</option><option value="120000">天津市</option><option value="130000">河北省</option><option value="140000">山西省</option><option value="150000">内蒙古自治区</option><option value="210000">辽宁省</option><option value="220000">吉林省</option><option value="230000">黑龙江省</option><option value="310000">上海市</option><option value="320000">江苏省</option><option value="330000">浙江省</option><option value="340000">安徽省</option><option value="350000">福建省</option><option value="360000">江西省</option><option value="370000">山东省</option><option value="410000">河南省</option><option value="420000">湖北省</option><option value="430000">湖南省</option><option value="440000" selected="true">广东省</option><option value="450000">广西壮族自治区</option><option value="460000">海南省</option><option value="500000">重庆市</option><option value="510000">四川省</option><option value="520000">贵州省</option><option value="530000">云南省</option><option value="540000">西藏自治区</option><option value="610000">陕西省</option><option value="620000">甘肃省</option><option value="630000">青海省</option><option value="640000">宁夏回族自治区</option><option value="650000">新疆维吾尔自治区</option><option value="710000">台湾省</option><option value="810000">香港特别行政区</option><option value="820000">澳门特别行政区</option></select></span>
                        <span style="width:180px;" class="chosen sb_city"><span style="width:153px" class="chosen_facade"><em id="sb_city_text" class="chosen_selected_text">广州市</em><i class="chosen_arrow_icon"></i></span><select class="sb_city chosn_options" id="sb_city" name="city" data-target="sb_city_text">
                            
                        <option value="">请选择</option><option value="440100" selected="true">广州市</option><option value="440200">韶关市</option><option value="440300">深圳市</option><option value="440400">珠海市</option><option value="440500">汕头市</option><option value="440600">佛山市</option><option value="440700">江门市</option><option value="440800">湛江市</option><option value="440900">茂名市</option><option value="441200">肇庆市</option><option value="441300">惠州市</option><option value="441400">梅州市</option><option value="441500">汕尾市</option><option value="441600">河源市</option><option value="441700">阳江市</option><option value="441800">清远市</option><option value="441900">东莞市</option><option value="442000">中山市</option><option value="445100">潮州市</option><option value="445200">揭阳市</option><option value="445300">云浮市</option></select></span>
                        <span style="width:140px;" class="chosen sb_district"><span style="width:113px" class="chosen_facade"><em id="sb_district_text" class="chosen_selected_text">越秀区</em><i class="chosen_arrow_icon"></i></span><select class="sb_district chosn_options" id="sb_district" name="area" data-target="sb_district_text">
                            
                        <option value="">请选择</option><option value="440103">荔湾区</option><option value="440104" selected="true">越秀区</option><option value="440105">海珠区</option><option value="440106">天河区</option><option value="440111">白云区</option><option value="440112">黄埔区</option><option value="440113">番禺区</option><option value="440114">花都区</option><option value="440115">南沙区</option><option value="440117">从化区</option><option value="440118">增城区</option></select></span>
                    </li>
                    <li>
                        <label>主分类</label>
                        <p id="sb_mainclass"><a data-value="1100" href="javascript:;" class="active">新办企业</a>
        <a data-value="1200" href="javascript:;">企业变更/注销</a>
        <a data-value="2100" href="javascript:;">企业年报/年审</a>
        <a data-value="1400" href="javascript:;">会计服务</a>
        <a data-value="1500" href="javascript:;">税务服务</a>
        <a data-value="1600" href="javascript:;">审计/验资/评估</a>
        <a data-value="1700" href="javascript:;">行业资质/许可证</a>
        <a data-value="1800" href="javascript:;">商标/专利</a>
        <a data-value="1900" href="javascript:;">人力资源</a>
        <a data-value="2000" href="javascript:;">创业套餐</a></p>
                        <input type="hidden" id="sb_mainclassId" value="1100">
                    </li>
                    <li>
                        <label>二级分类</label>
                        <p id="sb_subclass"><a data-value="1101" href="javascript:;" class="active">企业注册</a>
        <a data-value="1103" href="javascript:;">社保及劳动证办理</a></p>
                        <input type="hidden" id="sb_subclassId" value="1101">
                    </li>
                    <li>
                        <label>服务名称</label>
                        <p id="sb_service"><a data-value="1" href="javascript:;" class="active">个体工商户注册</a>
        <a data-value="9" href="javascript:;">外商投资企业注册</a>
        <a data-value="10" href="javascript:;">外商代表处注册</a>
        <a data-value="115" href="javascript:;">个人独资企业注册</a>
        <a data-value="117" href="javascript:;">有限责任公司注册</a>
        <a data-value="118" href="javascript:;">合伙企业注册</a>
        <a data-value="121" href="javascript:;">股份有限公司注册</a></p>
                        <input type="hidden" id="sb_serviceId" value="1">
                    </li>
                </ol>
            </div>
            <!--search box model end-->
            
            <!--overview box model start-->
            <div id="overview_box" class="overview_box dn" style="display: block;">
                <h1 id="ob_title">个体工商户注册<span>[广东省][广州市][越秀区]</span></h1>
                
                <!--share start-->
                <div data-tag="share_1" class="ob_shareline bdsharebuttonbox bdshare-button-style0-16" data-bd-bind="1442304069010">
                    <span>分享到</span>
                    <a data-cmd="weixin" class="bds_weixin" href="#" title="分享到微信"></a>
                    <a data-cmd="sqq" class="bds_sqq" href="#" title="分享到QQ好友"></a>
                    <a data-cmd="tsina" class="bds_tsina" href="#" title="分享到新浪微博"></a>
                    <a data-cmd="copy" class="bds_copy" href="#" title="分享到复制网址"></a>
                    <a data-cmd="more" class="bds_more" href="#"></a>
                </div>
                <!--share end-->
                <!--<p class="ob_shareline">分享到</p>-->
                <div class="ob_contextLine">
                    <div class="ob_outerBox">
                        <img width="145" height="145" src="http://fs.1caishui.com/admin/serviceicon/201508/00000001/247c27ff70.png" alt="图片" id="ob_img">
                    </div>
                    <div class="ob_content" id="ob_conent"><p>从事工商业经营的自然人或家庭，依法通过工商行政管理部门登记，从事工商业经营的，为个体工商户。经营规模大、实力雄厚的“个体工商户”，即使已经形成小型企业的稳定规模，但只要没有注册公司，在统计意义仍定性为个体工商户，可以继续享受国家给予个体工商户的优惠政策。</p></div>
                    <p id="ob_showmoreline" class="ob_showmoreline" style="display: none;"><a href="javascript:;" id="ob_showmore">查看更多</a></p>
                </div>
                <p class="ob_btnline"><a class="btn btn_warning" href="/app/service_provider.html?province=440000&amp;city=440100&amp;area=440104&amp;mainClass=1100&amp;subClass=1101&amp;id=1" id="ob_provider_btn">查看服务商</a></p>
            </div>
            <!--overview box model end-->
            <!-- tab plugin start-->
            <div id="tab_position" class="tab_position dn" style="display: block;">
                <div id="tabOuter" class="tab_outer affix">  
                    <ul id="tabNav" class="tab">
                        <li class=""><a href="#tranc_step_box">办理步骤</a></li>
                        <li class=""><a href="#tranc_condition_box">办理条件</a></li>
                        <li class=""><a href="#tranc_time_box">办理时间</a></li>
                        <li class="active"><a href="#tranc_material_box">所需资料</a></li>
                        <li><a href="#tranc_notice_box">注意事项</a></li>
                        <li id="tab_showCommonBtn"><a href="#common_quest_box">常见问题</a></li>
                        <li id="tab_showNewsBtn"><a href="#news_box">相关资讯</a></li>
                        <li><a id="tab_provider_btn" class="tab_link" href="/app/service_provider.html?province=440000&amp;city=440100&amp;area=440104&amp;mainClass=1100&amp;subClass=1101&amp;id=1">服务商</a></li>
                    </ul>
                </div> 
            </div>
            
            <!-- tab plugin end-->
            
            <div id="transaction_box" class="transaction_box dn" style="display: block;"><div id="tranc_step_box" class="tranc_step_box">
            <h3>办理步骤</h3>
                <h4>个体工商户注册</h4>
                <ol>
                    <li>
                        <p><i class="icon">01</i>名称核准</p>
                    </li>

                    <li>
                        <p><i class="icon">02</i>办理营业执照</p>
                    </li>

                    <li>
                        <p><i class="icon">03</i>刻制公章</p>
                    </li>

                    <li>
                        <p><i class="icon">04</i>办理国、地税税务登记证及组织机构代码证</p>
                    </li>

                    <li>
                        <p><i class="icon">05</i>开办银行基本户</p>
                    </li>

                    <li>
                        <p><i class="icon">06</i>办结</p>
                    </li>

                </ol>
        </div>

        <div id="tranc_condition_box" class="tranc_condition_box">
            <h3>办理条件</h3>
            <ol>
                <li><i class="icon">01</i>经营者应当持所在地户籍证明及其他有关证明</li>
                <li><i class="icon">02</i>有一年以上租赁合同，且所租房屋符合使用规定</li>
            </ol>
        </div>

        <div id="tranc_time_box" class="tranc_time_box">
            <h3>办理时间</h3>
            <p>约15天</p>
        </div>   

        <div id="tranc_material_box" class="tranc_material_box">
            <h3>所需资料</h3>
            <ol>
                <li>1、个体户名称</li>
                <li>2、经营范围</li>
                <li>3、经营者或法人身份证原件</li>
                <li>4、注册资金金额</li>
                <li>5、经营地址</li>
            </ol>
        </div>   

        <div id="tranc_notice_box" class="tranc_notice_box">
            <h3>注意事项</h3>
            <ol>
                <li>
                    <i class="icon">01</i>
                    银行开户:选择不同银行开户，开户费用及所含服务均有差异，具体细节以银行要求为准
                </li>
                <li>
                    <i class="icon">02</i>
                    国地税报到:企业开业从取得税务登记证之日起一个月内要到税务所专管员处申请税种核定，如半年之内仍未申请核定或已申请核定未购买发票的企业税务部门有权将其列入非正常户，并以行政处罚
                </li>
                <li>
                    <i class="icon">03</i>
                    个体户税务征收方式:个体户税务缴纳方式分为“核定征收”、“查账征收”两种，一般个体户实行“核定征收”方式较多。
                </li>
                <li>
                    <i class="icon">04</i>
                    个体企业设立后，不得中途变更经营者:
                </li>
                <li>
                    <i class="icon">05</i>
                    房屋注册备案:房屋注册备案主要取决于街道办对房子的定性，注册前须向街道办了解清楚您的注册地址是否能用作备案注册公司及可以用途情况。
                </li>
                <li>
                    <i class="icon">06</i>
                    企业核名:使用非常见的文字能有效提高名字通过率。如果名称由“ABC”组成，则“AB”与“BC”组合需同时满足不重名的条件下，“ABC”方能定义为不重名。
                </li>
                <li>
                    <i class="icon">07</i>
                    基本户开通:基本户的开通应该以方便日常收付为主，尽量选择与日常生活距离较近的银行开户。目前，民生银行基本户办理手续费全免。
                </li>
                <li>
                    <i class="icon">08</i>
                    注册地址:1、注册地址必须具备商业用途
2、地址用途与行业特质相匹配，如制造业需要有厂房，大型医疗器械需要有一定面积的仓库
3、承租人信息需为法人或股东之一
                </li>
                <li>
                    <i class="icon">09</i>
                    经营场所证明:房产证或产权证明、购房合同、规划验收证明、规划许可证、部队院校房管部门证明、村民委员会（街、镇）证明或能证明房产的有关证明及租赁合同]
                </li>
                <li>
                    <i class="icon">10</i>
                    特许经营项目:公司申请登记的经营范围中有法律、行政法规和国务院决定规定报批的项目，在公司开展的经营活动涉及该项目时需先办理该项目的批准文件或者许可证书或许可证明文件
                </li>
            </ol>
        </div>
        <p class="tranc_btnline"><a class="btn btn_warning" id="tranc_provider_btn" href="/app/service_provider.html?province=440000&amp;city=440100&amp;area=440104&amp;mainClass=1100&amp;subClass=1101&amp;id=1">查看服务商</a></p></div>
            
            <!--common question model start-->
            <div id="common_quest_box" class="common_quest_box" style="display: none;">
                <h3>常见问题</h3>
                <ul id="cqb_list"><li>
                <h4>注册地址备案有何特殊情况？</h4>
                <p>1、自有房屋(有产权证，可以自由上市交易)给自己的公司使用，需要出具一份无偿借用给公司使用的证明书，只需缴纳印花税即可，无需缴纳租赁税
2、属于临时建筑的房屋(无产权证，或者属于小产权房，房屋属集体所有或者自建房屋)，只能做临时商用，用此类地址注册公司营业执照是有期限的，并且在备案的时候需要出具《房屋安全鉴定书》《临时经营场所使用证明》
3、房子注册备案主要取决于街道办对房子的定性，注册前须向街道办了解清楚您的注册地址是否能用作备案注册公司及可以用途情况</p>
            </li>
            <li>
                <h4>判定房屋合法来源的材料有那些？</h4>
                <p>1、《接管房地产通知书》(直管房提供)
2、《房地产权属证明书》
3、《临时建筑同意保留使用证明》
4、《房屋拆迁补偿协议书》和房屋拆迁单位通知被拆迁人的《交付使用通知》(收楼文件)
5、《军队房地产租赁许可证》
6、《宅基地证》
7、开发商出租新建房屋，合法权属资料包括：
  (a)《国有土地使用权证》或《建设用地批准书》
  (b)《国有土地使用权出让合同》和已缴交全部土地出让金的发票
  (c)竣工验收(质量、规划、消防)合格的文件
  (d)《产权具结书》
8、经广州市房地产交易所登记所鉴证的《商品房买卖合同》和建设单位通知购房人的《交付使用通知》(收楼文件)
9、街道办事处或镇政府审批的房屋报建批文和《农村居民住宅建设用地批准书》
10、其他证明房屋来源的有效证明</p>
            </li>
            <li>
                <h4>哪些名字不能作为字号？</h4>
                <p>1、有损于国家、社会公共利益的
2、违反社会公序良俗，不尊重民族、宗教习俗的
3、可能对公众造成欺骗或者误解的
4、外国国家(地区)名称、国际组织名称
5、党名称、党政军机关名称、群众组织名称、社团组织名称及其简称、部队番号
6、“中国”、“中华”、“全国”、“国家”、“国际”字词，县级以上行政区划不得用作字号
7、汉语拼音、字母、外国文字、标点符号
8、不符合国家规范的语言文字
9、法律、法规规定禁止的其他内容和文字</p>
            </li>
            <li>
                <h4>新公司如何购买发票？</h4>
                <p>1、 核定税种：即根据您办理税务登记时提供的资料和实地调查的结果，核定您的应纳税税种。这是购买发票之前的最重要的一个环节
注：需法人、财务一同至税务专管员处进行办理，税务专管员的联系方式通常由代理公司告知
2、办税员培训：办税员为企业日后购买发票、保管发票的重要人员，对发票的遗失等事项负相应责任
备注：培训后七个工作日至相关税务部门取办税员联系卡
3、发票申请：向税务部门提出发票申请，并获批准，是购买发票的前提条件
注：一般情况下申请后七个工作日可以购买发票
4、购买发票：带上发票购买本，标注印鉴的地方都需盖好相应的印鉴章，填妥发票领用申请单</p>
            </li></ul>
                <div id="cqbl_pager"></div>
            </div>
            <!--common question model end-->
            
            <!-- news list model start-->
            <div id="news_box" class="news_list_box news_hidden news_special" style="display: none;">
                <h3>相关资讯</h3>
                <p class="nl_moreLine">
                    <a href="/article/indexList.htm">更多&gt;&gt;</a>
                </p>
                <ul id="nl_list"><li>
            <h4><i class="icon"></i><a href="/article/qryArticleById?id=1283">明确了！三证合一后新企业不用再办税务登记证，过渡期内旧证继续有效！</a></h4>
            <p>根据有关工作部署，2015年10月1日要在全国全面推行“三证合一、一照一码”登记改革。国家税务总局日前发布《关于落实“三证合一”登记制度改革的通知》（税总函〔2015〕482号，以下简称《通知》），就相关事项进行了明确，要求切实做好“三证合一”工作衔接。</p>
        </li>
       <li>
            <h4><i class="icon"></i><a href="/article/qryArticleById?id=1269">国家税务总局关于落实“三证合一”登记制度改革的通知</a></h4>
            <p></p>
        </li>
       <li>
            <h4><i class="icon"></i><a href="/article/qryArticleById?id=1193">工商总局公布《企业经营范围登记管理规定》， 10月1日起施行</a></h4>
            <p>国家工商总局官网今天正式对外公布了修改后的《企业经营范围登记管理规定》（国家工商行政管理总局令第76号，以下简称76号令），并将自2015年10月1日起施行。据了解，此次修订是按照推进工商登记制度改革和工商登记制度便利化，进一步放宽工商登记条件的原则进行的。</p>
        </li>
       <li>
            <h4><i class="icon"></i><a href="/article/qryArticleById?id=930">公司、工厂、企业会计做账常识</a></h4>
            <p>除现金账、银行存款账、总账外，至少要一本三栏式账(登录往来等科目)、费用账(即多栏账，十七或十三栏都可以)，如固定资产多，还应有专用的固定资产账本，如果是制造企业，还应有生产成本账。</p>
        </li>
       <li>
            <h4><i class="icon"></i><a href="/article/qryArticleById?id=908">小微企业减免税新规具体实施办法出台 所得税这样算!</a></h4>
            <p>“大众创业、万众创新”正不断推进，8月19日的国务院常务会议又决定，将对小型微利企业减半征收企业所得税的年应纳税所得额上限由20万元提升30万元。</p>
        </li></ul>
                <div id="nl_pager"><p class="paginate"><span><a gotopage="1" class="p-prev-btn p-disabled" href="#news_box">&lt;上一页</a><a gotopage="1" class="p-num p-selected" href="#news_box">1</a><a gotopage="2" class="p-num" href="#news_box">2</a><a gotopage="3" class="p-num" href="#news_box">3</a><a gotopage="2" class="p-next-btn ">下一页&gt;</a></span></p></div>
            </div>
            <!-- news list model end-->
            
            <div id="noResult" class="no_result_line news_hidden" style="display: none;">
                <p><img width="61" height="58" class="icon" alt="" src="../public/img/imgPlaceholder_transparent.png"></p>
                <p id="noResultText">非常抱歉给您带来不愉快的体验，如果没找到您要的答案，也可以先咨询下客服哦！</p>
                <p>
                    <a class="btn btn_warning" id="noResultBtn" onclick="document.getElementById('qqTalk_header_btn_01').click()" href="javascript:;">联系客服</a>
                </p>
            </div>
            
            <!--flow modal start-->
            <div class="flow_box">
                <h3>壹财税服务购买流程</h3>
                <table>
                    <tbody><tr>
                        <td>浏览服务介绍</td>
                        <td><i class="icon"></i></td>
                        <td>选定服务商<br>并下单</td>
                        <td><i class="icon"></i></td>
                        <td>商家与您联系<br>沟通服务细则</td>
                        <td><i class="icon"></i></td>
                        <td>支付款项</td>
                        <td><i class="icon"></i></td>
                        <td>商家为您提供<br>高质量服务</td>
                        <td><i class="icon"></i></td>
                        <td>服务完成</td>
                        <td><i class="icon"></i></td>
                        <td>对服务进行评分</td>
                    </tr>
                </tbody></table>
            </div>
            <!--flow modal end-->
            
            <!-- order service model start-->
            <div class="order_service_box">
                <p>没有找到合适的服务商，直接发个定制服务需求让专业顾问为您推荐服务商？</p>
                <form id="orderForm" method="post" name="orderForm" action="/service/orderServiceGoods">
                    <ol>
                        <li>
                            <label>服务分类</label>
                            <span style="width:100px;" class="chosen osb_mainclass"><span style="width:73px" class="chosen_facade"><em id="osb_mainclass_text" class="chosen_selected_text">新办企业</em><i class="chosen_arrow_icon"></i></span><select data-rule="checkEmpty" class="osb_mainclass chosn_options" id="osb_mainclass" name="pcode" data-target="osb_mainclass_text">
                                
                            <option value="">请选择</option><option value="1100" selected="true">新办企业</option><option value="1200">企业变更/注销</option><option value="2100">企业年报/年审</option><option value="1400">会计服务</option><option value="1500">税务服务</option><option value="1600">审计/验资/评估</option><option value="1700">行业资质/许可证</option><option value="1800">商标/专利</option><option value="1900">人力资源</option><option value="2000">创业套餐</option></select></span><span style="width:130px;" class="chosen osb_subclass"><span style="width:103px" class="chosen_facade"><em id="osb_subclass_text" class="chosen_selected_text">企业注册</em><i class="chosen_arrow_icon"></i></span><select data-rule="checkEmpty" class="osb_subclass chosn_options" id="osb_subclass" name="ccode" data-target="osb_subclass_text">
                                
                            <option value="">请选择</option><option value="1101" selected="true">企业注册</option><option value="1103">社保及劳动证办理</option></select></span>
                            
                        </li>
                        <li>
                            <label>服务地区</label>
                            <span style="width:82px;" class="chosen osb_province"><span style="width:55px" class="chosen_facade"><em id="osb_province_text" class="chosen_selected_text">广东省</em><i class="chosen_arrow_icon"></i></span><select data-rule="checkEmpty" class="osb_province chosn_options" id="osb_province" name="province" data-target="osb_province_text">
                                
                            <option value="">请选择</option><option value="110000">北京市</option><option value="120000">天津市</option><option value="130000">河北省</option><option value="140000">山西省</option><option value="150000">内蒙古自治区</option><option value="210000">辽宁省</option><option value="220000">吉林省</option><option value="230000">黑龙江省</option><option value="310000">上海市</option><option value="320000">江苏省</option><option value="330000">浙江省</option><option value="340000">安徽省</option><option value="350000">福建省</option><option value="360000">江西省</option><option value="370000">山东省</option><option value="410000">河南省</option><option value="420000">湖北省</option><option value="430000">湖南省</option><option value="440000" selected="true">广东省</option><option value="450000">广西壮族自治区</option><option value="460000">海南省</option><option value="500000">重庆市</option><option value="510000">四川省</option><option value="520000">贵州省</option><option value="530000">云南省</option><option value="540000">西藏自治区</option><option value="610000">陕西省</option><option value="620000">甘肃省</option><option value="630000">青海省</option><option value="640000">宁夏回族自治区</option><option value="650000">新疆维吾尔自治区</option><option value="710000">台湾省</option><option value="810000">香港特别行政区</option><option value="820000">澳门特别行政区</option></select></span><span style="width:82px;" class="chosen osb_city"><span style="width:55px" class="chosen_facade"><em id="osb_city_text" class="chosen_selected_text">广州市</em><i class="chosen_arrow_icon"></i></span><select data-rule="checkEmpty" class="osb_city chosn_options" id="osb_city" name="city" data-target="osb_city_text">
                                
                            <option value="">请选择</option><option value="440100" selected="true">广州市</option><option value="440200">韶关市</option><option value="440300">深圳市</option><option value="440400">珠海市</option><option value="440500">汕头市</option><option value="440600">佛山市</option><option value="440700">江门市</option><option value="440800">湛江市</option><option value="440900">茂名市</option><option value="441200">肇庆市</option><option value="441300">惠州市</option><option value="441400">梅州市</option><option value="441500">汕尾市</option><option value="441600">河源市</option><option value="441700">阳江市</option><option value="441800">清远市</option><option value="441900">东莞市</option><option value="442000">中山市</option><option value="445100">潮州市</option><option value="445200">揭阳市</option><option value="445300">云浮市</option></select></span>
                            
                        </li>
                        <li>
                            <input type="text" maxlength="10" data-rule="checkEmpty" placeholder="您的称呼" class="osb_name" name="title">
                        </li>
                        <li>
                            <input type="text" maxlength="11" data-rule="checkTelphone" placeholder="手机号码" class="osb_phone" name="tel">
                        </li>
                        <li class="osb_textarealine">
                            <textarea maxlength="250" data-rule="checkEmpty" rows="10" cols="30" placeholder="请在此填写您的服务需求，专属交易顾问将在20分钟内响应您的需求并与您联系" name="comments"></textarea>
                        </li>
                        <li class="osb_btnline"><button class="btn btn_warning" type="submit">立即预约</button></li>
                    </ol>
                </form>
            </div>
            <!-- order service model end-->
        </div>
        <div class="aside">
           <div class="pad05">
               
<script type="text/javascript">BAIDU_CLB_fillSlot("1125126");</script><div id="BAIDU_DUP_wrapper_1125126_0"><iframe width="210" height="165" frameborder="0" style="border:0; vertical-align:bottom; margin:0; display:block;" marginheight="0" marginwidth="0" scrolling="no" allowtransparency="true" hspace="0" vspace="0" onload="BAIDU_DUP_CLB_renderFrame('1125126_0')" src="about:blank" id="baidu_clb_slot_iframe_1125126_0"></iframe></div><script src="http://cb.baidu.com/ecom?di=1125126&amp;dcb=BAIDU_DUP_define&amp;dtm=BAIDU_DUP2_SETJSONADSLOT&amp;dbv=0&amp;dci=0&amp;dri=0&amp;dis=0&amp;dai=1&amp;dds=&amp;drs=1&amp;dvi=1442225175&amp;ltu=http%3A%2F%2Fwww.1caishui.com%2Fapp%2Fservice_detail.html%23news_box&amp;liu=&amp;ltr=&amp;lcr=&amp;ps=134x1310&amp;psr=1920x1080&amp;par=1858x1080&amp;pcs=1841x621&amp;pss=1841x894&amp;pis=-1x-1&amp;cfv=18&amp;ccd=24&amp;chi=44&amp;cja=false&amp;cpl=21&amp;cmi=31&amp;cce=true&amp;col=zh-CN&amp;cec=UTF-8&amp;cdo=-1&amp;tsr=21&amp;tlm=1442219680&amp;tcn=1442304068&amp;tpr=1442304067981&amp;dpt=none&amp;coa=&amp;dpr=1&amp;ti=%E5%85%AC%E5%8F%B8%E6%B3%A8%E5%86%8C_%E5%B7%A5%E5%95%86%E6%B3%A8%E5%86%8C_%E4%BB%A3%E7%90%86%E8%AE%B0%E8%B4%A6_%E4%B8%80%E7%AB%99%E5%BC%8F%E4%BC%81%E4%B8%9A%E8%B4%A2%E7%A8%8E%E6%9C%8D%E5%8A%A1%E5%B9%B3%E5%8F%B0-%E5%A3%B9%E8%B4%A2%E7%A8%8E&amp;baidu_id=" charset="utf-8"></script><script src="http://dup.baidustatic.com/painter/clb/fixed7o.js" charset="utf-8"></script>
           </div>
            <!-- hot line model start -->
            <div class="hot_line_box">
                <h3><i></i>客服热线</h3>
                <p>4008-310-866</p>
            </div>
            <!-- hot line model start -->
            
            <!--other service model start-->
            <div id="other_service_box" class="other_service_box" style="display: block;">
                <h3>相关服务</h3>
                <ul id="other_service_list"><li>
            <h4>
                <a title="外商投资企业注册" href="/app/service_detail.html?firstclass=1100&amp;secondclass=1101&amp;serviceid=9&amp;province=440000&amp;city=440100&amp;district=440104">外商投资企业注册</a>
            </h4>
            <p>
                <a title="外商投资企业注册" href="/app/service_detail.html?firstclass=1100&amp;secondclass=1101&amp;serviceid=9&amp;province=440000&amp;city=440100&amp;district=440104"><img width="55" height="55" alt="外商投资企业注册" src="http://fs.1caishui.com/admin/serviceicon/201508/00000001/2469e1edfc.png"></a>
            </p>
            <p class="ost_intro">在中国境内设立的，由中国投资者和外国投资...</p>
        </li></ul>
            </div>
            <!--other service model end-->
            
            <!--expert model start-->
            <div class="expert_box">
                <h3>专家服务</h3>
                <ul id="expert_list"><li><h4><a data-value="10001" data-role="detialBtn" href="javascript:;">朱旭超</a></h4><p><span><a data-value="10001" data-role="detialBtn" href="javascript:;"><img width="86" height="110" src="../public/img/expert_01.jpg"></a><a data-value="10001" data-role="dialBtn" class="btn btn_info" href="javascript:;">立即咨询</a></span>工商税务专家，从事工商代理行业9年，为上千家的企业提供过工商财务代理和咨询服务，受到客户的高度好评。对工商疑难、涉税疑难等有独特处理方式，为广大企业家、创业者、工商个体户等提供权威、快捷、诚挚服务。</p></li><li><h4><a data-value="10002" data-role="detialBtn" href="javascript:;">曾超羡</a></h4><p><span><a data-value="10002" data-role="detialBtn" href="javascript:;"><img width="86" height="110" src="../public/img/expert_02.jpg"></a><a data-value="10002" data-role="dialBtn" class="btn btn_info" href="javascript:;">立即咨询</a></span>财税专家，从事会计行业13年，具有深厚的税收和会计理论及实践基础，专于纳税筹划、征税报税、税务稽查、避税与反避税、纳税管理、税收实务等方面。为众多知名大型公司的税务管理提供专业权威的意见，其中涵括了集团企业、涉外企业和民营企业。拥有多年行业经验的优秀服务团队，企业服务数量破万。</p></li><li><h4><a data-value="10005" data-role="detialBtn" href="javascript:;">夏小妹</a></h4><p><span><a data-value="10005" data-role="detialBtn" href="javascript:;"><img width="86" height="110" src="../public/img/expert_05.jpg"></a><a data-value="10005" data-role="dialBtn" class="btn btn_info" href="javascript:;">立即咨询</a></span>财税专家，从事审计工作十余年，多次带领审计团队参与各类企业大型审计项目。多年参与政府部门委托的对各行政事业单位的审计，担任过企业财务顾问、税务咨询等工作。 担任过财务、税务培训讲师，为企业财务人员提供有关税法知识的培训讲座与对行政事业单位清产核资工作的培训讲座。</p></li></ul>
            </div>
            <!--expert model end-->
            
            <!--major model start-->
            <div id="major_box" class="major_box" style="display: block;">
                <h3>名词解释</h3>
                <p id="mb_content"><a target="_blank" href="/article/SearchArticleList.htm?querycondition=公司注册">公司注册</a><a target="_blank" href="/article/SearchArticleList.htm?querycondition=个体工商户注册">个体工商户注册</a></p>
            </div>
            <!--major model end-->
            
        </div>
    </div>
    
    <!--footer model start-->
    <div class="footer">
        <p class="f_readme">除特别注明外，作品版权归壹财税所有。如果无意之中侵犯了您的权益，请来信告知，本站将在三个工作日内做出处理</p>
        <p class="f_map">
            <a href="/app/about.html" title="关于我们" target="_blank">关于我们</a> |
            <a href="/app/team.html" title="团队介绍" target="_blank">团队介绍</a> |
            <a href="/app/jobs.html" title="人才招聘" target="_blank">人才招聘</a> |
            <a href="/app/chronicle.html" title="大事记" target="_blank">大事记</a> |
            <a href="/app/contact.html" title="联系我们" target="_blank">联系我们</a> |
            <a href="/app/aptitude.html" title="资质文件" target="_blank">资质文件</a> |
            <a href="/app/exempt.html" title="免责申明" target="_blank">免责申明</a>
        </p>
        <p class="f_copyright">壹财税 版权所有 Copyright © 2015 www.1caishui.com All Rights Reserved   粤ICP备15017127号-1</p>
    </div>
    <!--footer model end-->
    <script type="text/x-handlebars-templatg" id="choice_template">
        {{#if this.length}}
        {{#each this}}
        <a href="javascript:;" data-value="{{code}}" {{#if active}} class="active"{{/if}}>{{name}}</a>
        {{/each}}
        {{else}}
        <span>无选项</span>
        {{/if}}
    </script>
    
    <script type="text/x-handlebars-temlate" id="transaction_template">
        <div class="tranc_step_box" id="tranc_step_box">
            <h3>办理步骤</h3>
            {{#if servicesteps.length}}
                {{#each servicesteps}}
                <h4>{{name}}</h4>
                <ol>
                    {{#each stepdetail}}
                    <li>
                        <p><i class="icon">{{formatIndex @index}}</i>{{this}}</p>
                    </li>

                    {{/each}}
                </ol>
                {{/each}}
            {{else}}
            <p>暂无相关信息</p>
            {{/if}}
        </div>

        <div class="tranc_condition_box" id="tranc_condition_box">
            <h3>办理条件</h3>
            {{#if conditions.length}}
            <ol>
                {{#each conditions}}
                <li><i class="icon">{{formatIndex @index}}</i>{{this}}</li>
                {{/each}}
            </ol>
            {{else}}
            <p>暂无相关信息</p>
            {{/if}}
        </div>

        <div class="tranc_time_box" id="tranc_time_box">
            <h3>办理时间</h3>
            {{#if days}}
            <p>{{days}}</p>
            {{else}}
            <p>暂无相关信息</p>
            {{/if}}
        </div>   

        <div class="tranc_material_box" id="tranc_material_box">
            <h3>所需资料</h3>
            {{#if documents.length}}
            <ol>
                {{#each documents}}
                <li>{{addOne @index}}、{{this}}</li>
                {{/each}}
            </ol>
            {{else}}
            <p>暂无相关信息</p>
            {{/if}}
        </div>   

        <div class="tranc_notice_box" id="tranc_notice_box">
            <h3>注意事项</h3>
            {{#if specials.length}}
            <ol>
                {{#each specials}}
                <li>
                    <i class="icon">{{formatIndex @index}}</i>
                    {{name}}:{{description}}
                </li>
                {{/each}}
            </ol>
            {{else}}
            <p>暂无相关信息</p>
            {{/if}}
        </div>
        <p class="tranc_btnline"><a href="#" id="tranc_provider_btn" class="btn btn_warning">查看服务商</a></p>
    </script>
    <script type="text/x-handlebars-template" id="common_quest_template">
        {{#if commonproblems.length}}
            {{#each commonproblems}}
            <li>
                <h4>{{name}}</h4>
                <p>{{description}}</p>
            </li>
            {{/each}}
        {{else}}
            <li><p>暂无相关信息</p></li>
        {{/if}}
   </script>
   <script type="text/x-handlebars-template" id="major_template">
        {{#each tag}}
        <a href="/article/SearchArticleList.htm?querycondition={{this}}">{{this}}</a>
        {{/each}}
   </script>
   <script type="text/x-handlebars-template" id="news_template">
       {{#if articles.length}}
       {{#each articles}}
       <li {{#if image}}class="nlb_photoline"{{/if}}>
            <h4><i class="icon"></i><a href="/article/qryArticleById?id={{id}}">{{title}}</a></h4>
            <p>{{#if image}}<a href="/article/qryArticleById?id={{id}}"><img width="160" height="114" src="../public/img/ad_02.jpg"></a>{{/if}}{{abstract}}</p>
        </li>
        {{/each}}
        {{else}}
        <li><p>暂无相关信息</p></li>
        {{/if}}
   </script>
    <script type="text/x-handlebars-template" id="other_service_template">
        {{#each this}}
        <li>
            <h4>
                <a href="/app/service_detail.html?firstclass={{pcode}}&secondclass={{ccode}}&serviceid={{id}}&province={{province}}&city={{city}}&district={{district}}" title="{{name}}">{{name}}</a>
            </h4>
            <p>
                <a href="/app/service_detail.html?firstclass={{pcode}}&secondclass={{ccode}}&serviceid={{id}}&province={{province}}&city={{city}}&district={{district}}" title="{{name}}"><img src="{{cover}}" alt="{{name}}" width="55" height="55"></a>
            </p>
            <p class="ost_intro">{{description}}</p>
        </li>
        {{/each}}
    </script>
    <script type="text/javascript" src="http://tajs.qq.com/stats?sId=49998824" charset="UTF-8"></script>
    <script type="text/javascript"  src="http://static.ycs.com/public/js/vendor/require.js"></script>
    <script type="text/javascript" src="http://static.ycs.com/public/js/config.js"></script>
    <script type="text/javascript" src="http://static.ycs.com/public/js/service_detail.js"></script>
    <script type="text/javascript">
        window._bd_share_config = {
            "common": {
                "bdSnsKey": {},
                "bdMini": "2",
                "bdMiniList": false,
                "bdStyle": "0",
                "bdSize": "16"
            },
            "share": [{
                "tag" : "share_1",
                "bdSize" : '16'
            }]
        };
        with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
    </script>
</body>
</html>