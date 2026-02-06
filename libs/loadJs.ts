const loadJs = function (url: string, callback?: () => void): void {
  let haveJs: boolean = false
  const aScript: HTMLCollectionOf<HTMLScriptElement> = document.getElementsByTagName('script')
  for (let i = 0, len = aScript.length; i < len; i++) {
    if (aScript[i].getAttribute('src') === url) {
      haveJs = true
      break
    }
  }

  if (!haveJs) {
    const oScript: HTMLScriptElement = document.createElement('script')
    oScript.type = 'text/javascript'
    oScript.setAttribute('src', url)
    document.body.appendChild(oScript)

    if ((oScript as any).readyState) { // IE
      (oScript as any).onreadystatechange = function (): void {
        if ((oScript as any).readyState === 'loaded' || (oScript as any).readyState === 'complete') {
          (oScript as any).onreadystatechange = null
          callback && callback()
        }
      }
    } else { // Others
      oScript.onload = function (): void {
        callback && callback()
      }
    }

    oScript.onerror = function (event: Event | string): void {
      console.error('The script ' + (event as any).target.src + ' is not accessible.')
    }
  } else {
    callback && callback()
  }
}

export default loadJs
