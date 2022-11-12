/*
REGOLE
- Tutte le risposte devono essere scritte in JavaScript
- Se sei in difficoltà puoi chiedere aiuto a un Teaching Assistant
- Puoi usare Google / StackOverflow ma solo quanto ritieni di aver bisogno di qualcosa che non è stato spiegato a lezione
- Puoi testare il tuo codice in un file separato, o de-commentando un esercizio alla volta
- Per farlo puoi utilizzare il terminale Bash, quello di VSCode o quello del tuo sistema operativo (se utilizzi macOS o Linux)
*/

/* ESERCIZIO 1
 Scrivi una funzione chiamata "area" che riceve due parametri (l1, l2) e calcola l'area del rettangolo associato.
*/

/* 
function area(l1, l2){
  return l1 * l2;
}

const areaRettangolo = area(7,23);
console.log("L'area del rettangolo è: " + areaRettangolo);
*/

/* ESERCIZIO 2
 Scrivi una funzione chiamata "crazySum" che riceve due numeri interi come parametri.
 La funzione deve ritornare la somma di quei due valori, ma se il loro valore è lo stesso allora deve ritornare la loro somma moltiplicata per 3.
*/

/* 
function crazySum(n1, n2){
  const normSum = n1 + n2;
  return n1 === n2 ? normSum * 3 : normSum;
}

console.log(crazySum(7,8));
*/

/* ESERCIZIO 3
 Scrivi una funzione chiamata "crazyDiff" che calcola la differenza assoluta tra un numero fornito e 19.
 Se il valore calcolato è più grande di 19, la funzione deve tornare tale risultato moltiplicato per 3.
*/

/* 
function crazyDiff(d1){
  let diff = Math.abs(d1 - 19);
  return diff > 19 ? diff * 3 : diff;
}

console.log(crazyDiff(124));
*/

/* ESERCIZIO 4
 Scrivi una funzione chiamata "boundary", che accetta un numero intero come parametro e ritorna true se tale parametro è incluso tra 20 e 100 (incluso) o se è esattamente uguale a 400.
*/

/* 
function boundary(num){
  if(num >= 20 && num <= 100 || num === 400){
    return true;
  } else {
    return false;
  }
}

console.log(boundary(20));
*/

/* ESERCIZIO 5
 Scrivi una funzione chiamata "codify" che accetta una stringa come parametro.
 La funzione deve aggiungere la parola "code" all'inizio della stringa fornita e ritornare il risultato, ma se la stringa fornita comincia proprio con "code" allora deve ritornarla senza modifiche.
*/

/* 
function codify(theString){
  const codeString = 'code';
  if(theString.startsWith(codeString)){
    return theString;
  } else {
    return result = "code" + theString;
  }
}

console.log(codify("codenumber"));
*/

/* ESERCIZIO 6
 Scrivi una funzione chiamata "check3and7" la quale accetta un numero intero positivo come parametro.
 La funzione deve controllare che tale parametro sia un multiplo di 3 o di 7, e in tal caso tornare true; altrimenti deve tornare false.
 SUGGERIMENTO: operatore modulo
*/

/* 
function check3and7(numP){
  if(numP % 3 === 0 || numP % 7 === 0){
    return true;
  } else {
    return false;
  }
}

console.log(check3and7(14));
*/

/* ESERCIZIO 7
 Scrivi una funzione chiamata "reverseString", che accetta una stringa come parametro e la ritorna invertita (es.: EPICODE => EDOCIPE).
*/

/* 
function reverseString(theString){
  let reverse = '';
  for(let i = theString.length -1; i >=0; i--){
   reverse += theString[i];
  }
  return reverse;
}

console.log(reverseString('EPICODE'));
*/

/* ESERCIZIO 8
 Scrivi una funzione chiamata "upperFirst", che accetta una stringa come parametro e la ritorna rendendo maiuscola ogni lettera iniziale di ogni parola.
*/

/* 
function upperFirst(theString){
  let separa = theString.split(' ');
  
  for(let i = 0; i < separa.length; i++){
    const word = separa[i];
    const upperWord = word[0].toUpperCase() + word.substr(1, word.length - 1);
    separa[i] = upperWord;
  }
  
  return separa.join(' ');
}

const str = 'oggi è bel tempo';

console.log(upperFirst(str));
*/

/* ESERCIZIO 9
 Scrivi una funzione chiamata "cutString", che accetta una stringa come parametro e la ritorna senza il primo e l'ultimo carattere.
*/

/*
function cutString(theString){
  let cutted = '';
  
  for(let i=1; i < theString.length -1; i++){
   cutted += theString[i]; 
  }
  
  return cutted;
}

console.log(cutString('EPICODE'));
*/

/* ESERCIZIO 10
 Scrivi una funzione chiamata "giveMeRandom", che accetta come parametro un numero chiamato n e ritorna un array contenente n numeri random contenuti tra 0 e 10.
*/

/*
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function giveMeRandom(n){
  const arrayRandom = [];

  for(let i = 0; i < n; i++ ){
    arrayRandom.push(getRandom(0, 10));
  }

  return arrayRandom;
}

console.log(giveMeRandom(10));
*/
