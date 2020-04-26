class Dictionary {

    constructor() {
        this.trieDict = null;
        this.cacheValid = true;
        return this;
    }

    loadLanguage(language) {
        if (this.cacheValid && window.localStorage !== null && window.localStorage.scrabbleDict) {
            try {
                if (!this.dictReady(JSON.parse(window.localStorage.scrabbleDict))) {
                    this.cacheValid = false;
                    throw 'Invalid data';
                }
            } catch (e) {
                console.log('reloading dict from server because error: ', e);
                window.localStorage.scrabbleDict = '';
                this.loadLanguage(language);
                return;
            }

        // Load in the dictionary from the server
        } else {
            // const dict = this;
            $.get('dictionary/' + language, (txt) => {
                // Cache the dictionary, if possible
                if (window.localStorage !== null) {
                    try {
                        // window.localStorage.scrabbleDict = txt;
                    } catch (e) {
                        console.log(e);
                    }
                }

                // Let the rest of the game know
                // that the dictionary is ready
                this.dictReady(JSON.parse(txt));
            });
        }
        return this;
    }

    dictReady(trieDict) {
        if (!trieDict || typeof trieDict != 'object') {
            return false;
        }
        this.trieDict = trieDict;
    }

    findLongestWords(letters, trieContext) {
        trieContext = trieContext || this.trieDict;
        const letter = letters[0];
        let wordList = [];

        // handle blank letters
        if (letter === ' ' || letter === '_') {
            for (const prop in trieContext) {
                if (prop === 'end')
                    continue;
                const word = this._searchInTrie(trieContext, letters, prop);
                if (word.length) {
                    wordList.push(...word);
                }
            }
        } else {
            wordList.push(...this._searchInTrie(trieContext, letters, letter));
        }
        return wordList.sort((a, b) => b.length - a.length);
    }

    _searchInTrie(trie, letters, letter) {

        // If the trie contains a key matching the next letter,
        //  descend into that level of the trie and do it again.
        if (trie[letter]) {
            // However, don't return this back up until we know
            //  there's a match farther down there somewhere.
            const whatLiesBelow = this.findLongestWords(letters.slice(1), trie[letter]);

            // But if there is, it's the longest result; concatenate
            //  and send it back up the stack.
            if (whatLiesBelow.length) {
                return whatLiesBelow.map(word => letter + word);
            }
        }

        // If none of that worked, check to see if we're at the end
        //  of any valid words and return this terminal letter if so.
        if (trie[letter] && trie[letter].end) {
            return [letter];
        }

        // Else, there's just nothing interesting at this point.
        // Return empty list, back up and hope we had better luck earlier.
        return [];
    }
}

if (typeof module == 'object') {
    module.exports = Dictionary;
}
