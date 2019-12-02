const LocalStorageService = (function(){
  var _service;
  function _getService() {
    if(!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(token) {
    localStorage.setItem('token', token);
  }
  function _getAccessToken() {
    return localStorage.getItem('token');
  }
  function _clearToken() {
    localStorage.removeItem('token');
  }
  return {
    getService : _getService,
    setToken : _setToken,
    getAccessToken : _getAccessToken,
    clearToken : _clearToken
  };
})();
export default LocalStorageService;
