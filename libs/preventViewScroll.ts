const preventViewScroll = (classes: string | string[]): void => {
  const prevent = function (ele: HTMLElement): void {
    ele.addEventListener('touchstart', function (): void {
      const o: number = ele.scrollTop
      const i: number = ele.scrollHeight
      const t: number = o + ele.offsetHeight
      if (o === 0) {
        ele.scrollTop = 1
      } else if (t === i) {
        ele.scrollTop = o - 1
      }
    })

    ele.addEventListener('touchmove', function (e: any): void {
      ele.offsetHeight < ele.scrollHeight && (e._isScroller = true)
    })
  }

  if (typeof classes === 'string') {
    classes = [classes]
  }

  classes.forEach((item: string): void => {
    if (item) {
      const dom: HTMLElement | null = document.querySelector(item)
      dom && prevent(dom)
    }
  })

  document.body.addEventListener('touchmove', function (e: any): void {
    const target: HTMLElement = e.target || e.currentTarget
    if (target.className.indexOf('prevent-view-scroll') !== -1) {
      return
    }
    e._isScroller || e.preventDefault()
  })
}

export default preventViewScroll
