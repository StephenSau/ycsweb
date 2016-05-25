define(["jquery"],function(t){function i(t){t=t||{},this.titleText=t.title||"提示",this.contentText=t.content||"",this.closeBtn=null,this.closeAction=void 0,this.width=this.getWidth(t.width),this.modal=void 0!==t.modal?t.modal:!0,this.buttons=t.buttons,this.init()}return i.prototype={cssUrl:"../style/common/dialog.css",mask:null,box:null,fontSize:16,title:null,content:null,btnGroup:null,getWidth:function(t){return t?t>window.innerWidth?window.innerWidth-60:t:window.innerWidth<480?window.innerWidth-60:400},getHeight:function(t,i){t=t||this.contentText,i=i||this.width;var e=this.fontSize,n=Math.ceil((t.length*e+2*e)/i);return 22+1.125*e+10+n*e*1.2+24+2+50},init:function(){this.modal&&(document.getElementById("mask")?(this.mask=t("#mask"),this.mask.hide()):this.mask=t('<div class="mask" id="mask" style="display:none;"></div>').appendTo("body")),document.getElementById("ui-dialog")?(this.box=document.getElementById("ui-dialog"),this.title=document.getElementById("ui-dialog-title"),this.content=document.getElementById("ui-dialog-content"),this.btnGroup=document.getElementById("ui-dialog-btnGroup")):this.initDialog()},initDialog:function(){this.box=document.createElement("div"),this.box.className="ui-dialog",this.box.id="ui-dialog",this.box.style.width=this.width+"px",this.box.style.marginLeft=-this.width/2+"px",this.box.style.display="none",this.title=document.createElement("h2"),this.title.className="ui-title",this.title.id="ui-title",this.title.appendChild(document.createTextNode(this.titleText)),this.box.appendChild(this.title),this.content=document.createElement("div"),this.content.className="ui-content",this.content.id="ui-content",this.content.appendChild(document.createTextNode(this.contentText)),this.box.appendChild(this.content),this.btnGroup=document.createElement("p"),this.btnGroup.className="ui-btnGroup",this.btnGroup.id="ui-dialog-btnGroup",this.box.appendChild(this.btnGroup),this.closeBtn=document.createElement("a"),this.closeBtn.appendChild(document.createTextNode("×")),this.closeBtn.setAttribute("href","javascript:;"),this.closeBtn.className="ui-closeBtn",t(this.closeBtn).click(t.proxy(function(){this.close()},this)),this.box.appendChild(this.closeBtn),this.rebuildBtnGroup(),document.body.appendChild(this.box)},show:function(i){i=i||{};var e=void 0!==i.modal?i.modal:this.modal;this.closeAction=i.closeAction,e&&this.mask.show(),i&&this.rebuild(i),t(this.box).css({display:"block"})},rebuild:function(i){var e=i.title||this.titleText,n=i.content||this.contentText,o=this.getWidth(i.width);e!==this.titleText&&t(this.title).text(e),n!==this.contentText&&(t(this.content).html(n),this.contentText=n,this.box.style.width=o+"px",this.box.style.marginLeft=-o/2+"px"),this.rebuildBtnGroup(i.buttons)},rebuildBtnGroup:function(i){i=i||this.buttons||[];var e=this,n=i.length;if(t(this.btnGroup).empty(),n)for(var o=0;n>o;o++){var s=document.createElement("button");s.setAttribute("type","button"),s.appendChild(document.createTextNode(i[o].name)),i[o].callBack?t(s).click(i[o].callBack):t(s).click(function(){e.close()}),this.btnGroup.appendChild(s)}else{var l=document.createElement("button");l.setAttribute("type","button"),l.appendChild(document.createTextNode("确定")),t(l).click(function(){e.close()}),this.btnGroup.appendChild(l)}},close:function(i){t(this.box).css({display:"none"}),this.modal&&this.mask.hide(),i&&"function"==typeof i&&(this.closeAction=void 0,i()),this.closeAction&&"function"==typeof this.closeAction&&this.closeAction()}},new i});