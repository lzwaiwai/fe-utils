var relProtocol = function relProtocol(value) {
  if (!value) {
    return;
  }
  var res = value.match(/^(?:[^\/]*)\/\/(.+)/);
  res = res ? "//" + res[1] : value;
  return res;
};

export default relProtocol;
