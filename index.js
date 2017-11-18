// ---------------------------------------------------------------------------------------
// Module Dependencies
// ---------------------------------------------------------------------------------------
var fs     = require('fs'),
    git    = require('git-rev-sync'),
    moment = require('moment');

// ---------------------------------------------------------------------------------------
// Config Dependencies
// ---------------------------------------------------------------------------------------
var config = require('./version-txt');

// ---------------------------------------------------------------------------------------
// Version Builder Module
// ---------------------------------------------------------------------------------------
var versionBuilder = {

    config: {
        version: '0.0.0',
        author: 'hc-digilab'
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
                return config.name;
            }
        }
    },

    outputFile: {
        src: 'assets/version.txt',
        dist: config.dist
    },

    buildFile: {
        
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