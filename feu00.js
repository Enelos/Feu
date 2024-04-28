let longueur = process.argv[2];
let largeur = process.argv[3];

let autre = process.argv[4];
const colors = require('colors');

function square(long,large,autre){
    if (large === undefined){
        console.log('il manque la largeur');
        return;
    } else if ( isNaN(long) === true || isNaN(large) === true ){
        console.log('il ne faut que des nombres');
        return;
    }else if (autre){
        console.log('il faut seulement deux nombres');
        return;
    } else {
        
        long = Number(long); 
        
        //1 ere ligne
        let contenant = '';
        for ( let i = 1; i <= long; i++ ){
            if ( i === 1 || i === long ){
                //je place un 'o' à la première et dernière position
                contenant += 'o';
            } else{
                contenant += '-';
                //je place les '-' entre les 'o'
            }
        }
        console.log(colors.red(contenant)); //j'affiche ma première ligne
        
        //lignes intermédiaires
        let verif = '';
        for ( let j = 0; j < large-2; j++ ) // je retire 2 à ma largeur car je créé la 1ere et derniere ligne
        {
            if ( large <= 1 ) // au cas ou il n'y a pas + de 1 ligne
            {
                verif += 1;
                break;
            }else {
                //je créé autant de lignes intermédiaires que mon nombre largeur - 2
                var inter = [];
                    inter[0] = '|';
                    //je place mon premier tiret verticale
                    inter[long-2] = '|';
                    //je place mon deuxième tiret verticale
                    console.log(colors.blue(inter.join(' ')));
        
                } 
        }
        
            if ( large > 1){
        
                console.log(colors.rainbow(contenant));        
            }
    }

}
square(longueur,largeur,autre);