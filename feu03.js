const fs = require('fs');

// Lecture du contenu du parent.txt de manière synchrone
const sudoku = fs.readFileSync('Sudoku-1.txt', 'utf-8');

// afficher le contenu lu
console.log('Contenu du sudoku.txt :');
console.log(sudoku);

let tab1 = sudoku.replace(/\r\n/g, '\n').split("");

//1-diviser tab1 en trois sous tableaux
let tabTriDim = [];
function tabMultiDimentionnel (tabParent)
{
    let sousTableau = [];
  for (let i = 0; i < tabParent.length; i++) {
      if (tabParent[i] === '\n') {
          sousTableau.push(tabParent[i]);
          //console.log(sousTableau);
          tabTriDim.push(sousTableau.join(''));
          sousTableau = [];
      } else {
          sousTableau.push(tabParent[i]);
      }
  }
  // Ajouter le dernier sous-tableau, s'il y en a un
  if (sousTableau.length > 0) {
      tabTriDim.push(sousTableau.join(''));
  }
  return tabTriDim;
}
tabMultiDimentionnel(tab1);

//console.log(tabTriDim);

let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//2-Vérification des lignes
    let verif = '';
    let position = [];
    for (let ligne = 0; ligne < tabTriDim.length; ligne++) 
    {
        let verif = '';
        let position = [];
        for (let element = 0; element < tabTriDim[ligne].length; element++) 
        {
            if (tabTriDim[ligne][element] === '.') 
            {
                position.push(element);
            } 
            else 
            {
                verif += tabTriDim[ligne][element];
            }
        }
    
        //3-Recherche des nombres manquants
        let nombresAbsents = num.filter(nombre => verif.includes(nombre.toString())===false);
    
        //console.log("Nombres manquants dans la ligne", ligne + 1, ":", nombresAbsents);
        //console.log("Position des cases vides dans la ligne", ligne + 1, ":", position);
        nombresAbsents=nombresAbsents.toString();
        
        //4-vérifier si le nombres manquants existent dans les autres lignes
        let verif2 = "";
        //je parcours mes nombres manquants
        for (let i = 0; i < nombresAbsents.length; i++) 
        {
            //condition pour sortir en cas de placement définitif des 1er nbres manquants
            if (verif2 === "ok") 
            {
               break;
            }
            //condition pour ne prendre que les nombres et donc éviter la virgule en cas de double nombre manquant sur une même ligne 
            else if ( isNaN(nombresAbsents[i]) === false)
            {
                //je parcours le tabTriDim
                for (let j = 0; j < tabTriDim.length; j++) 
                {
                    //condition pour sortir en cas de placement définitif des 1er nbres manquants
                    if( verif2 === "ok")
                    {
                        break;
                    }
                    else
                    {
                        //je parcours la ligne du tabTriDim
                        for ( k=0; k<tabTriDim[j].length;k++)
                        {
                            //je m'arrête à la position des '.'
                            if ( k === position[0])
                            {
                                //si le nombre manquant existe dejà sur la colonne
                                if (nombresAbsents[i] === tabTriDim[j][k]) 
                                {
                                    //je remplace le '.' par l'autre nombre manquant
                                    tabTriDim[ligne] = tabTriDim[ligne].replace(tabTriDim[ligne][k], nombresAbsents[i + 2]);
                                    //je remplace l'autre '.' par le premier nombre manquant
                                    tabTriDim[ligne] = tabTriDim[ligne].replace(tabTriDim[ligne][position[i + 1]], nombresAbsents[i]);
                                    verif2 = "ok";
                                    break;
                                }
                                //au cas où il n'y qu'un nombre manquant sur la ligne
                                else
                                {
                                    //je remplace le '.' par le nombre manquant
                                    tabTriDim[ligne] = tabTriDim[ligne].replace(tabTriDim[ligne][k], nombresAbsents[i]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
console.log(`le tableau sudoku résolu est:\n${tabTriDim.join('')}`);