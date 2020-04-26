# Online multiplayer Scrabble with HTML/JavaScript UI

This is a fork of Hans Huebner's https://github.com/hanshuebner/html-scrabble

## Changes from original repo

* Implemented 'Duplicate' variant (https://en.wikipedia.org/wiki/Duplicate_Scrabble)
* Dictionary search/validation capability (using TRIE search)
* **UI in French only ATM**. __I quickly replaced english with french before playing with falimy while in confinment. This is bad, sorry. I'll fix that later__

## Future changes

* Internationalization
* Timer
* Improved rack drag'n'drop implementation (include support for touch screens)
* Improved 'Duplicate' variant support:
    * Players can play simultaneously
    * Auto-swap rack letters according to rules (at least 2 consonants && 2 vowels
     on first 15 turns, then 1/1)
    * Arbitration when draw at end of round

---
## Below is the original info almost unchanged from Hans Huebner
---

## Installing

The game uses node.js as server and depends on some npm packages.  To install
dependencies:

```
$ npm install
```

Some react components have been added (divergence from original repo):

```
$ npm run build-jsx
```

## Configuration

Settings can be be changed by the way of a configuration file which
must be named 'config.json' and placed in the main html-scrabble
directory.  The default configuration file is included as
[config-default.json](html-scrabble/blob/master/config-default.json). It
can be copied to config.json and then edited.

By default, the server starts on port 9093 and uses the smtp server
running on the local host to send out game invitation emails.  The
invitation emails contain the "localhost" in the URL, so they will
only work for a browser running on the same machine as the server.

As a minimum, the ```baseUrl``` and ```mailSender``` configuration
properties should be changed.  Furthermore, if you are not running an
SMTP server on your server, you need to set the
```mailTransportConfig``` appropriately.  Please refer to [nodemailer
documentation](http://documentup.com/andris9/nodemailer/#setting-up-a-transport-method)
for information on how to configure nodemailer.

### Protecting the game list

If you deploy your Scrabble server in the Internet, you may want to
protect your game list so that pranksters can't mess up your games.
You can do so by adding a ```gameListLogin``` property to your
configuration like so:

```
    "gameListLogin": {
        "username": "foo",
        "password": "bar"
    }
```

Note that this is meant as a light protective measure.  Do not use a
password that you use elsewhere.  Thank you for observing all safety
measures.

## Running

Once you're satisfied with the configuration, you can start the game
server using

```
$ node server.js
```

Open your web browser on the configured game URL to create a new game.

## Deleting a game

    jq -c 'select(.key != "b657b5d33a7736b0")' data.db | sponge data.db

If you have trouble getting the server to run, feel free to contact
me. Be aware, though, that you will need a machine to run the server
on (I'm using my Mac, but FreeBSD or Linux will work as well) and have
some command line knowledge. I cannot help you if you don't know your
way through the shell and development tools.

Enjoy,
Hans (hans.huebner@gmail.com)
