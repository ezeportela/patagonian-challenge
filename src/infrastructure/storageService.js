const LocalStorage = require('node-localstorage').LocalStorage;
const os = require('os');
const _storage = new LocalStorage(os.tmpdir());

class StorageService {
  setItem(key, content) {
    return _storage.setItem(createKeyName(key), content);
  }

  getItem(key) {
    const item = _storage.getItem(key);

    if (!item) return null;

    return item;
  }

  removeItem(key) {
    return _storage.removeItem(key);
  }
}

module.exports = StorageService;
