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
      var model = Backbone.CustomSync.Model.prototype;
      model.attributes = {};

      it("should expose a sync and xhrSync instance method", function () {
        model.should.have.property("sync");
        model.should.have.property("xhrSync");
      });

      describe("#prototype.sync", function () {
        it("should fail if the the procedure method is not found", function (done) {
          model.fetch().then(
            null,
            function (m) {
              m.should.eql(model);
              done();
            }
          );
        });

        it("should reject if the resulting function calls options.error", function (done) {
          model.readSync = function (options) {
            options.error(null);
          };

          model.fetch().then(
            null,
            function (m) {
              m.should.eql(model);
              done();
            }
          );

          delete model.readSync;
        });

        it("should resolve if the resulting function calls options.success", function (done) {
          model.readSync = function (options) {
            options.success({ name: "garrett" });
          };

          model.fetch().then(function (m) {
            m.should.eql(model);
            m.get("name").should.eql("garrett");
            done();
          });

          delete model.readSync;
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
      var collection = Backbone.CustomSync.Collection.prototype;

      collection.length = 0;
      collection.models = [];
      collection._byId = {};

      it("should expose a sync and xhrSync instance method", function () {
        collection.should.have.property("sync");
        collection.should.have.property("xhrSync");
      });

      describe("#prototype.sync", function () {
        it("should fail if the the procedure method is not found", function (done) {
          collection.fetch().then(
            null,
            function (c) {
              c.should.eql(collection);
              done();
            }
          );
        });

        it("should reject if the resulting function calls options.error", function (done) {
          collection.readSync = function (options) {
            options.error(null);
          };

          collection.fetch().then(
            null,
            function (c) {
              c.should.eql(collection);
              done();
            }
          );

          delete collection.readSync;
        });

        it("should resolve if the resulting function calls options.success", function (done) {
          collection.readSync = function (options) {
            options.success([{ name: "garrett" }, { name: "murphey" }]);
          };

          collection.fetch().then(function (c) {
            c.should.eql(collection);
            c.length.should.eql(2);
            done();
          });

          delete collection.readSync;
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
