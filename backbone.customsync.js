/* globals define, require */
(function (root, factory) {
  if (typeof(define) === 'function' && define.amd) {
    define(['backbone', 'underscore', 'jquery'], function (Backbone, _, jQuery) {
      factory(Backbone, _, jQuery.Deferred);
    });
  } else if (typeof(exports) !== 'undefined') {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        RSVP = require('rsvp');

    factory(Backbone, _, RSVP.defer);
  } else {
    factory(root.Backbone, root._, root.jQuery.Deferred);
  }
} (this, function (Backbone, _, Deferred) {
  var customSync = function (type, model, options) {
    var dfd = new Deferred(),
        promise = (typeof(dfd.promise) === 'function') ? dfd.promise() : dfd.promise,
        method = type + 'Sync',
        success = options.success,
        error = options.error;

    options.success = function (resp) {
      if (success) {
        success(resp);
      }
      dfd.resolve(model);
    };

    options.error = function (resp) {
      if (error) {
        error(resp);
      }

      dfd.reject(model);
    };

    if (typeof(this[method]) === 'function') {
      model.trigger('request', model, promise, options);
      this[method].call(this, options);
    } else {
      options.error(null);
    }

    return promise;
  };

  _.extend(Backbone, {
    CustomSync: {
      Model: Backbone.Model.extend({
        sync: customSync,
        xhrSync: Backbone.Model.prototype.sync
      }),

      Collection: Backbone.Collection.extend({
        sync: customSync,
        xhrSync: Backbone.Collection.prototype.sync
      })
    }
  });
}));
