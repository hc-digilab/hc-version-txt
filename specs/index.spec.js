var versionBuilder = require('../index');

describe('versionBuilder.config', function() {
    it('expect versionBuilder.config.version to be 0.0.0', function() {
        expect(versionBuilder.config.version).toBe('0.0.0');
    });

    it('expect versionBuilder.config.version to be hc-digilab', function() {
        expect(versionBuilder.config.author).toBe('hc-digilab');
    });
});

describe('versionBuilder.support', function() {

    it('expect version versionBuilder.support.get.date() to return date value', function() {
        expect(versionBuilder.support.get.date()).toBeDefined();
    });

    it('expect version versionBuilder.support.get.hash() to return hash value', function() {
        expect(versionBuilder.support.get.hash()).toBeDefined();
    });

    it('expect version versionBuilder.support.get.name() to return name value', function() {
        expect(versionBuilder.support.get.name()).toBeDefined();
    });

    it('expect version versionBuilder.support.get.fileDist() to return path', function() {
        expect(versionBuilder.support.get.fileDist()).toBeDefined();
        expect(versionBuilder.support.get.fileDist()).toEqual('dist/version.txt');
    });
});
