# Version txt
A node module which generates a txt file in your distribution directory
to verify a deployment onto a server is successful.

# Prerequisites
- node version >= 4.4.6

# Install
```bash
npm install hc-version-txt --save
```

# Configuration
In the root of your project add a version-txt.json file and insert the following:  
```json
{
    "projectName": "hc-digilab",
    "distDirectory": "dist",
    "distFilename": "version.txt"
}
```

# Gulpfile task
Add the following to your gulpfile.js:  
```js
var hcVersionTxt = require('hc-version-txt');

gulp.task('hcVersionTxt', function() {
    hcVersionTxt.buildFile();
});
```

# Example output 
Site: hc-digilab  
Hash: 962e54c  
Date: Sunday, November 26, 2017 4:04 PM  