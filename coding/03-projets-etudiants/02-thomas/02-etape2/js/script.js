// ------------------------------------------------------------- //
// déplacement du cercle suivant le curseur de la souris
// ------------------------------------------------------------- //
//on ecoute les deplacement de la souris dans le body de la page
document.body.addEventListener(
  "mousemove",
  function(event) {
    //déclaration des variables où stocker les valeurs X et Y de la position de la souris
    var mouseX = event.pageX - 30;
    var mouseY = event.pageY - 30;
    // Déplacement du cercle (avec l'id "trou") transparent en foncion de la position du curseur de la souris
    document
      .querySelector("#trou g")
      .setAttribute("transform", "translate(" + mouseX + "," + mouseY + ")");
  },
  false
);
