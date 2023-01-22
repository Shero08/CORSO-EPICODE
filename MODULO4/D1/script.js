//# Esercizi

//1. Crea una funziona che calcoli e ritorni la somma di due numeri interi. Se i due valori sono uguali, ritorna il triplo della somma.

const sumOfInt = (a,b) => {
    console.log('func.sumOfInt-> start');
    let c = 0;

    if(Number.isInteger(a) && Number.isInteger(b)){
        c = a + b;

        if(a === b){
           c = Math.pow(c, 3)
        }
        return c;
    } else {
        alert('I Valori inseriti non sono numeri interi.');
    }
}

//2. Crea una funzione che controlli due numeri interi. Ritorna `true` se uno dei due è 50 o se la somma dei due è 50.

const controlNumber = (a,b) => {
    console.log('func.controlNumber-> start');

    const c = 50;

    if(Number.isInteger(a) && Number.isInteger(b)){

        if(a === c || b === c || a+b === c){
           return true;
        } else {
            return false;
        }

    } else {
        alert('I Valori inseriti non sono numeri interi.');
    }
}

//3. Crea una funzione che rimuova il carattere ad una specifica posizione da una stringa. Passa la stringa e la posizione come parametri e ritorna la stringa modificata.

const modString = (string, num) => {
    console.log('func.modString-> start');
    return string.slice(0, num) + string.slice(num + 1);
}

//4. Crea una funzione che ritorni il valore più alto tra tre numeri interi.

const highNumber = (n1,n2,n3) => {
    console.log('func.highNumber-> start');

        const array = [n1,n2,n3];
        let newNum = 0;

        array.forEach(elem => {
            if(Number.isInteger(elem)){
                if(newNum > elem){
                    newNum = newNum;
                } else {
                    newNum = elem;
                }
            } else {
                alert('Uno o più Valori inseriti non è un numero intero.');
            }
        });

        console.log('Il numero più grande tra quelli inseriti è: ' + newNum);
}

//5. Crea una funzione che controlli se due numeri siano compresi tra 40 e 60 o tra 70 e 100. Ritorna `true` se rispecchiano queste condizioni, altrimenti ritorna `false`.

const checkNumber = (a,b) => {
    console.log('func.checkNumber-> start');

    if(a >= 40 && a <= 60 || a >= 70 && a <= 100){
        if(b >= 40 && b <= 60 || b >= 70 && b <= 100){
            return true;
        }
    }

    return false;
}

//6. Crea una funzione che crei e ritorni una nuova stringa formata ripetendo un numero dato di volte una stringa data. Sia la stringa che il numero 
//   devono essere passate come parametri.

const addString = (string, num) => {
    console.log('func.addString-> start');
    let newString = '';

    for(let i = 0; i < num; i++){
        newString += string;
    }

    return newString;
}

//7. Crea una funzione che accetti un nome di città come parametro e ritorni il nome stesso se inizia con “Los” o “New”, altrimenti ritorni `false`.

const checkCity = (city) => {
    if(city.toUpperCase().includes('NEW') || city.toUpperCase().includes('LOS')){
        console.log('func.checkCity-> start');
        return city;
    }
    return false;
}

//8. Crea una funzione che calcoli e ritorni la somma di tutti gli elementi di un array con tre elementi. L’array deve essere passato come parametro.

const sumOfArray = (array) => {
    console.log('func.sumOfArray-> start');
    let sum = 0;

    if (array.length === 3){    
        array.forEach(elem => {
        sum += elem;
        });
    } else{
        return alert("L'array deve essere di 3 elementi")
    } 

    return sum;
}

//9. Crea una funzione che controlli se un array di due elementi contiene il numero 1 o il numero 3. Se li contiene, ritorna `true`, altrimenti ritorna `false`.

const checkSpecNum = (array) => {
    console.log('func.checkSpecNum-> start');

    if(array.includes(1) || array.includes(3) && array.length === 2){
        return true;
    } 
    
    return false;
}

//10. Crea una funzion che controlli che un array di due elementi NON contenga i numeri 1 o 3. Se NON li contiene, ritorna `true`, altrimenti ritorna `false`.

const checkSpecNum2 = (array) => {
    console.log('func.checkSpecNum2-> start');

    if(array.includes(1) || array.includes(3) && array.length === 2){
        return false;
    } 
    
    return true;
}



//11. Crea una funzione per trovare la stringa più lunga in un array di stringhe. Passa l’array come parametro e tritorna la strtinga più lunga.

const stringArray = ['ciao', 'sono', 'carlo', 'gianni', 'eramo'];

