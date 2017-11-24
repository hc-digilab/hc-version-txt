// ---------------------------------------------------------------------------------------
// Module Dependencies
// ---------------------------------------------------------------------------------------
var fs     = require('fs'),
    git    = require('git-rev-sync'),
    moment = require('moment');


// ---------------------------------------------------------------------------------------
// Config Dependencies
// ---------------------------------------------------------------------------------------
var projectConfig = require('./version-txt');

// ---------------------------------------------------------------------------------------
// Version Builder Module
// ---------------------------------------------------------------------------------------
var versionBuilder = {

    config: {
        version: '0.0.0',
        author: 'hc-digilab',
        fileSrc: 'assets/version.txt',
        fileDist: projectConfig.distDirectory
    },

    outputData: {
        get: {
            date: function() {
                return moment().format('LLLL').toString();
            },
            hash: function() {
                return git.short();
            },
            name: function() {
                return projectConfig.projectName;
            }
        }
    },

    buildFile: {

        init: function() {
            versionBuilder.buildFile.readSrcFile();
        },
        
        readSrcFile: function() {
            versionBuilder.buildFile.updateFile(fs.readFileSync('assets/version.txt', encoding='utf8'));
        },

        updateFile: function(data) {
            if (data.indexOf('{{siteName}}') > -1) {
                data = data.replace('{{siteName}}', versionBuilder.outputData.get.name());
            }

            if (data.indexOf('{{commitHash}}') > -1) {
                data = data.replace('{{commitHash}}', versionBuilder.outputData.get.hash());
            }

            if (data.indexOf('{{buildDate}}') > -1) {
                data = data.replace('{{buildDate}}', versionBuilder.outputData.get.date());
            }

            versionBuilder.buildFile.writeDistFile(data);
        },

        writeDistFile: function(data) {
            fs.writeFileSync('output.txt', data, encoding='utf8');
        }
    }
};

module.exports = versionBuilder;