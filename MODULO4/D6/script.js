
    /*
    # Esercizio

    ## 💾 DATABASE UTENTI CON FILTRO

    ### Usa bootstrap per creare un layout VELOCE, concentrati sulla parte in JS.

    Stai creando il frontend di un’applicazione che mostra gli utenti provenienti da un API e li filtra.

    Questi sono i tuoi compiti:

    – Mostra tutti gli utenti in una tabella partendo da questo API. Ricorda di usare ASYNC AWAIT!
    `https://jsonplaceholder.typicode.com/users`
    – Crea un dropdown con tre opzioni: “nome”, “username” e “email. Il dropdown sarà la prima parte del tuo filtro.

    1. Crea un input di testo. Quando l’utente scrive qualcosa in questo input, la risposta dell’API dovrebbe venir filtrata e renderizzata usando sia il valore 
    dell’input che l’opzione selezionata nel dropdown.
    2. Crea un funzione che crei una lista di nomi dalla lista di utenti. Esegui questa funziona al click di un bottone.
    3. Crea una funzione che crei, dall’array di utenti, un array di indirizzi in formato stringa. Segui l’esempio:

    “`
    { “street”: “Victor Plains”, “suite”: “Suite 879”, “city”: “Wisokyburgh”, “zipcode”: “90566-7771”, “geo”: { “lat”: “-43.9509”, “lng”: “-34.4618”}//Should become 
    “Victor Plains, Suite 879, Wisokyburgh (90566-7771)”
    “`

    —

    ### EXTRA:

    – Aggiungi un bottone ad ogni utente nella tabella che porti ad una pagina dettagli. Usa questo endpoint per raccogliere le informazioni relative ad un utente specifico. 
        `https://jsonplaceholder.typicode.com/users/id_goes_here`
    – Aggiungi un bottone che ordini gli utenti per nome in senso ascendente E discendente. NON DUE BOTTONI, SOLO UNO!
    – Usa Google Maps per mostrare la posizione degli utenti. Puoi usare l’iframe della tab “share”
    */

    const table = document.querySelector('#user-table tbody');
    const api = `https://jsonplaceholder.typicode.com/users`;
    const select = document.getElementById('select');
    const search = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');
    let addressArray = [];
    const nameBtn = document.getElementById('name-list');
    const dialog = document.getElementById('dialog');
    const dialogUl = document.getElementById('ul-modal');
    const pageUser = './user.html?q=';
    let currentFilterValue = "";
    let allUser;

    //GET REQUEST THE API
    const getData = async (url) => {
        console.log('func.async.getData -> start');

        try {
            const data = await fetch(url, {
                method: 'GET',
            });
    
            return await data.json();
        }
        catch (error) {
            console.log(error);
        }
    }

    //TAKE RESPONSE FROM API
    getData(api).then((response) => {
        console.log('func.async.getData->then -> response');

        populateTable(response);
        getListNameBtn(response);

        allUser = document.querySelectorAll('#user-table tbody tr')
        filterUser(allUser, response)
    });

    //FUNCTION TO CREATE ELEMENT
const createElement = (tag, attrib, ...children) => {
    const element = document.createElement(tag);

    Object.keys(attrib).forEach((key) => {
        element.setAttribute(key, attrib[key]); // key = chiave + valore + indice
    });

    children.forEach((child) => {
        typeof child === 'string' ? element.appendChild(document.createTextNode(child)) : element.appendChild(child);
    });

    return element;
}

//FUNCTION TO CREATE CARD
const createRow = (data, address, place) => {
    const row = createElement('tr', { class: 'user' },
        createElement('td', {id: `${data.id}`, class: 'id-user'}, `${data.id}`),
        createElement('td', {id: `${data.name}`, class: 'name-user'}, `${data.name}`),
        createElement('td', {id: `${data.username}`, class: 'username'}, `${data.username}`),
        createElement('td', {id: `${data.phone}`, class: 'phone-user'}, `${data.phone}`),
        createElement('td', {id: `${data.email}`, class: 'mail-user'}, `${data.email}`),
        createElement('td', {id: `${data.address}`, class: 'address-user'}, `${address}`),
        createElement('td', {id: `${data.website}`, class: 'name-user'}, `${data.website}`),
        createElement('td', {class: 'user-link'},
            createElement('a', {id: `user-btn`, class: 'btn btn-primary', href: `${pageUser}${data.id}`}, 'Details'),
        ),
    )

    place.appendChild(row);
}

//CALL THE FUNCTION TO CREATE THE TABLE
const populateTable = (response) => {
    console.log(response);

    response.map((element) => {
        const mergeAddress = `${element.address.street}, ${element.address.suite}, ${element.address.city} (${element.address.zipcode})`
        addressArray.push(mergeAddress);
        createRow(element, mergeAddress, table);
    });
}

//EVENT CLICK FOR DIALOG OF NAME
const getListNameBtn = (response) => {
    nameBtn.addEventListener('click', () => {
        response.map((el) => {
            const li = createElement('li', {class: 'li-name'}, `${el.name}`);
            console.log(li);
            dialogUl.appendChild(li);
        });

        const li = document.querySelectorAll('#ul-modal li');

        dialog.showModal();
        dialog.addEventListener('click', (event) => {
            console.log('close modal -> clicked')
            if (event.target.id !== 'image-modal') {
                dialog.close();
                li.forEach(el => el.remove());
            }
        });
    });
}

//FILTER FUNCTION
const filterUser = (oldList, response) => {
    searchBtn.addEventListener('click', (event) => {
        console.log('func.filterUser-> click -> start');
        event.preventDefault();

        oldList.forEach(el => el.remove());

        const inputValue = search.value
        console.log(inputValue);

        if (inputValue !== currentFilterValue) {
            currentFilterValue = inputValue;
            const filterRes = response.filter((elem) => {
                return elem[select.value].toLowerCase().includes(inputValue);
            });

            filterRes.map((el) => {
                const mergeAddress = `${el.address.street}, ${el.address.suite}, ${el.address.city} (${el.address.zipcode})`
                createRow(el, mergeAddress, table);
            });

            oldList = document.querySelectorAll('#user-table tbody tr')
        }
    })
}