const longest = (arrayOfString) => {
  console.log('func.longest-> start');
  let long = null;
  for(let i = 0; i < arrayOfString.length; i++){
    const elem = arrayOfString[i];
    if(long === null || elem.length > long.length){
      long = elem;
    } 
  }
  return long;
}

//console.log(longest(stringArray));

//12. Crea una funzione per trovare il tipo di un angolo i cui gradi sono passati come parametro.
//    Angolo acuto: meno di 90° ⇒ ritorna “acuto”
//    Angolo ottuso: tra i 90° e i 180° gradi ⇒ ritorna “ottuso”
//    Angolo retto: 90° ⇒ ritorna “retto”
//    Angolo piatto: 180° ⇒ ritorna “piatto”

const checkAngle = (grades) => {
    console.log('func.checkAngle-> start');
    let type = grades;
    
    switch(true){
        case (type < 90): 
            console.log('acuto')
            break;

        case (type > 90 && type < 180):
            console.log('ottuso')
            break;
        
        case (type === 90):
            console.log('retto')
            break;
        
        case (type === 180):
            console.log('piatto')
            break;
    }
}

//13. Crea una funzione che trovi e ritorni **l’indice** di del numero più alto in un array passato come parametro.

const arrOfNum = [1,6,43,39,23,44,9];

const maxNumber = (array) => {
    console.log('func.maxNumber-> start');
    let maxNum = 0;

    array.forEach(element => {
        if(maxNum === 0 || element > maxNum){
            maxNum = element;
        }
    });

    const indexOfMaxNum = arrOfNum.indexOf(maxNum);

    return indexOfMaxNum;
}

//14. Crea una funzione per trovare e ritornare il numero PARI più alto in un array di numeri passato come parametro.

const maxEvenNum = (array) => {
    console.log('func.maxEvenNum-> start');
    let evenArray = [];
    let maxEven = 0;

    array.forEach(element => {
        if(element % 2 === 0){
            evenArray.push(element);
        }
    });

    console.log(evenArray);
    evenArray.forEach(elem => {
        if(maxEven === 0 || elem > maxEven){
            maxEven = elem;
        }
    });

    return maxEven;
}

//15. Crea una funzione per controllare che due numeri (passati come parametri) siano uno positivo e uno negativo. Ritorna `true` se la condizione è applicata, `false` se non lo è.

const posNeg = (a,b) => {
    console.log('func.posNeg-> start');
    if(a > 0 && b < 0){
        return true;
    } 
    return false;
}

//16. Crea una funzione per creare e ritornare una nuova stringa che abbia i primi tre caratteri in minuscolo e gli altri in maiuscolo. Se la stringa è più corta di 
//    tre caratteri, tutta la stringa deve essere in maiuscolo. La stringa originale deve essere passata come parametro.

const upString = (string) => {
    console.log('func.upString-> start');
    let stringMod = '';
    
    string.length <= 3
    ? stringMod = string.toUpperCase()
    : stringMod = string.slice(0, 3) + string.toUpperCase().slice(2 + 1)

    return stringMod;
}

//17. Crea una funzione che calcoli la somma di due numeri passati come parametri. Se la loro somma è compresa tra 50 e 80, ritorna `65`, altrimenti ritorna `80`.

const newSum = (a,b) => {
    console.log('func.newSum-> start'); 

    let sum = a + b;

    if(sum > 50 && sum < 80){
        sum = 65;
    } else {
        sum = 80;
    }

    return sum;
}

//18. Crea una funzione per convertire un numero (passato come parametro) in una stringa basandoti su questi criteri:
//    Il numero è divisibile per 3 ⇒ ritorna “Diego”
//    Il numero è divisibile per 5 ⇒ ritorna “Riccardo”
//    Il numero è divisibile per 7 ⇒ ritorna “Stefano”
//    Se il numero non ha 3, 5 o 7 come divisore, ritorna il numero originale.
//    ⚠️ Se il numero è divisibile per più di una di queste opzioni, ritorna l’unione delle due stringhe. Es. 15 è divisibile per 3 e per 5, 
//    quindi il valore ritornato sarebbe “DiegoRiccardo”.

const numToString = (num) => {
    let string = '';
    if(num % 3 === 0){
        string += 'Diego';
    }
    if(num % 5 === 0){
        string += 'Riccardo';
    }
    if(num % 7 === 0){
        string += 'Stefano';
    }

    return string
}

//19. Crea una funzione che crei un acronimo a partire da una frase. Es. “Fabbrica Italiana Automobili Torino” deve ritornare “FIAT”.


const getAcronym = (str) => {
    console.log('func.getAcronym-> start'); 
    
    let words = str.split(" "); 
    let acr = words.map(elem => elem.slice(0, 1));

    return acr.join("").toUpperCase();
};
