let browser={}
//获取地址栏参数
browser.getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//vue 获取地址栏参数
browser.vueGetQueryString = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
//替换地址栏参数
browser.replaceHref=function(name,val){
    let href=location.href;
    let arg=name;
     if(href.indexOf(arg)!=-1){
       var tmp='/('+ arg+'=)([^&]*)/gi';
       href=href.replace(eval(tmp),`${arg}=${val}` )
     }else{
       href = href += `&${name}=${val}`;
     }
    history.replaceState({ [name]: val }, "", href);
  }
  browser.getUserAgent = function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var userAgent = "";
    //延迟定时器 解决ios端存入缓慢
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs ||  bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE ||  bIsWM ) {
      userAgent =sUserAgent.indexOf("wxwork") != -1 ? "enterpriseWechat" : "phone"; //企业微信
      userAgent = sUserAgent.indexOf("micromessenger") != -1 ? "wechat" : "phone"; //微信
    } else {
      userAgent = "pc";
    }
  };
browser.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
browser.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
browser.setStorage=function(cname,cvalue,type='session'){
    let Storage=type+'Storage';
    window[Storage].setItem(cname,cvalue)
    return ''
}
browser.getStorage=function(cname,type='session'){
    let Storage=type+'Storage';
    return window[Storage].getItem(cname)||''
}
export default browser;
