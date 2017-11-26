# Version txt
A node module which generates a txt file in your distribution directory
to verify a deployment onto a server is successful.

# Prerequisites
- node version >= 4.4.6

# Configuration
In the root of your project add a version-txt.json file and insert the following:  
    
    {
        "projectName": "hc-digilab",
        "distDirectory": "dist",
        "distFilename": "version.txt"
    }
    

# Gulpfile task
Add the following to your gulpfile.js:
    var versionTxt = require('hc-version-txt');

    gulp.task('versionTxt', function() {
        versionTxt.buildFile();
    });

# Example output 
Site: hc-digilab  
Hash: 962e54c  
Date: Sunday, November 26, 2017 4:04 PM  

