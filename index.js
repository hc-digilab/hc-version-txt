// ---------------------------------------------------------------------------------------
// Module Dependencies
// ---------------------------------------------------------------------------------------
var fs       = require('fs-extra'),
    gitState = require('git-state'),
    path     = require('path'),
    moment   = require('moment');


// ---------------------------------------------------------------------------------------
// Config Dependencies
// ---------------------------------------------------------------------------------------
var projectPath = process.cwd(),
    projectConfig = require(path.join(projectPath, '.hc-version-txt.json'));

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
                return gitState.commitSync(projectPath);
            },
            version: function() {
                return gitState.branchSync(projectPath);
            },
            name: function() {
                return projectConfig.name;
            },
            fileDist: function() {
                return projectConfig.location + '/' + projectConfig.filename;
            }
        }
    },

    buildFile: function() {

        var content =   'Site: ' + versionBuilder.support.get.name() + '\n' +
                        'Hash: ' + versionBuilder.support.get.hash() + '\n' +
                        'Date: ' + versionBuilder.support.get.date() + '\n' +
                        'Version: ' + versionBuilder.support.get.version();

        fs.writeFileSync(path.join(projectPath, versionBuilder.support.get.fileDist()), content, 'utf8', function(err) {
            if(err) {
                throw(err);
            }
        });

    }
}

// uncomment to test
// versionBuilder.buildFile();
module.exports = versionBuilder;
