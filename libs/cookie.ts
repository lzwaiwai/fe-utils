const doc: Document = document

interface Cookie {
  setCookie(name: string, value: string, domain: string, expiredays?: number): void
  getCookie(name: string): string
  delCookie(name: string, domain: string): void
}

const cookie: Cookie = {
  // 写cookies
  setCookie(name: string, value: string, domain: string, expiredays?: number): void {
    const exdate: Date = new Date()
    exdate.setDate(exdate.getDate() + (expiredays || 0))
    const expires: string = expiredays == null ? '' : `;expires=${exdate.toUTCString()}`
    doc.cookie = `${name}=${escape(value)}${expires};path=/;domain=.${domain}`
  },

  // 读取cookies
  getCookie(name: string): string {
    const reg: RegExp = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr: RegExpMatchArray | null = doc.cookie.match(reg)
    if (arr) {
      return arr[2]
    } else {
      return ''
    }
  },

  // 删除cookies
  delCookie(name: string, domain: string): void {
    const exp: Date = new Date()
    const cval: string = ' ' // this.getCookie(name)

    exp.setTime(exp.getTime() - 100)
    doc.cookie = `${name}=${cval};expires=${exp.toUTCString()};path=/;domain=.${domain}`
  }
}

export default cookie
