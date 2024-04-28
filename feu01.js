let variable = process.argv[2];

//console.log(variable);

// je classe ma varibale en tableau
let tab = [];
for (i=0; i< variable.length; i++){
    //console.log(variable[i]);
            tab[i] = variable[i];
}
//console.log(tab);

for ( i = 0; i < tab.length; i++) { 
    if (  isNaN(tab[i]) === false && isNaN(tab[i+1]) === false) {
        
        tab[i] = tab[i]+tab[i+1];
         tab.splice(i+1,1); i=i+1;
    }  if (  isNaN(tab[i]) === false && isNaN(tab[i-1]) === false) {
        
        tab[i] = tab[i-1]+ tab[i]
         tab.splice(i-1,1); i= i-2;
    } 
}
//je transforme les nombres en number dan smon tableau

for ( i = 0; i< tab.length; i++ )
{
    if (isNaN(tab[i]) === false)
    {
        tab[i] = Number(tab[i]);
    }   
} 
//console.log(tab);
/*je recherche si présence de parenthèses
je conserve l'index de la 1ere parenthèse
je détache de mon tableau les éléments à calculer qui se trouvent dans les parenthèses
je récupère également ma dernière parenthèse*/
let par = [];
let paren1 = "";
let paren2 = "";
let elementspe1 = "(";
let elementspe2 = ")";

while (tab.includes(elementspe1 || tab.includes(elementspe2))){

    for ( i = 0; i < tab.length; i++)
    {
        if ( tab[i] === "(" )
        {
            paren1 = i;
        }
        else if ( tab[i] === ")")
        {
            paren2 = i;
        }
    }
    par = tab.splice(paren1+1, paren2-paren1);
    let par1 = [];
    for ( i=0; i<par.length;i++)
    {
        if( i === par.length -1 )
        {
            break;
        }
        par1[i] = par[i]
    }
    //console.log(par1);
    
    //je cherche soit un division, soit une multiplication
    
    for ( i = 0;i < par1.length; i++ )
    {
        if ( par1[i] === "/" )
        {
            
            par1[i] = par1[i-1] / par1[i+1];
            par1.splice(i-1,3, par1[i]);
            //console.log("/", par1);
                 
        } else if ( par1[i] === "*" )
        {
            par1[i] = par1[i-1] * par1[i+1];
            par1.splice(i-1,3, par1[i]);
            //console.log("*", par1);
    
        }
    }
    for ( i = 0;i < par1.length; i++ )
    {
            if ( par1[i] === "+" )
            {
                par1[i] = par1[i-1] + par1[i+1];
            par1.splice(i-1,3, par1[i]);
            //console.log("+", par1);
    
            } else if ( par1[i] === "-" )
            {
                par1[i] = par1[i-1] - par1[i+1];
                //console.log(i);
            par1.splice(i-1,3, par1[i]);
            //console.log("-", par1);
    
            }
        }
    
    //je replace le résultat dans le tableau de départ
    for ( i = 0; i<tab.length; i++)
    {
        if ( tab[i] === "(")
        {
            tab[i] = par1[0];
        }
    }
    //console.log(tab);
    //console.log(par1);
}

//Je vais chercher si des opérations spéciales (* ou /)
let mult = "*";
let div = "/";
while (tab.includes(mult) || tab.includes(div)){

    for ( i = 0;i < tab.length; i++ )
    {
        if ( tab[i] === "/" )
        {
            
            tab[i] = tab[i-1] / tab[i+1];
            tab.splice(i-1,3, tab[i]);
            //console.log("/", tab);
                 
        } else if ( tab[i] === "*" )
        {
            tab[i] = tab[i-1] * tab[i+1];
            tab.splice(i-1,3, tab[i]);
    
        }
    }
    //console.log(tab);
}
let add = "+";
let sous = "-";
while (tab.includes(add) || tab.includes(sous)){

    for ( i = 0;i < tab.length; i++ )
    {
            if ( tab[i] === "+" )
            {
                tab[i] = tab[i-1] + tab[i+1];
            tab.splice(i-1,3, tab[i]);
            //console.log("+", tab);
    
            } else if ( tab[i] === "-" )
            {
                tab[i] = tab[i-1] - tab[i+1];
                //console.log(i);
            tab.splice(i-1,3, tab[i]);
            //console.log("-", tab);
    
            }
        }
    }
    console.log(tab.toString());