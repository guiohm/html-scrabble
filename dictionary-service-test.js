const DictionaryService = require('./dictionary-service');

const trie = '{"A":{"A":{"end":true,"L":{"E":{"N":{"I":{"E":{"N":{"end":true,"N":{"E":{"end":true,"S":{"end":true}}},"S":{"end":true}}}}}}},"S":{"end":true}},"B":{"A":{"C":{"A":{"end":true,"S":{"end":true}},"O":{"S":{"T":{"end":true,"S":{"end":true}}}},"U":{"L":{"E":{"end":true,"S":{"end":true}}}}},"I":{"S":{"S":{"A":{"end":true,"B":{"L":{"E":{"end":true,"S":{"end":true}}}},"I":{"end":true,"E":{"N":{"T":{"end":true}}},"S":{"end":true},"T":{"end":true}},"M":{"E":{"S":{"end":true}}},"N":{"T":{"end":true,"E":{"end":true,"S":{"end":true}},"S":{"end":true}}},"S":{"end":true,"S":{"E":{"end":true,"N":{"T":{"end":true}},"S":{"end":true}},"I":{"E":{"Z":{"end":true}},"O":{"N":{"S":{"end":true}}}}}}}}}}}}}}';


exports.loadTestDict = function(test) {
    const svc = new DictionaryService();
    svc.getAsync('french.test').then(dict => {
        test.equal(trie, JSON.stringify(dict), 'Dict not loaded correctly');
        test.done();
    });
}
