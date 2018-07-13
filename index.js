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
            site: (dynamicConfig) => {
                let site;

                if (dynamicConfig && dynamicConfig.projectName) {
                    site = dynamicConfig.projectName;
                } else {
                    site = projectConfig.projectName;
                }

                return site;
            },
            fileSrc: (fileType) => {
                return path.join(__dirname, `assets/version.${fileType}`);
            },
            fileDist: (fileType, dynamicConfig) => {
                let fileDistDir;

                if (dynamicConfig && dynamicConfig.distDirectory) {
                    fileDistDir = dynamicConfig.distDirectory;
                } else {
                    fileDistDir = projectConfig.distDirectory;
                }

                return `${path.join(projectPath, fileDistDir)}/${projectConfig.distFilename}.${fileType}`;
            },
            customData: (dynamicConfig) => {
                let data;

                if (dynamicConfig && dynamicConfig.customData) {
                    data = [];

                    Object.keys(dynamicConfig.customData).forEach((key) => {
                        data.push(`${key}: ${dynamicConfig.customData[key]}`);
                    });

                    data = data.toString().replace(',', '\n');
                } else {
                    data = '';
                }

                return data;
            }
        }
    },

    buildFile: function(dynamicConfig = null) {
        try {
            let data;
            
            projectConfig.distFiletypes.forEach((fileType) => {
                data = fs.readFileSync(versionBuilder.support.get.fileSrc(fileType), 'utf8');
                
                data = data.replace('{{site}}', versionBuilder.support.get.site(dynamicConfig));
                data = data.replace('{{date}}', versionBuilder.support.get.date());
                data = data.replace('{{hash}}', versionBuilder.support.get.hash());
                data = data.replace('{{branch}}', versionBuilder.support.get.branch());
                data = data.replace('{{customData}}',  versionBuilder.support.get.customData(dynamicConfig));

                fs.outputFileSync(versionBuilder.support.get.fileDist(fileType, dynamicConfig), data, encoding='utf8');
            });
        } catch (ex) {
            console.log(ex);
        }
    }
}

// uncomment to test
// versionBuilder.buildFile({ 
//     projectName: 'hc-digilab',
//     distDirectory: 'dist/hc-digilab'
// });
module.exports = versionBuilder;
