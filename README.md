# fe-utils v1.0.4
  collect all kinds of utility functions that are often used by us.

## Installation

#### In a browser:
```html
<script src="fe-utils.js"></script>
```

#### Using npm:
```shell
$ npm i -g npm
$ npm i --save fe-utils
```

#### Usage:
```js
// Load method categories.
var cookie = require('fe-utils/cookie')
var date = require('fe-utils/date')
...
```

#### allMethods:
1. **NumberToChinese**
    * ```NumberToChinese(12345) // '一万二千三百四十五'```
    * ```NumberToChinese(12345, true) // '壹万贰仟叁佰肆十伍'```
2. **cookie**
    * ```setCookie(name, domain, domain, expiredays)```
    * ```getCookie(name)```
    * ```delCookie(name, domain)```
3. **date**
    * ```dateFormat() // dateFormat(new Date(), 'YYYY年MM月DD日 hh:mm:ss')```
4. **detectedInfos**
    * isAndroid / isIOS / isWindowPhone / isWX / isWeibo / isMobile / isPC
5. **preventViewScroll**
    * <https://github.com/lzwaiwai/preventViewScroll>
6. **urlQuery**
    * ```queryOne // queryOne('name', ['http://xx.com?name=kevin']) -> 'kevin'```
    * ```queryAll // queryOne('http://xx.com?name=kevin&age=18') -> {name: 'kevin', age: 18}```
7. **toRoman**
    * ```toRoman(25) // 'XXV'```
8. **getVersionOfIOS**

