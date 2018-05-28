// ---------------------------------------------------------------------------------------
// Module Dependencies
// ---------------------------------------------------------------------------------------
const fs       = require('fs-extra'),
      git      = require('git-rev-sync'),
      gitState = require('git-state'), 
      path     = require('path'),
      moment   = require('moment');

// ---------------------------------------------------------------------------------------
// Config Dependencies
// ---------------------------------------------------------------------------------------
const projectPath = process.cwd(),
      projectConfig = require(path.join(projectPath, '.version-txt.json'));

// ---------------------------------------------------------------------------------------
// Version Builder Module
// ---------------------------------------------------------------------------------------
const versionBuilder = {

    support: {
        get: {
            date: () => {
                return moment().format('DD/MM/YYYY HH:mmA').toString();
            },
            hash: () => {
                let hash;

                if (gitState.isGitSync(projectPath)) {
                    hash = git.short();
                } else {
                    hash = 'unavailable';
                }

                return hash;
            },
            branch: () => {
                let branch;

                if (gitState.isGitSync(projectPath)) {
                    branch = git.branch();
                } else {
                    branch = 'unavailable';
                }

                return branch;
            },
            site: () => {
                return projectConfig.projectName;
            },
            fileSrc: (fileType) => {
                return path.join(__dirname, `assets/version.${fileType}`);
            },
            fileDist: (fileType) => {
                return `${path.join(projectPath, projectConfig.distDirectory)}/${projectConfig.distFilename}.${fileType}`;
            }
        }
    },

    buildFile: function() {
        try {

            let data;

            if (projectConfig.distTypes) {
                projectConfig.distTypes.forEach((fileType) => {
                    data = fs.readFileSync(versionBuilder.support.get.fileSrc(fileType), 'utf8');

                    data = data.replace('{{site}}', versionBuilder.support.get.site());
                    data = data.replace('{{date}}', versionBuilder.support.get.date());
                    data = data.replace('{{hash}}', versionBuilder.support.get.hash());
                    data = data.replace('{{branch}}', versionBuilder.support.get.branch());

                    fs.outputFileSync(versionBuilder.support.get.fileDist(fileType), data, encoding='utf8');
                });
            }
        } catch (ex) {
            console.log(ex);
        }
    }
}

// uncomment to test
versionBuilder.buildFile();
// module.exports = versionBuilder;
