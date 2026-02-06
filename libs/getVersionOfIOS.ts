const getVersionOfIOS = (): string | null => {
  const agent: string = window.navigator.userAgent.toLowerCase()

  if (/ipad|iphone|ipod/.test(agent)) { // 优雅降级
    if (agent.indexOf('like mac os x') > 0) { // ios
      const regStr: RegExp = /os [\d._]*/gi
      const verinfo: RegExpMatchArray | null = agent.match(regStr)
      if (verinfo) {
        return verinfo.toString().replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.')
      }
    }
  }

  return null
}

export default getVersionOfIOS
