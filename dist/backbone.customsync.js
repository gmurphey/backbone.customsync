/*! backbone.customsync - v0.2.2 - 2014-03-10
* Copyright (c) 2014 ; Licensed  */
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
        method = type + "Sync",
        success = options.success,
        error = options.error;

    options.success = function (response) {
      if (success) {
        success(model, response, options);
      }
      dfd.resolve(model);
    };

    options.error = function (response) {
      if (error) {
        error(model, response, options);
      }
      dfd.reject(model);
    };

    if (typeof(this[method]) === "function") {
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
