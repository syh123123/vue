// import shareTip from '../assets/img/shareTip.png'
let view={}
view.title = function (title) {
    window.document.title = title;
  };
view.toast = function(obj) {
    let opt = {
        duration: 1500,
        msg: '',
        type: 'succ'
    }
    opt = Object.assign(opt, obj);
    if (document.querySelector('.bit-toast')) return;
    let _toast = document.createElement('div');
    var _toast1 = document.createElement('div');
    _toast.setAttribute('class', 'bit-toast');
    _toast1.setAttribute('class', 'bit-toast-content');
    _toast1.innerHTML = opt.msg;
    _toast.appendChild(_toast1);
    document.body.appendChild(_toast);
    let o = document.querySelector('.bit-toast');
    setTimeout(() => {
        o.className = 'bit-toast bit-toast-op ' + opt.type;
    }, 10);

    function opNone() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                o.className = 'bit-toast ' + opt.type;
                resolve();
            }, 1000);
        })
    };
    opNone().then((res) => {
        setTimeout(() => {
            document.body.removeChild(o);
        }, 500);
    });

}
view.showLoading = function(text) {
    var loading = document.createElement('div');
    var loadingIcon = document.createElement('i');
    var loadingText = document.createElement('span');
    loadingText.innerHTML=text||'';
    loadingText.setAttribute('class', 'loadingText');
    loading.setAttribute('class', 'loading');
    loadingIcon.setAttribute('class', 'loadingIcon');
    loading.appendChild(loadingIcon);
    loading.appendChild(loadingText);
    document.body.appendChild(loading);
}
view.hideLoading = function() {
    var o = document.querySelector('.loading');
    if (o) {
        document.body.removeChild(o);
    }
}
view.shareLink = function(_this, data) {
    // var userinfo = _this.$store.state.state.userinfo;
    // if (userinfo && userinfo.customercode) {
    //     data.url += "&sharecode=" + userinfo.customercode;
    // }
    return new Promise(function(resolve, reject) {
        if (sessionStorage.getItem('ua') == 'wechat') {
            wx.ready(function() {
                var obj = {
                    title: data.title,
                    desc: data.desc, // 分享描述
                    link: data.url,
                    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: data.imgUrl, // 分享图标
                    success: function() {
                        // 设置成功
                        resolve();
                    },
                }
                wx.onMenuShareAppMessage(obj);
                wx.onMenuShareTimeline(obj);
            });
        }
    })
}
view.shareBox = function() {
    var shareBox = document.createElement('div');
    shareBox.setAttribute('class', 'shareBox');
    var img = document.createElement('img');
    img.setAttribute('src', shareTip);
    shareBox.appendChild(img)
    document.body.appendChild(shareBox);
    setTimeout(() => {
        var shareBox1 = document.querySelector('.shareBox');
        shareBox1.onclick = function() {
            document.body.removeChild(shareBox1);
        }
    }, 10);
}
//跳转地图
view.goMap = function (obj) {
    //callnative 1唤起高的app 0 不唤醒 
    window.location.href=`https://uri.amap.com/marker?position=116.473195,39.993253&name='ss'&callnative=0`
    // window.location.href =
    //   "http://api.map.baidu.com/marker?location=" +
    //   obj.longitude +
    //   "," +
    //   obj.latitude +
    //   "&title=" +
    //   obj.title +
    //   "&content=" +
    //   obj.address +
    //   "&output=html";
  };
// export default view