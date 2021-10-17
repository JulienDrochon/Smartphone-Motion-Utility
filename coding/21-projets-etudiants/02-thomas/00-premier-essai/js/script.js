$(document).ready(function () { // code original
    setInterval(function () { // ajout de code
        var $affiche = $('#affiche'), // code original
            $rondblanc = $('#rondblanc'), // code original
            $rondcircle = $('#rondcircle'), // code original
            size = $rondblanc.width() / 2; // code original

        var posX = map_range(variableOrientation03, -30, 30, 0, $affiche.width()); // utiliser la fonction map_range pour adapter les plages de valeurs
        var posY = map_range(variableOrientation02, -30, 30, 0, $affiche.height()); // utiliser la fonction map_range pour adapter les plages de valeurs

        $rondcircle.attr({
            'cx': posX + size,
            'cy': posY + size
        })
    }, 50); // fin setInterval
}); // fin $(document).ready(function () {
