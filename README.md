# fe-utils
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
```javascript
// Load method categories.
var cookie = require('fe-utils/cookie')
var date = require('fe-utils/date')
...
```

#### allMethods:
1. **NumberToChinese**

    ```javascript
    NumberToChinese(12345) // '一万二千三百四十五'
    NumberToChinese(12345, true) // '壹万贰仟叁佰肆十伍'
    ```
2. **cookie**

   ```javascript
   setCookie(name, domain, domain, expiredays)
   getCookie(name)
   delCookie(name, domain)
   ```
3. **date**

   ```javascript
   dateFormat() // dateFormat(new Date(), 'YYYY年MM月DD日 hh:mm:ss')
   ```
4. **detectedInfos**

    ```javascript
    isAndroid / isIOS / isWindowPhone / isWX / isWeibo / isMobile / isPC
    ```
5. **preventViewScroll**

    <https://github.com/lzwaiwai/preventViewScroll>
6. **urlQuery**

    ```javascript
    const url = 'http://live.tinfinite.com:8080/path/chat-studio.html?liveshowId=592e4e2bf84e6e26c1cf97dd&group=live#123'
    queryOne
        // queryOne('liveshowId', url) -> '592e4e2bf84e6e26c1cf97dd'
    queryAll
        // queryAll(url) -> { liveshowId: '592e4e2bf84e6e26c1cf97dd', group: 'live' }
    update
        // update({ group: 'voice', referer: 'list' }, url) ->
        // {
                query: {
                    liveshowId: '592e4e2bf84e6e26c1cf97dd',
                    group: 'voice',
                    referer: 'list'
                },
                url: 'http://live.tinfinite.com:8080/path/chat-studio.html?liveshowId=592e4e2bf84e6e26c1cf97dd&group=voice&referer=list#123'
            }
    del
        // del('liveshowId', url) ->
        // {
                query: {
                    group: 'live'
                },
                url: 'http://live.tinfinite.com:8080/path/chat-studio.html?group=live#123'
            }

        // del(['liveshowId', 'group'], url) ->
        // {
                query: {},
                search: 'http://live.tinfinite.com:8080/path/chat-studio.html#123'
            }
    ```
7. **toRoman**

    ```javascript
    toRoman(25) // 'XXV'
    ```
8. **getVersionOfIOS**

    ```javascript
    getVersionOfIOS() // '10.3'
    ```
9. **relProtocol**

    ```javascript
    relProtocol('http://xxx.com') // '//xxx.com'
    ```
9. **logger**
    <img src="http://o4a7cbihz.qnssl.com/cover/4ec91a4e-e638-4753-9f6a-9cee4e715420" width = "250"  align="center" />
10. **mediaError**

    ```javascript
    mediaError(video / audio, (code, msg) => { ... })  // for error-listener-callback of audio and video
    ```
11. **loadJs**

    ```javascript
     loadJs(url, callback)
    ```

----
### Thank to [A-Dan](https://github.com/oneMoreTime1357), [shaoyishou](https://github.com/shaoyishou), [Div](https://github.com/div-wang)
