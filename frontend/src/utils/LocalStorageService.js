const LocalStorageService = (function(){
  var _service;
  function _getService() {
    if(!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(token, user) {
    localStorage.setItem('token', token);
    _setUser(user);
  }
  function _setUser(user) {
    return localStorage.setItem('user', JSON.stringify(user));
  }
  function _getAccessToken() {
    return localStorage.getItem('token');
  }
  function _getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  function _clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  return {
    getService : _getService,
    setToken : _setToken,
    setUser:_setUser,
    getAccessToken : _getAccessToken,
    clearToken : _clearToken,
    getUser:_getUser,

  };
})();
export default LocalStorageService;
