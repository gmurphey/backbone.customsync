/* globals exports, require, describe, it */
if (typeof(exports) !== "undefined") {
  var Backbone = require("backbone");

  require("../../backbone.customsync");
  require("should");
}

describe("Backbone", function () {
  it("should expose the CustomSync module", function () {
    Backbone.should.have.property("CustomSync");
  });

  describe("CustomSync", function () {
    it("should expose a Model class", function () {
      Backbone.CustomSync.should.have.property("Model");
    });

    describe("Model", function () {
      var model = Backbone.CustomSync.Model;

      it("should expose a sync and xhrSync instance method", function () {
        model.prototype.should.have.property("sync");
        model.prototype.should.have.property("xhrSync");
      });

      describe("#prototype.sync", function () {
        it("should fail if the the procedure method is not found", function (done) {
          model.prototype.sync("read", model.prototype, {}).then(
            null,
            function (m) {
              m.should.eql(model.prototype);
              done();
            }
          );
        });

        it("should reject if the resulting function calls options.error", function (done) {
          model.prototype.readSync = function (options) {
            options.error(null);
          };

          model.prototype.sync("read", model.prototype, {}).then(
            null,
            function (m) {
              m.should.eql(model.prototype);
              done();
            }
          );

          delete model.prototype.readSync;
        });

        it("should resolve if the resulting function calls options.success", function (done) {
          model.prototype.readSync = function (options) {
            options.success({});
          };

          model.prototype.sync("read", model.prototype, {}).then(function (m) {
            m.should.eql(model.prototype);
            done();
          });

          delete model.prototype.readSync;
        });
      });

      describe("#prototype.xhrSync", function () {
        it("should be a copy of Backbone.Model.prototype.sync", function () {
          Backbone.CustomSync.Model.prototype.xhrSync.should.eql(Backbone.Model.prototype.sync);
        });
      });
    });

    it("should expose a Collection class", function () {
      Backbone.CustomSync.should.have.property("Collection");
    });

    describe("Collection", function () {
      var collection = Backbone.CustomSync.Collection;

      it("should expose a sync and xhrSync instance method", function () {
        collection.prototype.should.have.property("sync");
        collection.prototype.should.have.property("xhrSync");
      });

      describe("#prototype.sync", function () {
        it("should fail if the the procedure method is not found", function (done) {
          collection.prototype.sync("read", collection.prototype, {}).then(
            null,
            function (c) {
              c.should.eql(collection.prototype);
              done();
            }
          );
        });

        it("should reject if the resulting function calls options.error", function (done) {
          collection.prototype.readSync = function (options) {
            options.error(null);
          };

          collection.prototype.sync("read", collection.prototype, {}).then(
            null,
            function (c) {
              c.should.eql(collection.prototype);
              done();
            }
          );

          delete collection.prototype.readSync;
        });

        it("should resolve if the resulting function calls options.success", function (done) {
          collection.prototype.readSync = function (options) {
            options.success({});
          };

          collection.prototype.sync("read", collection.prototype, {}).then(function (c) {
            c.should.eql(collection.prototype);
            done();
          });

          delete collection.prototype.readSync;
        });
      });

      describe("#prototype.xhrSync", function () {
        it("should be a copy of Backbone.Collection.prototype.sync", function () {
          Backbone.CustomSync.Collection.prototype.xhrSync.should.eql(Backbone.Collection.prototype.sync);
        });
      });
    });
  });
});
