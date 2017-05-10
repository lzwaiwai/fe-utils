let loc = window.location

let urlQuery = {
  queryOne: function (name, str) {
    let s = ''
    if (str) {
      s = str
    } else {
      s = loc.search
    }
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
    let r = s.substr(1).match(reg)  // 匹配目标参数
    if (r != null) {
      return decodeURIComponent(r[2])
    }
    return null // 返回参数值
  },

  queryAll: function (str) {
    let s = ''
    if (str) {
      s = str
    } else {
      s = loc.search
    }
    let search = s.substr(1)
    let a = search.split('&')
    let i = 0
    let result = {}

    while (a[i]) {
      let kv = a[i].split('=')
      result[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1])
      i++
    }
    return result
  }
}

export default urlQuery
