var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var chTwNumChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾'];
var chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
var chnUnitChar = ['', '十', '百', '千'];
var chTwUnitChar = ['', '十', '佰', '仟'];

var SectionToChinese = function SectionToChinese(section, isBig5) {
  var strIns = '';
  var chnStr = '';
  var unitPos = 0;
  var zero = true;
  var numChar = chnNumChar;
  var unitChar = chnUnitChar;

  if (isBig5) {
    numChar = chTwNumChar;
    unitChar = chTwUnitChar;
  }

  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = numChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = numChar[v];
      strIns += unitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
};

var NumberToChinese = function NumberToChinese(num, isBig5) {
  var unitPos = 0;
  var strIns = '';
  var chnStr = '';
  var needZero = false;
  var numChar = chnNumChar;

  if (isBig5) {
    numChar = chTwNumChar;
  }

  if (num === 0) {
    return chnNumChar[0];
  }

  while (num > 0) {
    var section = num % 10000;
    if (needZero) {
      chnStr = numChar[0] + chnStr;
    }
    strIns = SectionToChinese(section, isBig5);
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = section < 1000 && section > 0;
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
};

export default NumberToChinese;
