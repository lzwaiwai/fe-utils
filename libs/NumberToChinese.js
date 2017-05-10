const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const chTwNumChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾']
const chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
const chnUnitChar = ['', '十', '百', '千']
const chTwUnitChar = ['', '十', '佰', '仟']

const SectionToChinese = (section, isBig5) => {
  let strIns = ''
  let chnStr = ''
  let unitPos = 0
  let zero = true
  let numChar = chnNumChar
  let unitChar = chnUnitChar

  if (isBig5) {
    numChar = chTwNumChar
    unitChar = chTwUnitChar
  }

  while (section > 0) {
    let v = section % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chnStr = numChar[v] + chnStr
      }
    } else {
      zero = false
      strIns = numChar[v]
      strIns += unitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    section = Math.floor(section / 10)
  }
  return chnStr
}

const NumberToChinese = (num, isBig5) => {
  let unitPos = 0
  let strIns = ''
  let chnStr = ''
  let needZero = false
  let numChar = chnNumChar

  if (isBig5) {
    numChar = chTwNumChar
  }

  if (num === 0) {
    return chnNumChar[0]
  }

  while (num > 0) {
    let section = num % 10000
    if (needZero) {
      chnStr = numChar[0] + chnStr
    }
    strIns = SectionToChinese(section, isBig5)
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0]
    chnStr = strIns + chnStr
    needZero = (section < 1000) && (section > 0)
    num = Math.floor(num / 10000)
    unitPos++
  }

  return chnStr
}

export default NumberToChinese
