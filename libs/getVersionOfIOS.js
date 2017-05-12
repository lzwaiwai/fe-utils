const getVersionOfIOS = () => {
  const agent = window.navigator.userAgent.toLowerCase()

  if (/ipad|iphone|ipod/.test(agent)) { // 优雅降级
    if (agent.indexOf('like mac os x') > 0) { // ios
      const regStr = /os [\d._]*/gi
      const verinfo = agent.match(regStr)
      return verinfo.toString().replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.')
    }
  }

  return null
}

export default getVersionOfIOS
