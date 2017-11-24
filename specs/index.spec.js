var versionBuilder = require('../index');

describe('versionBuilder.config', function() {
    it('expect versionBuilder.config.version to be 0.0.0', function() {
        expect(versionBuilder.config.version).toBe('0.0.0');
    });

    it('expect versionBuilder.config.version to be hc-digilab', function() {
        expect(versionBuilder.config.author).toBe('hc-digilab');
    });

    it('expect versionBuilder.config.fileSrc to be assets/version.txt', function() {
        expect(versionBuilder.config.fileSrc).toBe('assets/version.txt');
    });

    it('expect versionBuilder.config.fileDist to be dist/', function() {
        expect(versionBuilder.config.fileDist).toBe('dist/');
    });
});

describe('versionBuilder.outputData.get.date()', function() {
    it('expect version versionBuilder.outputData.get.date() to return date value', function() {
        expect(versionBuilder.outputData.get.date()).toBeDefined();
    });
});

describe('versionBuilder.outputData.get.hash()', function() {
    it('expect version versionBuilder.outputData.get.hash() to return hash value', function() {
        expect(versionBuilder.outputData.get.hash()).toBeDefined();
    });
});

describe('versionBuilder.outputData.get.name()', function() {
    it('expect version versionBuilder.outputData.get.name() to return hc-digilab', function() {
        expect(versionBuilder.outputData.get.name()).toEqual('hc-digilab');
    });
});