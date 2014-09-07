/**
 * 公共函数库
 */
;(function(g){

  if(g.common) return ;
  var common = g.common = {};

  /**
   * 判断一个元素是否在数组中，不在返回-1 否则返回它的索引
   * @param  {Object, String, Number} val   值
   * @param  {Array} arr   所在的数组
   * @param {Boolean} strict 是否严格比较类型
   * @return {Number}
   */
  common.inArray = function(val, arr, strict){
    if (!(arr instanceof Array)) {
      this.throwErr('function wxs.inArray param two is not a Array type', 'TypeError');
    }

    if (strict && Array.prototype.indexOf) {
      return arr.indexOf(val);
    }

    for(var i = 0; i < arr.length; i++) {
      if (strict && val === arr[i]) return i;
      if (val == arr[i]) return i;
    }
    return -1;
  };

  /**
   * 加载一个图片
   * @param {String} url
   * @param {Function} cb
   * @param {DOMObject} img
   */
  common.loadImage = function(url, cb, img)
  {
    if (!url) return;
    if(typeof img == 'undefined') {
      img = document.createElement('img');
    }
    img.src = url;
    if (img.complete) {
      if (cb) cb(null, url, img);
      return;
    }
    img.onload = function(){
      // 防止gif图多次onload
      img.onload = null;
      if ( cb ) cb(null, url, img);
    }
    img.onerror = function() {
      if ( cb ) cb('loadimage-error:'+url, null);
    }
  };

  /**
   * 记录一个log
   */
  common.log = function(){
    if (!arguments.length) return false;
    // fix ie 8 console.log is an object
    if (window.console && console.log && console.log.apply) {
      console.log('# log start ->');
      console.log.apply(console, Array.prototype.slice.call(arguments, 0, arguments.length));
      console.log(' ');
    }
  };

  /**
   * 抛出一个类型的异常
   * @param  {String} msg  错误消息文本
   * @param  {String} type 错误类型 有：SyntaxError/TypeError/URIError/ReferenceError/RangeError/EvalError，默认为Error
   */
  common.throwErr = function(msg, type) {
    if ('string' != typeof msg || ( type && 'string' != typeof type)) {
      this.log('function wxs.throwErr params', msg, type);
      this.throwErr('wxs.throwErr function error: params TypeError', 'TypeError');
    }

    try {
      switch (type) {
        case 'SyntaxError':
          throw new SyntaxError(msg);
          break;
        case 'TypeError':
          throw new TypeError(msg);
          break;
        case 'URIError':
          throw new URIError(msg);
          break;
        case 'ReferenceError':
          throw new ReferenceError(msg);
          break;
        case 'RangeError':
          throw new RangeError(msg);
          break;
        case 'EvalError':
          throw new EvalError(msg);
          break;
        default:
          throw new Error(msg);
      }
    } catch(e) {
      if (window.console && console.trace) console.trace();
      throw e;
    }
  };

  // 代理方法
  common._css = function(el, prop)
  {
    return _css(el, prop);
  };
  common._width = function(el)
  {
    return _width(el);
  };
  common._height = function(el)
  {
    return _height(el);
  };




  // @see jcarousellite_1.0.1.js
  function _css(el, prop) {
    if (!el || !el.length) return 0;
    return parseInt($.css(el[0], prop)) || 0;
  };
  function _width(el) {
    if (!el || !el.length) return 0;
    return  el[0].offsetWidth + _css(el, 'marginLeft') + _css(el, 'marginRight');
  };
  function _height(el) {
    if (!el || !el.length) return 0;
    return el[0].offsetHeight + _css(el, 'marginTop') + _css(el, 'marginBottom');
  };

})(window);


//showMsg
function showMsg(msg){
alert(msg);
}
function shareFriend(imgUrl, lineLink, shareTitle, descContent) {
    WeixinJSBridge.invoke('sendAppMessage',{
                            "appid": '',
                            "img_url": imgUrl,
                            "img_width": "100",
                            "img_height": "100",
                            "link": lineLink,
                            "desc": descContent,
                            "title": shareTitle
                            }, function(res) {
                            })
}
function shareTimeline(imgUrl, lineLink, shareTitle, descContent) {
    WeixinJSBridge.invoke('shareTimeline',{
                            "img_url": imgUrl,
                            "img_width": "100",
                            "img_height": "100",
                            "link": lineLink,
                            "desc": descContent,
                            "title": shareTitle
                            }, function(res) {
                            });
}
function shareWeibo(lineLink, descContent) {
    WeixinJSBridge.invoke('shareWeibo',{
                            "content": descContent,
                            "url": lineLink,
                            }, function(res) {
                            });
}

function is_weixin(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger" || ua.match(/IEMobile/i)=="iemobile") {
      return true;
  } else {
      return false;
  }
}
function hideWeixinToolBar(){
  if (typeof addEventListener == 'undefined') {
    return false;
  }
  if (!is_weixin()) {
    return false;
  }
  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.call('hideToolbar');
  });
}