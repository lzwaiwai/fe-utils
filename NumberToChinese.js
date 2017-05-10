var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
var chnUnitChar = ['', '十', '百', '千'];

var SectionToChinese = function SectionToChinese(section) {
  var strIns = '';
  var chnStr = '';
  var unitPos = 0;
  var zero = true;
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
};

var NumberToChinese = function NumberToChinese(num) {
  var unitPos = 0;
  var strIns = '';
  var chnStr = '';
  var needZero = false;

  if (num === 0) {
    return chnNumChar[0];
  }

  while (num > 0) {
    var section = num % 10000;
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = section < 1000 && section > 0;
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
};

export default NumberToChinese;
