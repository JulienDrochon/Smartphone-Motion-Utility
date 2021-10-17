// ------------------------------------------------------------- //
// déplacement du cercle suivant le curseur de la souris
// ------------------------------------------------------------- //
//on ecoute les deplacement de la souris dans le body de la page
var mouseX, mouseY;
console.log("phone : " + variableOrientation01);

document.body.addEventListener(
  "mousemove",
  function (event) {
    //déclaration des variables où stocker les valeurs X et Y de la position de la souris
    mouseX = event.pageX - 25;
    mouseY = event.pageY - 100;
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
var initIdNumber = 0;
var audioDeath = new Audio("../assets/deadZombie.mp3");

class Sprite {
  // Constructor de la class
  constructor() {
    this.positions = {
      x: Math.floor(Math.random() * Math.floor(window.innerWidth - 100)),
      y: Math.floor(Math.random() * Math.floor(window.innerHeight - 100)),
    };
    this.identityNumber;
    this.isDead = false;
  }
  // ----- fonction d'initialisation du Sprite
  init() {
    // création d'une variable nommé img spécifique à la class (this.)
    this.img;
    // on indique que la variable img est un élément html de type <img >
    this.img = document.createElement("IMG");
    // on indique une source d'image à la variable img
    this.img.src = "../assets/sprite1.gif";
    // on place notre img dans l'id ImageFondEcran de la page html
    document.querySelector("#ImageFondEcran").appendChild(this.img);
    this.identityNumber = initIdNumber;
    initIdNumber++;
    this.img.id = this.identityNumber;
    // on donne à img une propriété css position qui a la valeur fixed
    this.img.style.position = "fixed";
    // on donne à img une width qui a la valeur 50 (pixels)
    this.img.width = "50";

    // // on donne à img une propriété css top qui a la valeur 90 pixels : position y de départ du sprite
    this.img.style.left = this.positions.x + "px";
    // // on donne à img une propriété css top qui a la valeur 200 pixels : position x de départ du sprite
    this.img.style.top = this.positions.y + "px";
  }

  // ----- fonction d'effacement du Sprite
  remove() {
    // alert("DEAD ok !");
  }
  // }
  // ----- fonction de déplacement du Sprite
  move(cerclePositionX, cerclePositionY) {
    if (
      this.positions.x < 0 ||
      this.positions.x > window.innerWidth ||
      this.positions.y < 0 ||
      this.positions.y > window.innerHeight ||
      this.isDead == true
    ) {
      this.isDead = false;
      this.img.style.display = "block";
      this.positions.x = Math.floor(
        Math.random() * Math.floor(window.innerWidth - 100)
      );
      this.positions.y = Math.floor(
        Math.random() * Math.floor(window.innerHeight - 100)
      );
    } else if (
      cerclePositionX > this.positions.x - 23 &&
      cerclePositionX < this.positions.x + 23 &&
      cerclePositionY > this.positions.y - 90 &&
      cerclePositionY < this.positions.y - 30
    ) {
      audioDeath.play();
      this.img.style.left = this.positions.x + "px";
      this.img.style.top = this.positions.y + "px";
      console.log(".this.isDead : " + this.isDead);
      this.isDead = true;
      this.img.classList.add("death");
      // setTimeout(function() {

      // reinit();
      var hu = document.createElement("IMG");
      var x = this.positions.x;
      var y = this.positions.y;
      setTimeout(function () {
        hu.src = "../assets/explode.gif";
        document.querySelector("#ImageFondEcran").appendChild(hu);
        hu.style.position = "fixed";
        hu.width = "50";
        hu.style.left = x + "px";
        hu.style.top = y + "px";
      }, 2000);
    } else if (this.isDead === false) {
      this.img.style.left = parseInt(this.positions.x++) + "px";
      this.img.style.top = parseInt(this.positions.y++) + "px";
    }

    // console.log(
    //   "distance : " +
    //     getDistance(
    //       this.positions.x,
    //       cerclePositionX,
    //       this.positions.y,
    //       cerclePositionY
    //     )
    // );

    return { x: this.positions.x, y: this.positions.y };
    function reinit() {
      this.init();
    }
  }
  kill() {}
}

function getDistance(x1, x2, y1, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}
