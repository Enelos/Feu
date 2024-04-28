const { log } = require('console');
const fs = require('fs');


// Lecture du contenu du parent.txt de manière synchrone
const plateau = fs.readFileSync('plateau.txt', 'utf-8');
console.log(plateau);
let tab1 = plateau.replace(/\r\n/g, '\n').split('\n');
tab1.shift(); tab1.pop();
console.log(tab1);
let ligneLength = [];
// Valider si la carte est valide
function validerCarte (plateau)
{
    let verif= ''; let verif2 = '';
    for ( ligne = 0; ligne<plateau.length; ligne++ )
    {
        if ( ligne === plateau.length-1 )
        {
            if (plateau[ligne].length === plateau[ligne-1].length)
            {
                verif ='ok';
            }
        }
        else if (plateau[ligne].length === plateau[ligne+1].length)
        {
            ligneLength[0] = plateau[ligne].length;
            verif= 'ok';
        }
        else
        {
            verif ='pas ok';
        }
        for ( element=0; element<plateau[ligne].length;element++)
        {
            if ( plateau[ligne][element] === '.' || plateau[ligne][element] === 'x')
            {
                verif2 = 'ok';
            }
            else
            {
                verif2 = 'pas ok';
            }
        }
    }
    if ( verif === 'ok')
    {
        console.log('les lignes ont le même nombre de caractères');
    }
    else
    {
        console.log('le plateau n\'est pas validé');
        process.exit();

    }
    if ( verif2 === 'ok')
    {
        console.log('les lignes ont les mêmes caractères');
    }
    else
    {
        console.log('le plateau n\'est pas validé');
        process.exit();

    }
}
validerCarte(tab1);


// Déterminer la taille du plus grand carré à partir d'une position donnée
function trouverPlusGrandCarre(tab1) 
{
    let plusGrandCarre = { taille: 0, position: [0, 0] }; 
    //objet qui me permet de débuter une position et une taille

    for (let ligne = 0; ligne < tab1.length; ligne++)
    //je parcours mes lignes
    {
        //console.log('je parcours la ligne', ligne)
        for (let colonne = 0; colonne < tab1[ligne].length; colonne++) 
        //je parcours mes colonnes
        {
            //console.log('je parcours la colonne', colonne);
            if (tab1[ligne][colonne] === '.')
            //si je trouve un point
            {
                //console.log('il y a un point');
                let tailleCarre = 1;
                //création d'une variable dynamique pour permettre à mes prochaines boucles de s'arrêter/continuer
                let estValide = true;
                //création d'un variable pour arrêter/poursuivre ma boucle while
                while (estValide === true)
                //tant que c'est vrai
                {
                    for (let lignebis = ligne; lignebis < ligne + tailleCarre /*j'augmente ma condition au fur et à mesure*/; lignebis++) 
                    //je parcours une nouvelle fois ma boucle à partir de l'index de ma première boucle
                    {
                        //console.log('je parcours la lignebis', lignebis);
                        for (let colonnebis = colonne; colonnebis < colonne + tailleCarre /*j'augmente ma condition au fur et à mesure*/; colonnebis++) 
                        //je parcours une nouvelle fois ma colonne à partir de l'index de ma deuxième boucle
                        {
                            //console.log('je parcours la colonnebis', colonnebis);
                            if (lignebis >= tab1.length || colonnebis >= tab1[ligne].length || tab1[lignebis][colonnebis] !== '.') 
                            //condition pour stopper ma boucle while
                            {
                                //console.log('on est tombé sur | ou la fin du tab1');
                                estValide = false;
                                break;
                            }
                        }
                        if (estValide === false)
                        {
                            break;
                        }   
                    }
                    if (estValide === true)
                    //tant que ce sont des points, la variable reste true 
                    {
                        //console.log('il y a encore un point');
                        tailleCarre++; console.log('taillecarré =', tailleCarre);
                        //augmentation de tailleCarre pour permettre aux 2 dernières boucles de se poursuivre
                    } 
                    else 
                    //pour sortir de ma dernière boucle et arrêter la boucle while
                    {
                        break;
                    }
                }
                tailleCarre = tailleCarre-1; //  enlever 1 pour obtenir la taille correcte
                if (tailleCarre > plusGrandCarre.taille) 
                //si la tailleCarre est plus grande que celle déjà trouvé, alors je mets à jour mon objet
                {
                    plusGrandCarre.taille = tailleCarre;
                    plusGrandCarre.position = [ligne, colonne];
                }
            }
        }
    }

    return plusGrandCarre;
    //je renvoie mon objet
}

// Fonction pour afficher le plus grand carré dans le tableau avec des 'o'
function mettreEnValeur(tab1, plusGrandCarre) 
{
    // je récupère la position et la taille du plus grand carré
    let [i, j] = plusGrandCarre.position;
    let taille = plusGrandCarre.taille;

    // je mets en valeur le carré avec des 'o'
    for (let ligne = i; ligne < i + taille; ligne++) 
    //je parcours ma ligne à partir de la position i du carré et je m'arrête avec la taille du carré
    {
        for (let colonne = j; colonne < j + taille; colonne++) 
        //je parcours ma colonne à partir de la position j du carré et je m'arrête avec la taille du carré
        {
            if (tab1[ligne][colonne] === '.') 
            //dernière vérification de points
            {
                tab1[ligne] = tab1[ligne].substring(0, colonne) + 'o' + tab1[ligne].substring(colonne + 1);
                //je remplace par chaque point du carré par'o' (un par un), je suis dans une string avec tab1[ligne]
            }
        }
    }
}

// j'appelle la fonction trouverPlusGrandCarre avec comme arguments tab1 dans une variable que je vais réutiliser dans ma fonction mettreEnValeur
let resultat = trouverPlusGrandCarre(tab1);
console.log("Plus grand carré trouvé :", resultat);

// j'appelle ma fonction mettreEnValeur avec comme argument tab1 et mon objet (plus grand carré)
mettreEnValeur(tab1, resultat);

// j'affiche mon tableau modifié
console.log(tab1.join('\n'));