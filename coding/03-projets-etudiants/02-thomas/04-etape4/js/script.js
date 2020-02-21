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

// ------------------------------------------------------------- //
// Class Sprite : pour afficher et enlever les personnages
// ------------------------------------------------------------- //
class Sprite {
  // Constructor de la class
  constructor() {}
  // ----- fonction d'initialisation du Sprite
  init() {
    // création d'une variable nommé img spécifique à la class (this.)
    this.img;
    this.imgX;
    this.imgY;
    // on indique que la variable img est un élément html de type <img >
    this.img = document.createElement("IMG");
    // on indique une source d'image à la variable img
    this.img.src = "../assets/sprite.gif";
    // on place notre img dans l'id ImageFondEcran de la page html
    document.querySelector("#ImageFondEcran").appendChild(this.img);
    // on donne à img une propriété css position qui a la valeur fixed
    this.img.style.position = "fixed";
    // on donne à img une width qui a la valeur 50 (pixels)
    this.img.width = "50";
    // on donne à img une propriété css top qui a la valeur 200 pixels : position x de départ du sprite
    this.img.style.top = "200px";
    this.imgX = this.img.style.top;
    // on donne à img une propriété css top qui a la valeur 90 pixels : position y de départ du sprite
    this.img.style.left = "90px";
    this.imgY = this.img.style.left;
  }
  // ----- fonction de déplacement du Sprite
  move() {
    var imgMove = this.img;
    var vieillePosition;
    var nouvellePositon;
    // Actualisation de la posiiton du Sprite toutes les 20 millisecondes (fonction js setInterval)
    window.setInterval(function() {
      var ed = imgMove.style.left.replace(/[^-\d\.]/g, "");
      imgMove.style.left = parseInt(ed) + parseInt(1) + "px";
    }, 20);
  }
  // ----- fonction d'effacement du Sprite
  remove() {
    console.log("return position : ");
  }
}
