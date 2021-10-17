//var variableduTelephone = (une variable qui varie entre 0.5 et 10) -> voir le code https://github.com/JulienDrochon/2019-2020_smartphone_as-object/blob/master/coding/00-Etape-par-etape/05_js-variable-1-couleur-police-rouge-fonction-map-range/index.html
var variableduTelephone;

setInterval(function () {
  // on attribue la 3e données du téléphone à notre variable 'variableduTelephone' qui influe sur axis scale start (ligne 36)
  variableduTelephone = variableOrientation03;
}, 50); // toutes les 50 millisecondes, on rafraichit les valeurs des variables

// ligne changée pour relier la variable du téléphone au paramètre axis scale start : ligne 26
// Paramètres des ellipses au démarrage

const scene = document.querySelector(".scene");
let updateTimeout = null;

let settings = {
  baseRadius: 15,
  ellipsesCount: 32,
  axisScaleStart: 1.5,
  axisScaleEnd: 3,
  animationDuration: 6,
  cyclesPerLoop: 1,
  backgroundColor: "#1d1f20", // Codepen Twilight theme background
  lineColor: "#53259A", // Codepen Twilight theme yellow
  lineStyle: "solid",
};

function init(firstTime) {
  document.body.style.setProperty(
    "--base-radius",
    settings.baseRadius + "vmin"
  );
  document.body.style.setProperty("--ellipses-count", settings.ellipsesCount);

  document.body.style.setProperty("--axis-scale-start", variableduTelephone);
  // document.body.style.setProperty(
  //   "--axis-scale-start",
  //   settings.axisScaleStart
  // );
  document.body.style.setProperty("--axis-scale-end", settings.axisScaleEnd);
  document.body.style.setProperty(
    "--animation-duration",
    settings.animationDuration + "s"
  );
  document.body.style.setProperty("--cycles-per-loop", settings.cyclesPerLoop);
  document.body.style.setProperty(
    "--background-color",
    settings.backgroundColor
  );
  document.body.style.setProperty("--line-color", settings.lineColor);
  document.body.style.setProperty("--line-style", settings.lineStyle);

  // Possible bug: Chrome doesn't dynamically update custom properties during animation
  if (firstTime !== true) {
    forceRefresh();
  }
}
init(true);

function forceRefresh() {
  console.log("refresh");

  document.body.style.setProperty(
    "--ellipses-count",
    settings.ellipsesCount + 1
  );

  scene.classList.add("update");
  setTimeout(() => {
    scene.classList.remove("update");
    document.body.style.setProperty("--ellipses-count", settings.ellipsesCount);
  }, 1000);
}

// ----------------------------------------- Lignes commentées (couleurs + interface curseurs)
// couleurs LIA  #C3BDCE 9D86C0 #53259A

// function datGui() {
//   gui = new dat.GUI();
//   let guiSettings = gui.addFolder("Settings");
//   guiSettings
//     .add(settings, "baseRadius", 1, 25)
//     .step(0.1)
//     .onChange(init);
//   guiSettings
//     .add(settings, "ellipsesCount", 3, 64)
//     .step(1)
//     .onChange(init);
//   guiSettings
//     .add(settings, "axisScaleStart", 0.5, 10)
//     .step(0.1)
//     .onChange(init);
//   guiSettings
//     .add(settings, "axisScaleEnd", 0.5, 10)
//     .step(0.1)
//     .onChange(init);
//   guiSettings
//     .add(settings, "animationDuration", 1, 60)
//     .step(0.1)
//     .onChange(init);
//   guiSettings
//     .add(settings, "cyclesPerLoop", 0.1, 10)
//     .step(0.1)
//     .onChange(init);
//   guiSettings.addColor(settings, "backgroundColor").onChange(init);
//   guiSettings.addColor(settings, "lineColor").onChange(init);
//   guiSettings
//     .add(settings, "lineStyle", ["solid", "dashed", "dotted"])
//     .onChange(init);
//   guiSettings.open();
//   return gui;
// }
// datGui();
