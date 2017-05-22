(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.feUtils = factory());
}(this, (function () { 'use strict';

var date = {
  dateFormat: function dateFormat(d, fmt) {
    // format(new Date(), 'YYYY年MM月DD日 hh:mm:ss')
    if (!d || !fmt) {
      throw new Error('lack date or format');
    }
    if (typeof d === 'string') {
      d = new Date(d);
    }
    var o = {
      'M+': d.getMonth() + 1, // 月份
      'D+': d.getDate(), // 日
      'h+': d.getHours(), // 小时
      'm+': d.getMinutes(), // 分
      's+': d.getSeconds(), // 秒
      'Q+': Math.floor((d.getMonth() + 3) / 3), // 季度
      'S': d.getMilliseconds() // 毫秒
    };

    if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }

    return fmt;
  }
  // TodayFormat (date) {
  //   if (!date) {
  //     throw new Error('lack date')
  //   }

  //   const fmt = 'YYYY-MM-DD'
  //   const cur = new Date() // 当前年月日
  //   const curYear = cur.getFullYear()
  //   const curMonth = cur.getMonth() + 1
  //   const curDay = cur.getDate()

  //   const next = new Date(`${curYear}/${curMonth}/${curDay + 1}`) // 明天年月日
  //   const param = new Date(date) // 传进来的年月日
  //   const paramDay = new Date().getDate()

  //   const nowDate = this.dateFormat(cur, fmt)
  //   const nextDate = this.dateFormat(next, fmt)
  //   const paramDate = this.dateFormat(param, fmt)

  //   if (nowDate == nextDate) {
  //     return '今天' + this.dateFormat(paramDate, 'hh:mm')
  //   } else if (paramDay === curDay) {
  //     return '明天' + this.dateFormat(paramDate, 'hh:mm')
  //   } else {
  //     return this.dateFormat(paramDate, 'MM月DD日 hh:mm')
  //   }
  // }

};

var doc = document;

var cookie = {
  // 写cookies
  setCookie: function setCookie(name, value, domain, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    var expires = expiredays == null ? '' : ';expires=' + exdate.toGMTString();
    doc.cookie = name + '=' + escape(value) + expires + ';path=/;domain=.' + domain;
  },


  // 读取cookies
  getCookie: function getCookie(name) {
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    var arr = doc.cookie.match(reg);
    if (arr) {
      return arr[2];
    } else {
      return '';
    }
  },


  // 删除cookies
  delCookie: function delCookie(name, domain) {
    var exp = new Date();
    var cval = ' '; // this.getCookie(name)

    exp.setTime(exp.getTime() - 100);
    doc.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/;domain=.' + domain;
  }
};

var toRoman = function toRoman(num) {
  var lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };
  var romanStr = '';
  for (var i in lookup) {
    while (num >= lookup[i]) {
      romanStr += i;
      num -= lookup[i];
    }
  }
  return romanStr;
};

var loc = window.location;

var urlQuery = {
  queryOne: function queryOne(name, str) {
    var s = '';
    if (str) {
      s = str;
    } else {
      s = loc.search;
    }
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
    var r = s.substr(1).match(reg); // 匹配目标参数
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return null; // 返回参数值
  },

  queryAll: function queryAll(str) {
    var s = '';
    if (str) {
      s = str;
    } else {
      s = loc.search;
    }
    var search = s.substr(1);
    var a = search.split('&');
    var i = 0;
    var result = {};

    while (a[i]) {
      var kv = a[i].split('=');
      result[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
      i++;
    }
    return result;
  }
};

var mobileCheck = function mobileCheck() {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
var ua = navigator.userAgent || navigator.vendor || window.opera;
var isMobile = mobileCheck();
var isAndroid = /android/i.test(ua);
var isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
var isWindowPhone = /windows phone/i.test(ua);

var detectedInfos = {
  isAndroid: /android/i.test(ua),
  isIOS: /iPad|iPhone|iPod/.test(ua) && !window.MSStream,
  isWindowPhone: /windows phone/i.test(ua),
  isWX: /micromessenger/.test(ua.toLowerCase()),
  isWeibo: /weibo/.test(navigator.userAgent.toLowerCase()),
  isMobile: isMobile,
  isPC: !isMobile && !isIOS && !isAndroid && !isWindowPhone
};

var getVersionOfIOS = function getVersionOfIOS() {
  var agent = window.navigator.userAgent.toLowerCase();

  if (/ipad|iphone|ipod/.test(agent)) {
    // 优雅降级
    if (agent.indexOf('like mac os x') > 0) {
      // ios
      var regStr = /os [\d._]*/gi;
      var verinfo = agent.match(regStr);
      return verinfo.toString().replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.');
    }
  }

  return null;
};

var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var chTwNumChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾'];
var chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
var chnUnitChar = ['', '十', '百', '千'];
var chTwUnitChar = ['', '十', '佰', '仟'];

var SectionToChinese = function SectionToChinese(section, isBig5) {
  var strIns = '';
  var chnStr = '';
  var unitPos = 0;
  var zero = true;
  var numChar = chnNumChar;
  var unitChar = chnUnitChar;

  if (isBig5) {
    numChar = chTwNumChar;
    unitChar = chTwUnitChar;
  }

  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = numChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = numChar[v];
      strIns += unitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
};

var NumberToChinese = function NumberToChinese(num, isBig5) {
  var unitPos = 0;
  var strIns = '';
  var chnStr = '';
  var needZero = false;
  var numChar = chnNumChar;

  if (isBig5) {
    numChar = chTwNumChar;
  }

  if (num === 0) {
    return chnNumChar[0];
  }

  while (num > 0) {
    var section = num % 10000;
    if (needZero) {
      chnStr = numChar[0] + chnStr;
    }
    strIns = SectionToChinese(section, isBig5);
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = section < 1000 && section > 0;
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
};

var preventViewScroll = function preventViewScroll(classes) {
  var prevent = function prevent(ele) {
    ele.addEventListener('touchstart', function () {
      var o = ele.scrollTop;
      var i = ele.scrollHeight;
      var t = o + ele.offsetHeight;
      if (o === 0) {
        ele.scrollTop = 1;
      } else if (t === i) {
        ele.scrollTop = o - 1;
      }
    });

    ele.addEventListener('touchmove', function (e) {
      ele.offsetHeight < ele.scrollHeight && (e._isScroller = !0);
    });
  };

  if (typeof classes === 'string') {
    classes = [classes];
  }

  classes.forEach(function (item) {
    if (item) {
      var dom = document.querySelector(item);
      dom && prevent(dom);
    }
  });

  document.body.addEventListener('touchmove', function (e) {
    var target = e.target || e.currentTarget;
    if (target.className.indexOf('prevent-view-scroll') !== -1) {
      return;
    }
    e._isScroller || e.preventDefault();
  });
};

var main = {
  date: date,
  cookie: cookie,
  toRoman: toRoman,
  urlQuery: urlQuery,
  detectedInfos: detectedInfos,
  getVersionOfIOS: getVersionOfIOS,
  NumberToChinese: NumberToChinese,
  preventViewScroll: preventViewScroll
};

return main;

})));
