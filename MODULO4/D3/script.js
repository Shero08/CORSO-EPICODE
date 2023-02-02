
/*
    # Compito

    ## GALLERIA FOTOGRAFICA:

    Inizia con il layout di bootstrap messo a disposizione e implementa le seguenti features.

    ### PRIMA DI INIZIARE:

    – Scarica il template da qui —> https://getbootstrap.com/docs/4.3/examples/album/
    – Crea un account su Pexels per ricevere la tua chiave di acceso. [https://www.pexels.com/api/new/](https://www.pexels.com/api/new/)
    – Questa chiave va inserita negli **headers** della tua richiesta HTTP usando la proprietà “Authorization”.

    //HBC3hstDs98FNuP1QdPdKM8VFMO0mzYre3FZ6UKvZFQW8G1ItJVg7tWC  -> MIA API PEXELS

    “`
    {Authorization: “HBC3hstDs98FNuP1QdPdKM8VFMO0mzYre3FZ6UKvZFQW8G1ItJVg7tWC”}
    “`

    Non dovrebbe servirti altro per eseguire un GET.

    ### 💻ESERCIZI:

    1. Quando l’utente preme sul pulsante “Load Images”, fai in modo che vengano mostrate le immagini provenienti da `https://api.pexels.com/v1/search?query=[LA TUA QUERY QUI]`
    2. Quando l’utente preme sul pulsante “Load Secondary Images”, fai in modo che vengano mostrare le immagini provenienti da `https://api.pexels.com/v1/search?query=[UN’ALTRA QUERY QUI]`
    3. Cambia il bottone “Edit” in “Nascondi”
    4. Quando l’utente prese il pulsante “Nascondi”, fai sparire la card.
    5. Cambia la dicitura “9 mins” nell’angolo della card con l’id dell’immagine
    6. Aggiungi un input di testo nel “jumbotron” e usalo per chiamare l’API e cercare altre immagini basandoti sul contenuto dell’input

    ### 💻EXTRA:

    1. Usa i componenti Alert di bootstrap per gestire gli errori con messaggi personalizzati.
    2. Aggiungi un carosello alla fine della pagina con le immagini da un’altra chiamata all’API.
    3. Quando l’utente preme il bottone “view” nella card, apri l’immagine in un modal

    ### 💻ALTRI EXTRA:

    1. Use the `.map` method to create, from your API response, an array containing just the url strings (you can display the result with a console.log)
    2. Usa il metodo “.map” per creare, dalla risposta dell’API, un’array contenente SOLO le URL delle immagini.
    3. Usa il metodo “.filter” per modificare la risposta dell’API mantenendo solo le immagini con un certo autore.

    DOCUMENTAZIONE: `[https://www.pexels.com/api/documentation/?language=javascript#photos-search](https://www.pexels.com/api/documentation/?language=javascript#photos-search)`

    ### ⚠️SUGGERIMENTI!⚠️

    1. Se necessario, testa l’API su Postman
    2. Per ricreare le cards, puoi cambiare l’attributo “src” di tutte le immagini presenti o puoi ricreare completamente le card da zero.
    3. Usa le funzioni a freccia per prenderci confidenza!
*/

const getContainerCard = document.querySelector('#container-cards');
const firstBtn = document.querySelector('#firstQuery');
const secondBtn = document.querySelector('#secondQuery');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const getDialog = document.getElementById('image-container');


//FUNCTION FOR DINAMIC CREATION OF ELEMENT HTML
const createEl = (type, attrib, ...children) => {
    const element = document.createElement(type);
    Object.keys(attrib).forEach((key) => {
        element.setAttribute(key, attrib[key]);
    })

    children.forEach((child) => {
        typeof child === 'string'
        ? element.appendChild(document.createTextNode(child)) 
        : element.appendChild(child); 
    })

    return element
}

//FUNCTION FOR CREATE CARDS
const createCard = (data, element) => {
    const card = createEl('div', {class: 'col', id: `${data.id}`},
        createEl('div', {class: 'card shadow-sm'},
            createEl('div', {id: `${data.id}`, class: 'bd-placeholder-img card-img-top', style: `background-image: url(${data.src.medium});`}, ''),
            createEl('div', {class: 'card-body'},
                createEl('h5', {class: 'card-title'}, `${data.alt}`),
                createEl('p', {class: 'card-text'}, `Artista: ${data.photographer}`),
                createEl('div', {class: 'd-flex justify-content-between align-items-center'}, 
                    createEl('div', {class: 'btn-group'},
                        createEl('button', {class: 'btn btn-sm btn-outline-secondary view-btn', type: 'button', value: `${data.src.original}`}, 'View'),
                        createEl('button', {class: 'btn btn-sm btn-outline-secondary hide-btn', type: 'button'}, 'Nascondi'),
                    ),
                    createEl('small', {class: 'text-muted'}, `ID Image: ${data.id}`),
                ),
            )
        )
    )

    element.appendChild(card);
}

const getData = async (url) => {
    try{
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'HBC3hstDs98FNuP1QdPdKM8VFMO0mzYre3FZ6UKvZFQW8G1ItJVg7tWC',
            },
        });
        return await data.json();
    }

    catch(error) {
        console.log(error);
    }
}

const populateCards = (response) => {
    console.log(response);
    const allCards = document.querySelectorAll('#container-cards .col');

    if(!getContainerCard.hasChildNodes()){
        response.photos.map((element) => { 
            createCard(element, getContainerCard);
        })
    } else { 
        allCards.forEach(el => el.remove());  

        response.photos.map((element) => { 
            createCard(element, getContainerCard);
        })
    }

    const hideBtn = document.querySelectorAll('.hide-btn');
    const viewBtn = document.querySelectorAll('.view-btn');
    const selCards = document.querySelectorAll('#container-cards .col');
    console.log(selCards);

    hideBtn.forEach((singleBtn) => {
        singleBtn.addEventListener('click', () => {
            console.log('hide -> clicked')
            singleBtn.closest('.col').classList.add('hide');
        });
    });

    viewBtn.forEach((singleBtn) => {
        singleBtn.addEventListener('click', () => {
            console.log('viewBtn -> clicked')
            
            const takeImg = singleBtn.value;

            const modalContent = createEl('img', {class: 'img-modal', src: `${takeImg}`}, '');

            getDialog.appendChild(modalContent);
            getDialog.showModal();
            getDialog.addEventListener('click', (event) => {
                console.log('close modal -> clicked')
                if (event.target.id !== 'image-modal') {
                    getDialog.close();
                    modalContent.remove()
                }
            });
        });
    });
}

firstBtn.addEventListener('click', () => {
    console.log('func.click-event.firstBtn -> start')

    getData('https://api.pexels.com/v1/search?query=nature').then(response => {
        populateCards(response);
    });
});

secondBtn.addEventListener('click', (event) => {
    console.log('func.click-event.secondBtn -> start')

    getData('https://api.pexels.com/v1/search?query=animals').then(response => {
        populateCards(response);
    });
});

searchBtn.addEventListener('click', event => {
    event.preventDefault();

    const searchInputValue = searchInput.value;
    console.log(searchInputValue)

    getData('https://api.pexels.com/v1/search?query='+searchInputValue).then(response => {
        populateCards(response);
    })
})

