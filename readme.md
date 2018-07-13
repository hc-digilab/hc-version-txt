[![npm](https://img.shields.io/badge/npm-%3E%3D5.0.0-brightgreen.svg)](https://npmjs.org/en/)
[![node](https://img.shields.io/badge/node-%3E%3D8.0.0-brightgreen.svg)](https://nodejs.org/en/)
[![Unit tests](https://img.shields.io/badge/Unit%20tests-passed-brightgreen.svg)](https://jasmine.github.io/)

# Version txt/json
A node module which generates a txt/json file in your distribution directory which in turn gets deployed to your server and could then be viewed e.g yourdomain.com/version.txt or yourdomain.com/version.json this will then allow you to verify your deployment onto a server.

# Prerequisites
- node version >= 8.0.0

# Install
```bash
npm install hc-version-txt --save
```

# Configuration
In the root of your project add a '.version-txt.json' file and insert the following:

- projectName is required (can be defined in the config or passed in through buildFile function)
- distDirectory is required (can be defined in the config or passed in through buildFile function)
- distFilename is required
- distFiletypes is required (can be the following values ["json", "txt"] || ["json"] || ["txt"]

```json
{
    "$schema": "./node_modules/hc-version-txt/assets/schema.json",
    "projectName": "hc-digilab",
    "distDirectory": "dist",
    "distFilename": "version",
    "distFiletypes": ["json", "txt"]
}
```

# Gulpfile task
Add the following to your gulpfile.js:  
```js
const hcVersionTxt = require('hc-version-txt');

gulp.task('hcVersionTxt', function() {
    
    // picks up the projectName from the config file 
    hcVersionTxt.buildFile();

    // pass in the projectName as a parameter
    // pass in the distDirectory as a parameter
    hcVersionTxt.buildFile({ 
        projectName: 'example',
        distDirectory: 'dist/example'
    });
});
```

# Node script
Add the following to your node script  
```js
const hcVersionTxt = require('hc-version-txt');

 // picks up the projectName from the config file 
hcVersionTxt.buildFile();

// pass in the projectName as a parameter
// pass in the distDirectory as a parameter
hcVersionTxt.buildFile({ 
    projectName: 'example' ,
    distDirectory: 'dist/example'
});
```


# Example txt output 
```
Site: hc-digilab

Deployment
Date: 28/05/2018 17:48PM
Branch: develop
Hash: ef13c39
```

# Example json output
```json
{
    "site": "hc-digilab",
    "deployment": {
        "date": "28/05/2018 17:48PM",
        "branch": "develop",
        "hash": "ef13c39"
    }
}
```