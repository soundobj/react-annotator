// Generated by CoffeeScript 1.9.3
(function() {
  var Store,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Annotator.Plugin.Offline.Store = Store = (function(superClass) {
    extend(Store, superClass);

    function Store() {
      return Store.__super__.constructor.apply(this, arguments);
    }

    Store.KEY_PREFIX = "annotator.offline/";

    Store.CACHE_DELIMITER = "--cache--";

    Store.localStorage = window.localStorage;

    Store.isSupported = function() {
      var e;
      try {
        return "localStorage" in window && window["localStorage"] !== null;
      } catch (_error) {
        e = _error;
        return false;
      }
    };

    Store.now = function() {
      return new Date().getTime();
    };

    Store.prototype.all = function(partial) {
      var key, prefix, value, values;
      if (partial == null) {
        partial = "";
      }
      values = [];
      prefix = this.prefixed(partial);
      for (key in localStorage) {
        if (!(key.indexOf(prefix) === 0)) {
          continue;
        }
        value = this.get(key.slice(Store.KEY_PREFIX.length));
        values.push(value);
      }
      return values;
    };

    Store.prototype.get = function(key) {
      var value;
      value = Store.localStorage.getItem(this.prefixed(key));
      if (value) {
        value = this.checkCache(value);
        if (!value) {
          this.remove(key);
        }
      }
      return JSON.parse(value);
    };

    Store.prototype.set = function(key, value, time) {
      var error;
      value = JSON.stringify(value);
      if (time) {
        value = (Store.now() + time) + Store.CACHE_DELIMITER + value;
      }
      try {
        Store.localStorage.setItem(this.prefixed(key), value);
      } catch (_error) {
        error = _error;
        this.publish('error', [error, this]);
      }
      return this;
    };

    Store.prototype.remove = function(key) {
      Store.localStorage.removeItem(this.prefixed(key));
      return this;
    };

    Store.prototype.clear = function() {
      var key, localStorage;
      localStorage = Store.localStorage;
      for (key in localStorage) {
        if (key.indexOf(Store.KEY_PREFIX) === 0) {
          localStorage.removeItem(key);
        }
      }
      return this;
    };

    Store.prototype.prefixed = function(key) {
      return Store.KEY_PREFIX + key;
    };

    Store.prototype.checkCache = function(value) {
      var cached;
      if (value.indexOf(Store.CACHE_DELIMITER) > -1) {
        cached = value.split(Store.CACHE_DELIMITER);
        value = Store.now() > cached.shift() ? null : cached.join(Store.CACHE_DELIMITER);
      }
      return value;
    };

    return Store;

  })(Annotator.Delegator);

}).call(this);

//# sourceMappingURL=store.js.map
