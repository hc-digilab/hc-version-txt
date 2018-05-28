const versionBuilder = require('../index');

describe('versionBuilder.support', function() {

    it('expect version versionBuilder.support.get.date() to return date value', function() {
        expect(versionBuilder.support.get.date()).toBeDefined();
    });

    it('expect version versionBuilder.support.get.hash() to return hash value', function() {
        expect(versionBuilder.support.get.hash()).toBeDefined();
    });

    it('expect version versionBuilder.support.get.site() to return hc-digilab', function() {
        expect(versionBuilder.support.get.site()).toEqual('hc-digilab');
    });

    it('expect version versionBuilder.support.get.fileSrc() to return fileSrc path', function() {
        expect(versionBuilder.support.get.fileSrc('txt')).toContain('/assets/version.txt');
        expect(versionBuilder.support.get.fileSrc('json')).toContain('/assets/version.json');
    });

    it('expect version versionBuilder.support.get.fileDist() to return fileDist path', function() {
        expect(versionBuilder.support.get.fileDist('txt')).toContain('/dist/version.txt');
        expect(versionBuilder.support.get.fileDist('json')).toContain('/dist/version.json');
    });
});