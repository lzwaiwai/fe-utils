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

export default urlQuery;
