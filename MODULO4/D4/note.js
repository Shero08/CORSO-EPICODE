
/*
    # Notes – ES6

    ## FUNZIONI

    ### Parametri di Default

    I parametri di default ci permettono di inizializzare una funziona con dei valori di default. Questi valori sono usati quando l’argomento, al 
    momento della chiamata della funzione, è undefined o non viene specificato.
*/

    function multiply(a, b = 2) {
        return a * b;
    }

    multiply(5)
    
    /*
    ### Parametri “rest”

    In JS, le funzioni possono essere chiamate con un qualsiasi numero di argomenti, a prescindere da come sono definite, 
    ma solo quelli realmente esistenti verranno presi in considerazione.

    Tutti gli altri parametri possono essere raggruppati usando la sintassi “…” e poi utilizzati come un array.

    Nota che i parametri “rest” devono essere alla fine della lista dei parametri. */

    const withRestParams = function(param1, ...rest) {
        //REST IS AN ARRAY OF ALL THE PARAMETERS
        console.log(param1) //2
        console.log(rest) // [ 3,4,5,6,7 ]
    }

    withRestParams(2, 3, 4, 5, 6, 7);

    /*
    ### La keyword “this”

    Le funzioni a freccia sono una delle features più interessanti di ES6. Sono spesso usate per la loro sintassi, più corta rispetto alle 
    funzioni tradizionali. Le funzioni a freccia si comportano diversamente da quelle tradizionali.

    Quando usiamo una funzione tradizionale come metodo di un oggetto, possiamo usare “this” per riferirci all’oggetto stesso. Si può dire 
    che la keyword “this” in questo caso è legata al “proprietario” della funzione.

    Le funzioni a freccia sono considerate migliori per le funzioni non-metodo perché non si legano al “proprietario”, ma al “genitore” del contesto che la contiene.

    Nell’esempio, il primo “this”, in una funzione a freccia, si riferisce al genitore del contesto in cui è contenuta, quindi il genitore dell’oggetto, 
    e quindi si riferirà al contesto globale del file.

    Nel secondo oggetto, invece il “this” si riferirà al “proprietario”, e quindi all’oggetto stesso.

    “`
    let firstObject = {
    name: “lidia”,
    description: “Demo for the this keyword”,
    getCapitalName: () => {
    console.log(this.description.toUpperCase()) //this will refer to the global context
    }
    }
    firstObject.getCapitalName()

    let secondObject = {
    name: “Lidia”,
    description: “Demo for the this keyword”,
    getCapitalName: function() {
    console.log(this.name.toUpperCase()) //this will refer to the object
    }
    }
    secondObject.getCapitalName()

    “`

    Nell’esempio che segue, il primo “this”, dentro il metodo, si riferisce all’oggetto (quindi this.jobs si riferisce alla seconda proprietà dell’oggetto), 
    mentre il secondo “this”, dentro il “.map”, si riferisce al genitore del proprietario.
    Il proprietario, in questo caso, è il metodo “myMethod” e quindi il genitore sarà l’oggetto. Il secondo this, quindi, si riferisce anch’esso all’oggetto.
    */

    const myObject = {
        name: 'John',
        jobs: ['Students', 'Veteran'],
        myMethod: function () {
            this.jobs.forEach(job => console.log(`${this.nome} is a ${job}`));
        },
    }

    myObject.myMethod();
    // John is a Student
    // John is a Veteran

    /*
    In generale è sempre bene usare molta cautela quando si lavora con “this”, finché non si raggiunge una certa confidenza.

    La sintassi delle funzioni a freccia le rende ideali per processare gli array con metodi come map, sort, filter etc…
    */

    anArray.forEach(function(element){
        console.log(element)
    })

    anArray.forEach(element => console.log(element))

    /*
    ## DESTRUTTURAZIONE

    Questa feature ci permette di estrarre valori da oggetti e array e salvarli in variabili.
    */

    const myObject2 = {
        type: 'asd',
        name: 'whatever',
    }

    //NEW WAY
    const {type, name, value = 10} = myObject2;

    //OLD WAY 
    const type = myObject2.type;
    const name = myObject2.name;
    const value = myObject2.value ? myObject2.value: 10;

    /*
    ## OPERATORE SPREAD

    L’operatore spread è denotato da tre punti “…” e può essere usato per “smontare” oggetti, array e stringhe.

    ### Oggetti

    Quando l’operatore spread è applicato agli oggetti, è solitamente per poter combinare più oggetti copiandone il contenuto.
    */

    const obj1 = {name: 'John', age: 27};
    const obj2 = {name: 'Carlo', gender: 'M'};

    const obj3 = {...obj1, ...obj2, phone: '12121212122'};

    console.log(obj3)

    /*
    ### Array e stringhe

    Quando l’operatore spread è applicato alle stringhe, crea un array da ogni carattere che la compone.
    */

    const myString = 'This is a string';
    const characters = [...myString];

    console.log(characters)

    /*
    Quando è applicato agli array, viene usato per copiare tutti gli elementi di un array in un altro array.
    */

    const odd = [1,3,5];
    const combined = [...odd, 2,4,6];

    console.log(combined);

    /*
    Puoi usarlo per esempio quando devi concatenare più array
    */

    const arr1 = [1,3,5];
    const arr2 = [...odd, 2,4,6];

    const arr3 = [...arr1, ...arr2]

    /*
    ## NUOVE POSSIBILITA’ CON GLI ARRAY

    ### array.find()

    Questo metodo trova un elemento che corrisponda al criterio specificato. Si ferma alla prima concordanza.
    */

    const numbers = [24, 41, 23, 16, 59]
    
    console.log(numbers.find(number => number > 30));
    // 41

    /*
    ### array.findIndex()

    La stessa cosa di .find(), ma ritorna l’indice corrispondente o -1 se non viene trovato.
    */

    const numbers2 = [24, 41, 23, 16, 59]
    
    console.log(numbers2.findIndex(number => number > 30));
    // 1

    /*
    ### array.includes()

    Questo metodo ritorna true se l’elemento viene trovato, altrimenti ritorna false.
    */
    const numbers3 = [24, 41, 23, 16, 59]
    
    console.log(numbers.includes(24);
    //true

    /*
    ### array.slice()

    Questo metodo ritorna un nuovo array contenente solo la porzione di array selezionata. Il primo parametro è l’indice iniziale, il secondo, facoltativo, è l’indice finale.
*/

// const obj = {
//     nome: 'John',
//     surname: 'Smith',
//     age: 26,
//     job: 'Student',
// }

// const newObj = Object.entries(obj)

// console.log(Object.keys(obj))
// console.log(Object.values(obj))
// console.log(newObj)
// console.log(Object.fromEntries(newObj))

// const test = () => {
//     const ele = document.createElement('div');
//     ele.setAttribute('class', 'cuai');
//     console.log(ele)
// }