var loc = window.location;

var urlQuery = {
  queryOne: function queryOne(key) {
    var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var s = str ? '?' + this._getQueryFromUrl(str) : loc.search;
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
    var r = s.substr(1).match(reg); // 匹配目标参数
    if (r != null) {
      return decodeURIComponent(r[2]).replace(/(#\w+)$/, '');
    }
    return null; // 返回参数值
  },
  queryAll: function queryAll() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var reg = new RegExp('(^|&)([^&=]+)=([^&]*)(&|$)');
    var s = str ? '?' + this._getQueryFromUrl(str) : loc.search;
    var search = s.substr(1);
    var a = search.split('&');
    var i = 0;
    var result = {};

    while (a[i]) {
      var r = a[i].match(reg);
      if (r != null) {
        result[decodeURIComponent(r[2])] = decodeURIComponent(r[3]);
      }
      i++;
    }
    return result;
  },
  _makeUrl: function _makeUrl(url, search) {
    return url.indexOf('?') !== -1 ? url.replace(/\?([^#]*)/, '' + (search ? '?' + search : '')) : '' + url + (search ? '?' + search : '');
  },
  _getQueryFromUrl: function _getQueryFromUrl(url) {
    if (!url || url.indexOf('?') === -1) {
      return '';
    }

    var search = url.split('?')[1];

    if (!search || search.indexOf('=') === -1) {
      throw new Error('not query format!');
    }

    return search;
  },
  update: function update(obj) {
    var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var query = this.queryAll(str);
    var result = [];

    for (var name in obj) {
      query[name] = obj[name];
    }

    for (var key in query) {
      result.push(key + '=' + query[key]);
    }

    var search = result.join('&');

    return {
      querys: query,
      url: str ? this._makeUrl(str, search) : '?' + search
    };
  },
  del: function del(keys) {
    var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (!keys) {
      return;
    }

    if (typeof keys === 'string') {
      keys = [keys];
    }

    var query = this.queryAll(str);
    var keysObj = {};
    var result = [];
    var newQuery = {};

    keys.forEach(function (item) {
      keysObj[item] = true;
    });

    for (var key in query) {
      var item = query[key];

      if (!keysObj[key]) {
        newQuery[key] = item;
        result.push(key + '=' + item);
      }
    }

    var search = result.join('&');

    return {
      querys: newQuery,
      url: str ? this._makeUrl(str, search) : '?' + search
    };
  }
};

export default urlQuery;
