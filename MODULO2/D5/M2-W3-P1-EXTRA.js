// Esercizi aggiuntivi

/* EXTRA 1
 Scrivi una funzione chiamata "checkArray", che riceve come parametro un array di numeri random (creati con giveMeRandom)
 e stampa in console, per ogni oggetto, true/false a seconda che il numero sia più grande di 5 o no.
 La funzione deve infine tornare la somma di solamente i numeri che sono risultati maggiori di 5.
*/

//FUNCTION GETRANDOM
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

/* RISPOSTA EXTRA 1: */
function checkArray(arrayToCheck){
  let sum = 0;
    for(const elem of arrayToCheck){
      if(elem > 5){
        console.log(true);
        sum += elem;
      } else {
        console.log(false);
      }
    }
  return sum;
}

const random = giveMeRandom(16);
const sumArray = checkArray(random);
console.log(random, sumArray);

/* EXTRA 2
 Nel tuo sito e-commerce hai un array di oggetti chiamato shoppingCart. Ognuno di questi oggetti ha un prezzo, un nome, un id e la quantità da spedire.
 Crea una funzione chiamata "shoppingCartTotal" che calcola il totale dovuto al negozio.
*/

/* RISPOSTA EXTRA 2 */
const shoppingCart = [
  {
    'name': 'Carlo',
    'price': 4,
    'id': 1,
    'quantity': 6
  },
  {
    'name': 'Gianni',
    'price': 14,
    'id': 2,
    'quantity': 2
  },
  {
    'name': 'Anna',
    'price': 10,
    'id': 3,
    'quantity': 5.6
  }
];

function shoppingCartTotal(array){
  let total = 0;
  let partial = [];
  for(let i = 0; i < shoppingCart.length; i++){
    partial[i] = shoppingCart[i].price * shoppingCart[i].quantity;
    total += partial[i];
  }
  return total;
}

const total = shoppingCartTotal(shoppingCart);

console.log('Il totale del carrello è: '+total);

/* EXTRA 3
 Nel tuo sito e-commerce hai un array di oggetti chiamato shoppingCart. Ognuno di questi oggetti ha un prezzo, un nome, un id e la quantità da spedire.
 Crea una funzione chiamata "addToShoppingCart" che riceve un nuovo oggetto, lo aggiunge allo shoppingCart e ritorna il numero totale degli oggetti in esso contenuti.
*/

/* RISPOSTA EXTRA 3 */
function addToShoppingCart(name, id, price, quantity){
  const newObj = {'name': name, 'price': price, 'id': id, 'quantity': quantity};
  shoppingCart.push(newObj);
  
  return shoppingCart.length;
}

const length = addToShoppingCart('Cristian', 4, 18, 1);
console.log(shoppingCart, length);

/* EXTRA 4
 Nel tuo sito e-commerce hai un array di oggetti chiamato shoppingCart. Ognuno di questi oggetti ha un prezzo, un nome, un id e la quantità da spedire.
 Crea una funzione chiamata "maxShoppingCart" che riceve l'array shoppingCart e ritorna l'oggetto più costoso in esso contenuto.
*/

/* RISPOSTA EXTRA 4 */
function maxShoppingCart(cart){
  let maxCart = null;
  for(const item of cart) {
    if(maxCart === null || item.price > maxCart.price) {
      maxCart = item;
    }
  }
  return maxCart;
}

console.log(maxShoppingCart(shoppingCart));

/* EXTRA 5
 Nel tuo sito e-commerce hai un array di oggetti chiamato shoppingCart. Ognuno di questi oggetti ha un prezzo, un nome, un id e la quantità da spedire.
 Crea una funzione chiamata "latestShoppingCart" che riceve l'array shoppingCart e ritorna l'ultimo oggetto in esso contenuto.
*/

/* RISPOSTA EXTRA 5 */
function latestShoppingCart(lastCart){
  const last = lastCart[lastCart.length -1];
  return last;
}

