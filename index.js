// --------------------------------------------------
// Dependencies
// --------------------------------------------------
var moment = require('moment'),
    git    = require('git-rev-sync');

// --------------------------------------------------
// Version Builder Module
// --------------------------------------------------
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
                return git.short() ? git.short() : '12345'
            }
        }
    },

    outputFile: {
        src: 'assets/version.txt',
        dist: 'dist/'
    }   
};

module.exports = versionBuilder;