
const fs = require('fs');

// Lecture du contenu du parent.txt de manière synchrone
const parentContent = fs.readFileSync('board.txt', 'utf-8');

// Lecture du contenu du enfant.txt de manière synchrone
const enfantContent1 = fs.readFileSync('find.txt', 'utf-8');



// afficher le contenu lu
console.log('Contenu du board.txt :');
console.log(parentContent);
console.log('Contenu du find.txt :');
console.log(enfantContent1);


let tab1 = parentContent.replace(/\r\n/g, '\n').split("");

let tab2 = enfantContent1.replace(/\r\n/g, '\n').split("");


//diviser tab1 en trois sous tableaux
let tabTriDim = [];
let sousTableau = [];
function tabMultiDimentionnel (tabParent)
{
  
  for (let i = 0; i < tabParent.length; i++) {
      if (tabParent[i] === '\n') {
          sousTableau.push(tabParent[i]);
          tabTriDim.push(sousTableau);
          sousTableau = [];
      } else {
          sousTableau.push(tabParent[i]);
      }
  }
  // Ajouter le dernier sous-tableau, s'il y en a un
  if (sousTableau.length > 0) {
      tabTriDim.push(sousTableau);
  }
  return tabTriDim;
}
tabMultiDimentionnel(tab1);

//afficher les tab
//console.log(tabTriDim); console.log(tab2); console.log(tabis);

function chercherUnContenu ( tabParent, tabEnfant )
{
  //trouver le contenu enfant find
  let verif = 0; let nextColonne=0; let nextLigne=0; let nextElement=0; let positionx=0; let positiony =0; let tabFinal = [" "];
  //parcourir le tabEnfant
  for ( let i = nextElement; i<tabEnfant.length;i++ )
  {
    ///console.log("dans tabEnfant l'élement:", tabEnfant[i], ",position i:", i, "est-il égale à ");
      //parcours le tabParent
      for ( let ligne = nextLigne; ligne<tabParent.length; ligne++ )
      {
        if( verif === 1)
        {
          verif=0; 
          break;
        }
        //console.log( "ligne = ", ligne);
        //parcourir les éléments de tabParent[ligne]
        for ( let colonne = nextColonne; colonne<tabParent[ligne].length; colonne++)
        {
          //console.log("l'élement:", tabParent[ligne][colonne], " du tabParent, position: ", ligne, "à la colonne :", colonne);
          if ( tabParent[ligne][colonne] === tabEnfant[i] )
          {
              tabFinal[i] = tabParent[ligne][colonne];
              //console.log("tabEnfant[i-1] = ",tabEnfant[i-1]); console.log("tabParent[ligne][colonne-1] = ",tabParent[ligne][colonne-1]);
              if ( tabParent[ligne][colonne] === "\n" && tabParent[ligne][colonne-1] === tabFinal[i-1])
              {
                  verif = 1;
                  nextLigne = ligne +1;
                  nextColonne = 0;
                  //console.log(tabParent); console.log(tabEnfant);
                  positionx = colonne-(tabFinal.length-1); positiony = ligne;
                  break;
              }
              else
              {
                  //console.log(`${tabParent[ligne][colonne]} match avec ${tabEnfant[i]} à la ligne y = ${ligne} et la colonne x = ${colonne}`);
                  //console.log(tabParent); console.log(tabEnfant);
                  nextLigne = ligne;nextColonne = colonne+1;
                  verif = 1; 
                  break;
              }
          }
          else if( tabEnfant[i] === " " )
          {
              //console.log(tabParent); console.log(tabEnfant);
              tabFinal[i] = " ";
          }
        }
      }
    }
    //console.log(tabFinal);
    
    if ( tabFinal.join() == tabEnfant.join())
    {
      console.log("Trouvé! coordonnées :",positionx, ",", positiony);
    } else {
      console.log("introuvable");
    }
}
chercherUnContenu(tabTriDim, tab2);


