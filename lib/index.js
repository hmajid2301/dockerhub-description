"use strict";

var update_description = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var info, filePath, json, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _dockerHubApi2.default.login(process.env.DOCKERHUB_USERNAME, process.env.DOCKERHUB_PASSWORD);

          case 2:
            info = _context.sent;

            _dockerHubApi2.default.setLoginToken(info.token);
            filePath = process.env.README_PATH || _path2.default.join("./", "README.md");
            json = JSON.stringify({
              full: _fs2.default.readFileSync(filePath, { encoding: "utf-8" })
            });
            _context.next = 8;
            return _dockerHubApi2.default.setRepositoryDescription(process.env.DOCKERHUB_REPO_PREFIX || process.env.DOCKERHUB_USERNAME, process.env.DOCKERHUB_REPO_NAME || process.env.DOCKERHUB_REPO, JSON.parse(json));

          case 8:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function update_description() {
    return _ref.apply(this, arguments);
  };
}();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _dockerHubApi = require("docker-hub-api");

var _dockerHubApi2 = _interopRequireDefault(_dockerHubApi);

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

update_description().then(function (response) {
  console.log(JSON.stringify({ response: response }, null, 4));
}).catch(function (error) {
  console.log(error);
  process.exit(1);
});