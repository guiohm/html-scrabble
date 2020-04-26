const Dictionary = require('./dictionary');

const trie = {
    b: {
        a: {
            r: {
                end: true,
                s: {
                    end: true
                }
            }
        }
    },
    f: {
        a: {
            r: {
                end: true,
                m: {
                    end: true
                }
            },
            t: {
                end: true
            }
        },
        i: {
            r: {
                end: true,
                m: {
                    end: true
                }
            },
        }
    },
    r: {
        a: {
            t: {
                end: true,
                e: {
                    end: true
                }
            }
        }
    },
};

const dict = new Dictionary();
dict.dictReady(trie);

test('findLongestWords ratt should be rat', () => {
  expect(dict.findLongestWords('ratt', trie)).toStrictEqual(['rat']);
});

test('findLongestWords unrate should be []', () => {
  expect(dict.findLongestWords('unrate', trie)).toStrictEqual([]);
});

test('findLongestWords abc should be []', () => {
  expect(dict.findLongestWords('abc', trie)).toStrictEqual([]);
});

test('findLongestWords [r, a, t, e] should be rate', () => {
  expect(dict.findLongestWords(['r', 'a', 't', 'e'], trie)).toStrictEqual(['rate']);
});

test('findLongestWords f_rm should be [farm, firm]', () => {
  expect(dict.findLongestWords('f rm', trie)).toStrictEqual(['farm', 'firm']);
});
