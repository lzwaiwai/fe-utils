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

export default cookie;
