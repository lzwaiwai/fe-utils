const loc: Location = window.location

interface QueryResult {
  querys: { [key: string]: string }
  url: string
}

interface UrlQuery {
  queryOne(key: string, str?: string): string | null
  queryAll(str?: string): { [key: string]: string }
  _makeUrl(url: string, search: string): string
  _getQueryFromUrl(url: string): string
  update(obj: { [key: string]: string }, str?: string): QueryResult
  del(keys: string | string[], str?: string): QueryResult | undefined
}

const urlQuery: UrlQuery = {
  queryOne(key: string, str: string = ''): string | null {
    const s: string = str ? `?${this._getQueryFromUrl(str)}` : loc.search
    const reg: RegExp = new RegExp('(^|&)' + key + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
    const r: RegExpMatchArray | null = s.substr(1).match(reg)  // 匹配目标参数
    if (r != null) {
      return decodeURIComponent(r[2]).replace(/(#\w+)$/, '')
    }
    return null // 返回参数值
  },

  queryAll(str: string = ''): { [key: string]: string } {
    const reg: RegExp = new RegExp('(^|&)([^&=]+)=([^&]*)(&|$)')
    const s: string = str ? `?${this._getQueryFromUrl(str)}` : loc.search
    const search: string = s.substr(1)
    const a: string[] = search.split('&')
    let i: number = 0
    const result: { [key: string]: string } = {}

    while (a[i]) {
      const r: RegExpMatchArray | null = a[i].match(reg)
      if (r != null) {
        result[decodeURIComponent(r[2])] = decodeURIComponent(r[3])
      }
      i++
    }
    return result
  },

  _makeUrl(url: string, search: string): string {
    return url.indexOf('?') !== -1 ? url.replace(/\?([^#]*)/, `${search ? '?' + search : ''}`) : `${url}${search ? '?' + search : ''}`
  },

  _getQueryFromUrl(url: string): string {
    if (!url || url.indexOf('?') === -1) {
      return ''
    }

    const search: string = url.split('?')[1]

    if (!search || search.indexOf('=') === -1) {
      throw new Error('not query format!')
    }

    return search
  },

  update(obj: { [key: string]: string }, str: string = ''): QueryResult {
    const query: { [key: string]: string } = this.queryAll(str)
    const result: string[] = []

    for (const name in obj) {
      query[name] = obj[name]
    }

    for (const key in query) {
      result.push(`${key}=${query[key]}`)
    }

    const search: string = result.join('&')

    return {
      querys: query,
      url: str ? this._makeUrl(str, search) : `?${search}`
    }
  },

  del(keys: string | string[], str: string = ''): QueryResult | undefined {
    if (!keys) {
      return
    }

    if (typeof keys === 'string') {
      keys = [keys]
    }

    const query: { [key: string]: string } = this.queryAll(str)
    const keysObj: { [key: string]: boolean } = {}
    const result: string[] = []
    const newQuery: { [key: string]: string } = {}

    keys.forEach((item: string): void => {
      keysObj[item] = true
    })

    for (const key in query) {
      const item: string = query[key]

      if (!keysObj[key]) {
        newQuery[key] = item
        result.push(`${key}=${item}`)
      }
    }

    const search: string = result.join('&')

    return {
      querys: newQuery,
      url: str ? this._makeUrl(str, search) : `?${search}`
    }
  }
}

export default urlQuery
