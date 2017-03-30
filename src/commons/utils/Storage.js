/**
 * @file Storage
 * Created by haner on 2017/3/30.
 * @brief
 */

export default Storage = (function () {
  return {
    TOKEN: 'com.parkingwang.user.token',
    get: function (key, isSession) {
      if (!Storage.isLocalStorage()) {
        return undefined;
      }
      let value = Storage.getStorage(isSession).getItem(key);
      if (value) return JSON.parse(value);
      return undefined;
    },
    set: function (key, value, isSession) {
      if (!Storage.isLocalStorage()) {
        return undefined;
      }
      value = JSON.stringify(value);
      Storage.getStorage(isSession).setItem(key, value);
    },
    remove: function (key, isSession) {
      if (!Storage.isLocalStorage()) return undefined;
      Storage.getStorage(isSession).removeItem(key);
    },
    getStorage: function (isSession) {
      return isSession ? sessionStorage : localStorage;
    },
    isLocalStorage: function () {
      try {
        if (!window.localStorage) {
          console.warn('不支持本地存储');
          return false;
        }
        return true;
      } catch (e) {
        console.warn('本地存储已关闭');
        return false;
      }
    }
  };
})();

