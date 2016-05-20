'use strict';

var fs       = require('fs');
var http     = require('http');
var https    = require('https');
var request  = require('request');
var progress = require('progress');

module.exports = class SuzuDownloader {

  constructor(option) {
    this.option = Object.assign({
      progress: 'bar',
    }, (option === undefined ? {} : option));
  }

  get(param) {
    var outputFile = fs.createWriteStream(param.path);

    (/^https/.test(param.url) ? https : http)
      .get(param.url, (res) =>  {

        res.pipe(outputFile);

        if (this.option.progress) {
          if (param.progress !== undefined) {
            res.on('data', (chunk) => {
              param.progress(chunk.length, parseInt(res.headers['content-length'], 10));
            });
          } else {
            var bar = new progress('  downloading [:bar] :percent :etas', {
              complete: '=',
              incomplete: ' ',
              width: 40,
              total: parseInt(res.headers['content-length'], 10)
            });

            res.on('data', (chunk) => {
              bar.tick(chunk.length);
            });
          }
        }

        if (param.success !== undefined) {
          res.on('end', () => {
            outputFile.close();
            param.success(res);
          });
        }
      })
      .on('error', (error) => {
        if (param.error !== undefined) {
          param.error(error);
        }
      });
  }

};
