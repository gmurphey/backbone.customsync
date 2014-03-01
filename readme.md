# Backbone.CustomSync

[![Build Status](https://travis-ci.org/gmurphey/Backbone.CustomSync.png?branch=master)](https://travis-ci.org/gmurphey/Backbone.CustomSync)

Backbone.CustomSync is a Backbone.js plugin that allows you to write custom methods for all sync procedures ("read", "create", "update", and "delete"), or only those that you define.

## Features

- AMD, CommonJS and Global compliant
- Compatible with promise-based syncing
- Preserves original `sync` functionality with an `xhrSync` method

## Getting Started

Backbone.CustomSync can be used in both front-end and node applications.

### Bower

    bower install -S backbone.customsync

### NPM

    npm install --save backbone.customsync

### Usage

Backbone.CustomSync exposes an extended `Model` and `Collection` with `Backbone.CustomSync.Model` and `Backbone.CustomSync.Collection`.

``` javascript
var Todo = Backbone.CustomSync.Model.extend({

  // called by fetch
  readSync: function (options) {
    if (successful) {
      options.success(response, options);
    } else {
      options.error(response, options);
    }
  },

  // called by create and save (if the model is new)
  createSync: function (options) {
    if (successful) {
      options.success(response, options);
    } else {
      options.error(response, options);
    }
  },

  // called by save
  updateSync: function (options) {
    if (successful) {
      options.success(response, options);
    } else {
      options.error(response, options);
    }
  },

  // called by destroy
  deleteSync: function (options) {
    if (successful) {
      options.success(response, options);
    } else {
      options.error(response, options);
    }
  }

});
```
