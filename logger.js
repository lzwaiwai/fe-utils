var colors = {
  success: '#5cb85c',
  info: '#5bc0de',
  warn: '#f0ad4e',
  error: '#d9534f'
};

var logger = {
  log: function log() {
    var _console;

    console && (_console = console).log.apply(_console, arguments);
  },
  success: function success() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    console && console.log('%c' + params.join(' '), 'color: ' + colors.success + ';');
  },
  info: function info() {
    for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }

    console && console.log('%c' + params.join(' '), 'color: ' + colors.info + ';');
  },
  warn: function warn() {
    for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      params[_key3] = arguments[_key3];
    }

    console && console.log('%c' + params.join(' '), 'color: ' + colors.warn + ';');
  },
  error: function error() {
    for (var _len4 = arguments.length, params = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      params[_key4] = arguments[_key4];
    }

    console && console.log('%c' + params.join(' '), 'color: ' + colors.error + ';');
  },
  group: function group(groupTip, logs, notCollapsed) {
    if (!groupTip || !logs) {
      return;
    }
    var startMessage = notCollapsed ? console.group : console.groupCollapsed;

    try {
      startMessage.call(console, groupTip);
    } catch (e) {
      console.log(groupTip);
    }

    logs();

    try {
      console.groupEnd();
    } catch (e) {
      console.log('—— log end ——');
    }
  }
};

export default logger;
