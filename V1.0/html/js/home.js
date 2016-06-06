 // tap切换
var tapSwitch=(function(){
    var module=function(option){
        var opt={
            navs:$,
            contents:$,
            leaveHide:true
        };
        this.opt=$.extend(opt,option);
    };
    module.prototype.doSwitch=function(){
        var t=this;
        t.opt.navs.mouseenter(function(){
            var itemJq=$(this);
            if(!itemJq.hasClass("on")) itemJq.addClass("on");
        }).mouseleave(function(thisDom){
            var itemJq=$(this);
            if(!itemJq.hasClass("select")) itemJq.removeClass("on");
            //离开当前区域隐藏导航，去除选中效果，即使被选中
            if(t.opt.leaveHide) {
                itemJq.removeClass("on");
                itemJq.removeClass("select");
            }
        }).click(function(){
             var itemJq=$(this);
             //把正在选中的效果去除，内容隐藏
             var selJq=t.opt.navs.filter(".select");
             var showContentJq=$("."+selJq.attr("content"));
             selJq.removeClass("select").removeClass("on"); 
             if(showContentJq)showContentJq.hide();
             //当前点击选中，绑定选中效果，显示内容
             itemJq.addClass("on").addClass("select");
             var contentJq=$("."+itemJq.attr("content"));
             contentJq.show();
             return false;
        });
    };
    return module;
})();

// tap滑动
var opt={
    navs:$(".footer .nav-footer .nav-item"),
    contents:$(".footer .nav-footer .content-item"),
    leaveHide:false
};
var footer_ts=new tapSwitch(opt);
footer_ts.doSwitch();
opt.navs.eq(0).click();

var top_ts=new tapSwitch({
    navs:$(".nav .nav_item"),
    contents:$(".nav .nav_content")
});
top_ts.doSwitch();

//回车查询 
$("#cost_input").keydown(function(even){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
            window.shfn_callback=function (res) { var h; var c=parseFloat(res['cost']); if(isNaN(c)){c=0;}var rcs=['country','zip','city','state','name','moneysign','desc','cost','eta'];res['moneysign'] = ( c <= 0? '': '$'); if( res['na'] ) { h= unescape('N%2FA'); }else if( c <= 0 ) { h= unescape('FREE'); }else { h= unescape('%5Bname%5D - %24%5Bcost%5D %3Cbr%3E%0D%0A                %5Bdesc%5D'); }var p=0; while(p<h.length) {var st = h.indexOf('[', p);if( st < 0 ) { p = h.length; }else {if(st < p) { st+=p; }var ed = h.indexOf(']', st);if( st < 0 ) { p = h.length; }else {var k = h.substr(st+1,ed - (st+1));if(ed < st) { ed+=st; }p = ed;if(typeof(res[k]) != 'undefined') {var v = ''+unescape(res[k]);h = h.substr(0,st) + unescape(res[k]) +  h.substr(ed+1);p += (v.length - k.length);}p++;}}}var cl = document.getElementById('ship_cost');if(cl) { cl.innerHTML=(h); }var ld = document.getElementById('ship_loading');if(ld) { ld.style.display='none'; }};var shfn=function (z,c,q,x,y,p) {if(typeof(c)=='undefined') { c='AU'; }if(typeof(z)=='undefined') { z=''; }if(typeof(x)=='undefined') { x=''; }if(typeof(y)=='undefined') { y=''; }if(typeof(q)=='undefined') { q=1; }if(typeof(p)=='undefined') { p=''; }var okay=true;if( typeof(okay)=='undefined' || okay===true) {var zo = document.getElementById('ship_zip');if(zo) { var tn = zo.tagName; if(tn) {tn=tn.toUpperCase();} else {tn='';} if(tn=='SELECT') {z=zo.options[zo.selectedIndex].value;} else if(tn=='INPUT') {z=zo.value;} }var ld = document.getElementById('ship_loading');if(ld) { ld.style.display=''; }var qs = [];qs.push('ajfn'+'=getshcost');qs.push('ship_zip'+'='+escape(z));qs.push('ship_country'+'='+escape(c));qs.push('ship_city'+'='+escape(x));qs.push('ship_state'+'='+escape(y));qs.push('ship_qty'+'='+escape(q));qs.push('sku'+'='+'MTable-WH');qs.push('ebtmpl_id'+'='+'0');qs.push('callback'+'='+'shfn_callback');var cl = document.getElementById('ship_cost');if(cl) { var nst = document.createElement('scr'+'ipt');nst.type = 'text'+'/'+'j'+'ava'+'scr'+'ipt';nst.src = 'https://www.superandcheaper.com.au/do/WS/eBayJS.js?'+qs.join('&');cl.appendChild(nst); }}};shfn();
    }
});