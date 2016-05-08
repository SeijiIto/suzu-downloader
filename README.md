# suzu-downloader

## Usage

```bash
npm install suzu-downloader
```

```javascript
var suzuDownloader = require('suzu-downloader');

var downloader = new suzuDownloader();

downloader.get({
  url: 'http://example.com/movie.mp4',
  path: './movie.mp4',
  success: function() {
    console.log('finish');
  },
  error: function() {
    console.log('error');
  }
});
```
