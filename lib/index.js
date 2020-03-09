"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _dockerHubApi = require("docker-hub-api");

var _dockerHubApi2 = _interopRequireDefault(_dockerHubApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function update_description() {
  var info = await _dockerHubApi2.default.login(process.env.DOCKERHUB_USERNAME, process.env.DOCKERHUB_PASSWORD);
  _dockerHubApi2.default.setLoginToken(info.token);
  var filePath = process.env.README_PATH || _path2.default.join("./", "README.md");
  var json = JSON.stringify({
    full: _fs2.default.readFileSync(filePath, { encoding: "utf-8" }),
    short: process.env.SHORT_DESCRIPTION || undefined
  });

  try {
    var response = _dockerHubApi2.default.setRepositoryDescription(process.env.DOCKERHUB_REPO_PREFIX || process.env.DOCKERHUB_USERNAME, process.env.DOCKERHUB_REPO_NAME || process.env.DOCKERHUB_REPO, JSON.parse(json));
    console.table(response);
  } catch (e) {
    console.error(e);
  }
}

update_description();