console.log(latestShoppingCart(shoppingCart));

/* EXTRA 6
 Crea una funzione chiamata "loopUntil" che riceve come parametro un intero "x" compreso tra 0 e 9.
 La funzione mostra in console un numero casuale tra 0 e 9 finchè il numero estratto è maggiore di x per 3 volte di fila.
*/

/* RISPOSTA EXTRA 6 */
function loopUntil(x){
  console.log('Numero passato in imput: ' + x);
  const arrayTemp = [];
  let i = 0;
  while(arrayTemp.length < 3){
     i++;
     const randomic = getRandom(1,9);
     if(randomic > x){
       arrayTemp.push(randomic);
       console.log(randomic);
     }
  }
  if(arrayTemp[arrayTemp.length - 1] > x &&
    arrayTemp[arrayTemp.length - 2] > x &&
    arrayTemp[arrayTemp.length - 3] > x){
         return
  }
  
}

loopUntil(5);

/* EXTRA 7
 Crea una funzione chiamata "average" che riceve un array come parametro e ritorna la media aritmetica dei numeri in esso contenuti.
 La funzione salta automaticamente qualsiasi valore non numerico all'interno dell'array.
*/

/* RISPOSTA EXTRA 7 */
function average(array){
  let sum = 0;
  console.log('Array su cui fare la media: ' + array);
  for(let i = 0; i < array.length; i++){
    sum += array[i];
  }
  sum /= array.length;
  return sum;
}

console.log('media aritmetica: ' + average(giveMeRandom(5)));

/* EXTRA 8
 Scrivi una funzione chiamata "longest" che ricerca la stringa più lunga all'interno del parametro ricevuto (un array di stringhe).
*/

/* RISPOSTA EXTRA 8 */
const stringArray = ['ciao', 'sono', 'carlo', 'gianni', 'eramo'];

function longest(arrayOfString){
  let long = null;
  for(let i = 0; i < arrayOfString.length; i++){
    const elem = arrayOfString[i];
    if(long === null || elem.length > long.length){
      long = elem;
    } 
  }
  return long;
}

console.log(longest(stringArray));

/* EXTRA 9
 Scrivi una funzione per creare un filtro anti spam molto semplice per una casella email. La funzione riceve una stringa come parametro, "emailContent", e ritorna un boolean.
 La funzione deve tornare true se emailContent NON contiene le parole "SPAM" o "SCAM".
*/

/* RISPOSTA EXTRA 9 */
function antiSpam(emailContent){
  if(emailContent.toUpperCase().includes('SPAM') || emailContent.toUpperCase().includes('SCAM')){
    return false;
  } else {
    return true;
  }
}

const mail = 'Questa mail è sicura';
console.log(antiSpam(mail));

/* EXTRA 10
 Scrivi una funzione che riceve come parametro una data e ritorna il numero di giorni passati ad oggi.
*/

/* RISPOSTA EXTRA 10 */
function countDay(date){
  const today = new Date();
  const diffMs = Math.abs(today.getTime() - date.getTime());
  return Math.round(diffMs / 1000 / 60 / 60 / 24);
}

const dateToDay = new Date('1992-11-8');
console.log('Giorni trascorsi: '+ countDay(dateToDay));

/* EXTRA 11
 Scrivi una funzione chiamata "matrixGenerator" che riceve come parametri due interi, "x" e "y".
 La funzione deve tornare una matrice di x volte y, e ogni valore deve rappresentare l'indice dell'elemento.
 Es.: x = 3, y = 2
 ["00","01","02"
 "10","11","12"]
*/

/* RISPOSTA EXTRA 11 */
function matrixGenerator(x,y){
  const matrix = [];
  for(let i = 0; i < y; i++){
    let row = [];
    for(let a = 0; a < x; a++){
      row.push(i.toString() + a.toString());
    }
    matrix.push(row);
  }
  return matrix;
}

console.log(matrixGenerator(3,2));
