/*
REGOLE
- Tutte le risposte devono essere scritte in JavaScript
- Se sei in difficoltà puoi chiedere aiuto a un Teaching Assistant
- Puoi usare Google / StackOverflow ma solo quanto ritieni di aver bisogno di qualcosa che non è stato spiegato a lezione
- Puoi testare il tuo codice in un file separato, o de-commentando un esercizio alla volta
- Per farlo puoi utilizzare il terminale Bash, quello di VSCode o quello del tuo sistema operativo (se utilizzi macOS o Linux)
*/

/* ESERCIZIO 1
 Elenca e descrivi i principali datatype in JavaScript. Prova a spiegarli come se volessi farli comprendere a un bambino.
*/

/* In Javascript esistono le variabili. Queste sono appunto i "contenitori" al cui interno gli sviluppatori possono conservare dei valori.
   Questi valori sono chiamati appunto datatype. Esistono vari datatypes perchè appunto i valori che possono essere inseriti in una variabile possono essere diversi.
   Innanzitutto possiamo dividerli in due insiemi: i primitive types ed i structural types.
   
   - I privitive types non sono altro che i valori più basilari di Javascript:
     - Number: che rappresentano appunto valori numerici;
     - String: che rappresentano valori testuali;
     - Boolean: qui abbiamo solo due tipi di valori rappresentati da "Vero" e "Falso";
     - Undefined: che viene utilizzato per dichiarare che una variabile è appunto "non definita";
     - Null: che viene utilizzato per dichiarare che una variabile è vuota;
     - BigInt: che è stato introdotto come uno speciale tipo numerico che supera i limiti imposti dal tipo number;
     - Symbol: utlizzato per la creazione di valori univoci.
    
   - Gli structural types sono invece quei valori appunto più strutturati di Javascript:
     - Array: che sono usati da Javascript per creare liste di dati;
     - Oggetti: che sono usati da Javascript per creare raccolte di proprietà tramite i "key-values";
     - Funzioni: che sono blocchi di codice, costituite da una o più istruzioni, che svolgono una o più azioni.
*/

/* ESERCIZIO 2
 Descrivi cos'è un oggetto in JavaScript, con parole tue.
*/

/* 
    Possiamo dire che in JavaScript tutti i tipi di dati non primitivi possono essere considerati oggetti. Gli oggetti in questo linguaggio sono
    fondamentali. Vengono utilizzati per catalogare vari tipi di dati ed altri elementi più complessi come una sorta di archivio.
*/

/* ESERCIZIO 3
 Scrivi il codice necessario ad effettuare un addizione (una somma) dei numeri 12 e 20.
*/

/* console.log(12 + 20); */

/* ESERCIZIO 4
 Crea una variable di nome "x" e assegna ad essa il numero 12.
*/

/* let x = 12; */

/* ESERCIZIO 5
 Crea una variable chiamata "name" e assegna ad essa il tuo nome, sotto forma di stringa.
*/

/* let name = 'Carlo'; */

/* ESERCIZIO 6
 Esegui una sottrazione tra i numeri 4 e la variable "x" appena dichiarata (che contiene il numero 12).
*/

/* 
    let x = 12;
    console.log(x - 4);    
*/

/* ESERCIZIO 7
 Crea due variabili: "name1" e "name2". Assegna a name1 la stringa "john", e assegna a name2 la stringa "John" (con la J maiuscola!).
 Verifica che name1 sia diversa da name2 (suggerimento: è la stessa cosa di verificare che la loro uguaglianza sia falsa).
 Infine, verifica che la loro uguaglianza diventi true se entrambe vengono trasformate in lowercase (senza cambiare il valore di name2!).
 NON HAI BISOGNO DI UN BLOCCO IF/ELSE. E' sufficiente utilizzare console.log().
*/

/* 
    let name1 = 'john';
    let name2 = 'John';

    console.log(name1 !== name2);

    name2 = name2.toLowerCase();

    console.log(name2 == name1);
*/
