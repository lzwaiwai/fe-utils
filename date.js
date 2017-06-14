var date = {
  dateFormat: function dateFormat(d, fmt) {
    // format(new Date(), 'YYYY年MM月DD日 hh:mm:ss')
    if (!d || !fmt) {
      throw new Error('lack date or format')
    }

    if (typeof d === 'string') {
      // 判断时区是UTC标准时区，转成东八区时间
      if (d.indexOf('Z') > -1) {
        d = new Date(d).getTime() - (8 * 60 * 60 * 1000)
      }
    }
    // 转换毫秒和字符串为时间对象
    d = new Date(d)
    var o = {
      'M+': d.getMonth() + 1, // 月份
      'D+': d.getDate(), // 日
      'h+': d.getHours(), // 小时
      'm+': d.getMinutes(), // 分
      's+': d.getSeconds(), // 秒
      'Q+': Math.floor((d.getMonth() + 3) / 3), // 季度
      'S': d.getMilliseconds() // 毫秒
    };

    if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }

    return fmt;
  }
  // TodayFormat (date) {
  //   if (!date) {
  //     throw new Error('lack date')
  //   }

  //   const fmt = 'YYYY-MM-DD'
  //   const cur = new Date() // 当前年月日
  //   const curYear = cur.getFullYear()
  //   const curMonth = cur.getMonth() + 1
  //   const curDay = cur.getDate()

  //   const next = new Date(`${curYear}/${curMonth}/${curDay + 1}`) // 明天年月日
  //   const param = new Date(date) // 传进来的年月日
  //   const paramDay = new Date().getDate()

  //   const nowDate = this.dateFormat(cur, fmt)
  //   const nextDate = this.dateFormat(next, fmt)
  //   const paramDate = this.dateFormat(param, fmt)

  //   if (nowDate == nextDate) {
  //     return '今天' + this.dateFormat(paramDate, 'hh:mm')
  //   } else if (paramDay === curDay) {
  //     return '明天' + this.dateFormat(paramDate, 'hh:mm')
  //   } else {
  //     return this.dateFormat(paramDate, 'MM月DD日 hh:mm')
  //   }
  // }

};

export default date;
