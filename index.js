// ---------------------------------------------------------------------------------------
// Module Dependencies
// ---------------------------------------------------------------------------------------
var fs       = require('fs-extra'),
    git      = require('git-rev-sync'),
    gitState = require('git-state'), 
    path     = require('path'),
    moment   = require('moment');


// ---------------------------------------------------------------------------------------
// Config Dependencies
// ---------------------------------------------------------------------------------------
var projectConfig = require(path.join(__dirname, 'version-txt.json')),
    projectPath = process.cwd();

// ---------------------------------------------------------------------------------------
// Version Builder Module
// ---------------------------------------------------------------------------------------
var versionBuilder = {

    config: {
        version: '0.0.0',
        author: 'hc-digilab'
    },

    support: {
        get: {
            date: function() {
                return moment().format('LLLL').toString();
            },
            hash: function() {
                var hash;

                if (gitState.isGitSync(projectPath)) {
                    hash = git.short();
                } else {
                    hash = 'unavailable';
                }

                return hash;
            },
            name: function() {
                return projectConfig.projectName;
            },
            fileSrc: function() {
                return path.join(__dirname, 'assets/version.txt');
            },
            fileDist: function() {
                return path.join(projectPath, projectConfig.distDirectory) + '/' + projectConfig.distFilename;
            }
        }
    },

    buildFile: function() {
        try {
            fs.readFile(versionBuilder.support.get.fileSrc(), encoding='utf8', function(err, data) {
                
                if (err) {
                    return console.log(error);
                }
    
                if (data) {
                    if (data.indexOf('{{siteName}}') > -1) {
                        data = data.replace('{{siteName}}', versionBuilder.support.get.name());
                    }
        
                    if (data.indexOf('{{commitHash}}') > -1) {
                        data = data.replace('{{commitHash}}', versionBuilder.support.get.hash());
                    }
        
                    if (data.indexOf('{{buildDate}}') > -1) {
                        data = data.replace('{{buildDate}}', versionBuilder.support.get.date());
                    }
    
                    fs.outputFileSync(versionBuilder.support.get.fileDist(), data, encoding='utf8');
                }
            });
        } catch (ex) {
            console.log(ex);
        }
    }
}

// uncomment to test
// versionBuilder.buildFile();
module.exports = versionBuilder;
