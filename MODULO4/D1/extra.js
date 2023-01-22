    // # Esercizi extra

    // NOTA: tutti gli esercizi devono essere svolti usando le funzioni

    // 1. Partendo da una stringa (passata come parametro), ritorna il carattere più usato nella stringa stessa.

    const countChar = (str) => {
        let charMap = [];
        let maxChar = "";
        let maxCount = 0;

        for (let char of str) {                               
            if (charMap[char]) {
                charMap[char]++;
            } else {
                charMap[char] = 1;
            }
        }
        for (let char in charMap) {
            if (charMap[char] > maxCount) {
                maxChar = char;
                maxCount = charMap[char];
            }
        }
        return maxChar;
    }

    // 2. Controlla che due stringhe passate come parametri siano gli anagrammi l’una dell’altra. Ignora punteggiatura e spazi e ricordate di rendere la 
    //    stringa tutta in minuscolo. Se le due parole sono anagrammi, ritorna `true`, altrimenti ritorna `false`.

    const sortStrChars = (str) => {
        if (!str) {
          return;
        }
        str = str.split('');
        str = str.sort();
        str = str.join('');
        return str;
      }
      
      let words = ["cantare", "catnare"];
      
      const getAnagrams = (words) => {
        let anagrams = []; 

        words.map((word) => {
            word = sortStrChars(word);
            anagrams.push(word);
        });

        let tmp = 0;

        anagrams.map((element) => {

            if(tmp === 0){
                tmp = element;
            } else if(tmp !== 0 && tmp === element) {
                return console.log(true);
            } else {
                return console.log(false);
            }
        })
      }

    // 3. Partendo da una lista di possibili anagrammi e da una parola (entrambi passati come parametri), ritorna un nuovo array contenente tutti gli 
    //    anagrammi corretti della parola data.
    //    Per esempio, partendo da “cartine” e [”carenti”, “incerta”, “espatrio”], il valore ritornato deve essere [”carenti”, “incerta”].
          
    const words2 = ["carenti", "incerta", "espatrio"];

    const listAnagrams = (words, str) => {
        let newList = [];
        let sortStr = '';
        let sortWord;

        sortStr = sortStrChars(str);

        words2.map((word) => {
            sortWord = sortStrChars(word);
            if(sortWord === sortStr){
                newList.push(word);
            }
        });

        return newList;
    }



    // 4. Partendo da una stringa passata come parametro, ritorna `true` se la stringa è palindroma o `false` se non lo è.

    const palindrome = (str) => {
        let sortedStr = str;

        if (!str) {
            return;
        }

        sortedStr = sortedStr.split('');
        sortedStr = sortedStr.reverse();
        sortedStr = sortedStr.join('');

        if(str === sortedStr){
            return true;
        }

        return false;
    }

    // 5. Partendo da un numero intero (dai parametri) ritorna un numero che contenga le stesse cifre, ma in ordine contrario. Es. 189 ⇒ 981

    const reversedNum = (num) => {
        return (parseFloat(num.toString().split('').reverse().join('')) * Math.sign(num));                
    }

    // 6. Scrivi una funzione che accetti un numero positivo X come parametro. La funzione dovrebbe stampare a console una “scala” creata con il 
    //    carattere “#” e avente X scalini.
    //      Es.
    //      X = 2
    //      `’# ‘
    //      ‘##’`
    //      X = 3
    //      `’# ‘
    //      ‘## ‘`
    //      `’###’`

    const ladder = (x) => {
        let symbol = '';
        if(x<0){
            return;
        }

        for(let i = 0; i < x; i++){
            symbol += '#';
            console.log(symbol);
        }

    }

    // 7. Crea una funzione che, data una stringa come parametro, ritorni la stessa stringa, ma al contrario. Es. “Ciao” ****⇒ “oaiC”

    const reverseString = (str) => {
        if (!str) {
            return;
        }

        str = str.split('');
        str = str.reverse();
        str = str.join('');

        return str;
    }

    // 8. Crea una funzione che accetti un array e un numero Y come parametro. Dividi l’array in sotto-array aventi lunghezza Y.
    //    Es. array: [1, 2, 3, 4], y: 2 ⇒ [[ 1, 2], [3, 4]]
    //    array: [1, 2, 3, 4, 5], y: 4 ⇒ [[ 1, 2, 3, 4], [5]]



    // 9. Scrivi una funzione che accetti un numero positivo X come parametro. La funzione dovrebbe stampare a console una “piramide” create con il carattere “#” e avente X strati.
    //    Es.
    //    X = 3
    //    `’ # ‘
    //    ‘ ### ‘
    //    ‘#####’`

    const pyramid = (x) => {
        let output= "";
        if(x<0){
            return;
        }

        for (let i = 0; i < x; i++) {
            let myspace = "";   

            for(let s = 0; s < (x-i-1); s++) {
                myspace += " ";
            }

            for (var j = 1; j <= 2*i + 1; j++) {
                output+="#";
            }

            console.log(myspace + output);
            output="";
        }
    }

    // 10. Scrivi una funzione che accetti un intero N e ritorni una matrice a spirale NxN:
    //     Es. N = 2
    //     `[[1, 2],[4, 3]]`
    //     N = 3
    //     `[[1, 2, 3],[8, 9, 4],[7, 6, 5]]`
    //     N = 4
    //     `[[1, 2, 3, 4],[12, 13, 14, 5],[11, 16, 15, 6],[10, 9, 8, 7]]`

    const spiral = (n) => {
        let spiralArr = [];
        let counter = 0;
        if(n<0){
            return;
        }

        for(let i = 1; i <= n; i++){
            let newArr = [];
            for(let y = 1; y <= n; y++){
                counter++;
                newArr.push(counter);
            }
            spiralArr.push(newArr)
        }

        console.log(spiralArr)

    }
