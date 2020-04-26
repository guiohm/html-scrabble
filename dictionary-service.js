const fs = require('fs');
const readline = require('readline');

const DictionaryService = function () {
    var _self = this;
    this.name = "DictionaryService";
    this.cache = {};
    if (!(this instanceof DictionaryService)) {
        return new DictionaryService();
    }
}

function loadDict(filename) {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(filename, 'utf8'),
    });
    const promise = new Promise((resolve, reject) => {
        const trie = {};
        let dataStarted = false;
        try {
            readInterface.on('line', function(line) {
                // Let the header pass, then do import
                if (!dataStarted) {
                    if (line == '[Words]') {
                        dataStarted = true;
                    }
                    return;
                }
                addToTRIE(trie, [...line]);
            });
            readInterface.on('close', () => {
                resolve(trie);
            });
        } catch (e) {
            reject(e);
        }
    });
    return promise;
}

function addToTRIE(trie, letters) {
    const l = letters.shift();
    if (l !== undefined) {
        if (!trie[l]) {
            trie[l] = {};
        }
        addToTRIE(trie[l], letters);
    } else {
        trie.end = true;
    }
}

DictionaryService.prototype.getAsync = async function (language) {
    if (!(language in this.cache)) {
        const fileName = __dirname + '/dictionaries/' + language + '.dic';
        if (!fs.existsSync(fileName)) {
            console.log('cannot find dictionary', fileName);
            return null;
        }
        try {
            this.cache[language] = await loadDict(fileName);
        }
        catch (e) {
            console.log('error reading dictionary:\n' + e);
        }
    }
    return this.cache[language];
}

module.exports = DictionaryService;

