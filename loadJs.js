var loadJs = function loadJs(url, callback) {
  var haveJs = false;
  var aScript = document.getElementsByTagName('script');
  for (var i = 0, len = aScript.length; i < len; i++) {
    if (aScript[i].getAttribute('src') === url) {
      haveJs = true;
      break;
    }
  }

  if (!haveJs) {
    var oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.setAttribute('src', url);
    document.body.appendChild(oScript);

    if (oScript.readyState) {
      // IE
      oScript.onreadystatechange = function () {
        if (oScript.readyState === 'loaded' || oScript.readyState === 'complete') {
          oScript.onreadystatechange = null;
          callback && callback();
        }
      };
    } else {
      // Others
      oScript.onload = function () {
        callback && callback();
      };
    }

    oScript.onerror = function (event) {
      console.error('The script ' + event.target.src + ' is not accessible.');
    };
  } else {
    callback && callback();
  }
};

export default loadJs;
