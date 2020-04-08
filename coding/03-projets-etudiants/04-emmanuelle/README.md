## Padlet du projet

https://fr.padlet.com/eguenerie/cx20ffy880hr

## Smartphone Data Utility

S'assurer d'utiliser la version 1.3.x + téléchargeable à cette adresse :
https://julien-drochon.net/--cours--/wp-content/uploads/2019/10/Smartphone-data-utility-1.3.0-darwin-x64.zip

Nous allons utiliser les données envoyées par le téléphone indiquées ci dessous:

<img src="screenshot-smartphone-data-utility.png">

Les données en rouge correspondent dans le code aux variables :
`variableOrientation07`,
`variableOrientation08`,
`variableOrientation09`

La variable qui permettra de savoir si le téléphone a été secoué est la variable `variableOrientation10` qui indique 1 quand l'appreil est secoué et pendant 3 secondes.

En considérant que le cube, l'emplacement du téléphone et les faces du cube correpondent au schéma suivant :

<img src="cube.png">

## Explication pour le code situé dans le Dossier "01-reconnaissance-face-cube"

Voici les données qui correspondent (pour mon téléphone, elles peuvent varier selon téléphone utilisé) à la face qui est située au sommet du cube :

- A  
  `variableOrientation07` est égale à 0  
  `variableOrientation08` est égale à 0  
  `variableOrientation09` est égale à 10

- B  
  `variableOrientation07` est égale à 0  
  `variableOrientation08` est égale à -9  
  `variableOrientation09` est égale à 0

- C  
  `variableOrientation07` est égale à 0  
  `variableOrientation08` est égale à 0  
  `variableOrientation09` est égale à -9

- D  
  `variableOrientation07` est égale à 0  
  `variableOrientation08` est égale à 9  
  `variableOrientation09` est égale à 0

- E  
  `variableOrientation07` est égale à -9  
  `variableOrientation08` est égale à 0  
  `variableOrientation09` est égale à 0

- F  
  `variableOrientation07` est égale à 9  
  `variableOrientation08` est égale à 0  
  `variableOrientation09` est égale à 0
