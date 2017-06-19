const loc = window.location

const urlQuery = {
  queryOne (key, str = '') {
    const s = str ? `?${this._getQueryFromUrl(str)}` : loc.search
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
    const r = s.substr(1).match(reg)  // 匹配目标参数
    if (r != null) {
      return decodeURIComponent(r[2]).replace(/(#\w+)$/, '')
    }
    return null // 返回参数值
  },

  queryAll (str = '') {
    const s = str ? `?${this._getQueryFromUrl(str)}` : loc.search
    const search = s.substr(1)
    const a = search.split('&')
    let i = 0
    let result = {}

    while (a[i]) {
      let kv = a[i].replace(/(#\w+)$/, '').split('=')
      result[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1])
      i++
    }
    return result
  },

  _makeUrl (url, search) {
    return url.indexOf('?') !== -1 ? url.replace(/\?([^#]*)/, `${search ? '?' + search : ''}`) : `${url}${search ? '?' + search : ''}`
  },

  _getQueryFromUrl (url) {
    if (!url || url.indexOf('?') === -1) {
      return ''
    }

    const search = url.split('?')[1]

    if (!search || search.indexOf('=') === -1) {
      throw new Error('not query format!')
    }

    return search
  },

  update (obj, str = '') {
    let query = this.queryAll(str)
    let result = []

    Object.assign(query, obj)

    for (let key in query) {
      result.push(`${key}=${query[key]}`)
    }

    const search = result.join('&')

    return {
      querys: query,
      url: str ? this._makeUrl(str, search) : `?${search}`
    }
  },

  del (keys, str = '') {
    if (!keys) {
      return
    }

    if (typeof keys === 'string') {
      keys = [keys]
    }

    const query = this.queryAll(str)
    let keysObj = {}
    let result = []
    let newQuery = {}

    keys.forEach((item) => {
      keysObj[item] = true
    })

    for (let key in query) {
      let item = query[key]

      if (!keysObj[key]) {
        newQuery[key] = item
        result.push(`${key}=${item}`)
      }
    }

    const search = result.join('&')

    return {
      querys: newQuery,
      url: str ? this._makeUrl(str, search) : `?${search}`
    }
  }
}

export default urlQuery
