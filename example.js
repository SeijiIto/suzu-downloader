var suzuDownloader = require("./index.js");

var downloader = new suzuDownloader();

downloader.get({
  url: process.argv[2],
  path: process.argv[3],
  success: function() {
    console.log('success');
  },
  error: function() {
    console.log('error');
  }
});
