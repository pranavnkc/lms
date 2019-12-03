import LocalStorageService from '../utils/LocalStorageService.js';
const AuthService = (function(){
  var _service;
  function _getService() {
    if(!_service) {
      _service = this;
      this.user = LocalStorageService.getUser();
      this.token = LocalStorageService.getAccessToken();
      return _service;
    }
    return _service;
  }

  return {
    getService : _getService
  };
})();
export default AuthService;
