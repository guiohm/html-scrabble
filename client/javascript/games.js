$(document).ready(function() {
    var table = $("table");
    table.append(populateGamesList());

    $('button.create_new_game').on('click', () => {
        window.location.href = 'make-game'
    })

    i18next.on('onInitialized', function() {
        // do translation stuff
        // i18next.t('translate_me');
    });
});

function populateGamesList() {
    var gameNumber = 1;
    $.getJSON('/games.json', function(data) {
        $('table').append(data.map(function(game) {
            return TR(null,
                TD(null, gameNumber++),
                game.players.map(function(player) {
                    return TD(null,
                        A({ href: '/game/' + game.key + '/' + player.key },
                            player.name))
                }))
        }));
    });
}
