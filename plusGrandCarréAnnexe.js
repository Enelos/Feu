const fs = require('fs'); // Importer le module fs
const args = process.argv.slice(2);
let plateau = "";
if (args.length !== 3) {
    console.log("params needed: x y density");
    process.exit(1);
}

const x = parseInt(args[0]);
const y = parseInt(args[1]);
const density = parseFloat(args[2]) / 100; // Diviser par 100 pour obtenir une valeur entre 0 et 1

plateau +=`${y}.xo \n`;
for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
        Math.random() < density ? plateau+='x' : plateau+='.';
    }
    plateau+='\n';
}

// Écrire le plateau dans un fichier texte
fs.writeFileSync('plateau.txt', plateau);

console.log("Plateau a été écrit dans le fichier plateau.txt");