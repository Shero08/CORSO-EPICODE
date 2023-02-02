
/*
    # Esercizi

    ## Negozio di libri EPICO 📚

    Sei incaricato di creare la funzione di carrello per un marketplace online.

    Usa tutti i nuovi tools e features che hai imparato per creare un’applicazione con i seguenti requisiti:

    – Una homepage che mostri tutti i libri con delle card di bootstrap
    – Le card dovrebbero avere un pulsante per aggiungere al carrello e uno per “saltare” un prodotto
    – Una sezione per il carrello
    – Un input di testo per cercare i libri   

    Per raggiungere questo risultato, segui queste istruzioni:

    – Usa questo API per ottenere la lista di libri: `https://striveschool-api.herokuapp.com/books`
    – Renderizza tutti i libri usando i template literars and .forEach o .map
    – Aggiungi il pulsante “aggiungi al carrello” a tutte le card
    – Quando il pulsante viene cliccato…
    1. Aggiungi il libro alla lista del carrello
    2. cambia lo stile della card per mostrare che è già stata aggiunta (un bordo colorato o un badge vanno bene)
    – Aggiungi un bottone “salta” a tutte le card
    – Quando cliccato, questo bottone dovrebbe far sparire la card corrispondente.
    – Aggiungi un input di testo che funzioni come una barra di ricerca. Quando l’utente scrive più di 3 caratteri, filtra il risultato dell’API per renderizzare solo i libri con un titolo che corrisponda, anche parzialmente, al contenuto dell’input. SUGGERIMENTO: usa .filter()
    – Dai la possibilità all’utente di cancellare libri dal loro carrello
    – Conta gli elementi nel carrello usando “.reduce()” e mostra il risultato nella sezione carrello

    ### EXTRA:

    1. Add a **empty cart** button, to delete the whole list
    2. Aggiungi un pulsante per svuotare il carrello
    3. Crea una pagine prodotto: quando l’utente clicca sul libro, deve essere portato ad un’altra pagine. Passa l’ASIN del libro come query nell’URL
    4. Nella pagina prodotto, mostra i dettagli del libro con l’ASIN corrispondente usando questo endpoint: `https://striveschool-api.herokuapp.com/books/IL TUO ASIC QUI`
*/


//DEFINITION OF VARIABLES
const containerCards = document.getElementById('container-cards');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const listProd = document.getElementById('list-prod');
const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const cartBtn = document.getElementById('cart-btn');
const elOfCart = document.getElementById('tot-cart');
const totalCart = document.getElementById('total-cart');
const pageBook = './book.html?q=';
const delCart = document.getElementById('empty-btn');
const viewCart = document.getElementById('view-cart');
const sectionCart = document.getElementById('cart');
const innerCart = document.getElementById('container-cart');

if(cartArray.length > 0){
    elOfCart.classList.add('show');
}

elOfCart.textContent = cartArray.length;
console.log(cartArray.length);



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
const createCard = (data, place) => {
    const card = createElement('div', { class: 'col' },
        createElement('div', { class: 'card shadow-sm' },
            createElement('div', { id: `${data.id}`, class: 'bd-placeholder-img card-img-top', style: `background-image: url(${data.img});` }, ''),
            createElement('div', { class: 'card-body' },
                createElement('a', { class: 'card-title', href: `${pageBook}${data.asin}` }, `${data.title}`),
                createElement('p', { class: 'card-text' }, `Genere: ${data.category}`),
                createElement('p', { class: 'card-text' }, `Prezzo: € ${data.price}`),
                createElement('div', { class: 'd-flex justify-content-between align-items-center' },
                    createElement('button', { class: 'btn btn-sm btn-outline-secondary add-btn', type: 'button', value: `${data.asin}` }, 'Aggiungi al carrello'),
                    createElement('button', { class: 'btn btn-sm btn-outline-secondary hide-btn', type: 'button' }, 'Salta'),
                ),
            )
        )
    )

    place.appendChild(card);
}

//FUNCTION TO CREATE CART LIST
const createElCart = (data, place) => {
    const element = createElement('li', {}, 
        createElement('a', {class: 'dropdown-item', href: `${pageBook}${data.asin}`}, `${data.title}`),
        createElement('a', {class: 'del-btn ms-auto', href: '#'}, 
            createElement('i', {class: 'fa-solid fa-trash', id: `${data.asin}`}, ''),
        ),
    );

    place.appendChild(element);
}

//FUNCTION TO CREATE ELEMENT FOR SECTION CART
const createListCart = (data, place) => {
    const cart = createElement('div', {class: 'row'}, 
        createElement('div', {class: 'col-1'}, 
            createElement('img', {class: 'img-cart', src: `${data.img}`, alt: `${data.title}`},),
        ),
        createElement('div', {class: 'col-6'}, `${data.title}`),
        createElement('div', {class: 'col-3'}, `€ ${data.price}`),
        createElement('div', {class: 'col-2'}, 
            createElement('a', {class: 'btn', href: '#'}, 
                createElement('span', {}, 'Elimina '), 
                createElement('i', {class: 'fa-solid fa-trash', id: `${data.asin}`}),    
            ),
        ),
    );

    place.appendChild(cart);
}

//CALL THE API
const getRequest = async (url) => {
    console.log('func.async.getRequest -> start');
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
getRequest('https://striveschool-api.herokuapp.com/books').then((response) => {
    populateCards(response);

    const allCards = document.querySelectorAll('#container-cards .col');
    
    searchBook(allCards, response);
    hideElement();
    addToCart(response);
});

//CALL THE FUNCTION TO CREATE CARDS
const populateCards = (response) => {
    console.log(response);

    response.map((element) => {
        createCard(element, containerCards)
    });
}

const populateCart = (cart) => {
    listProd.innerHTML = '';

    const localCart = JSON.parse(localStorage.getItem('cart')); //TRASFORMO JSON IN OGGETTO

    if(localCart){
        cart && cart.map((prod) => {
            createElCart(prod, listProd);
            createListCart(prod, innerCart);
        });

        const delBtn = document.querySelectorAll('.del-btn')
            console.log(delBtn);

        delBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                console.log('func.delBtn.click -> start -> id: '+ e.target.id);
                removeFromArray(cartArray, e.target.id)
                window.location.reload();
            })
        });
    }
}

//SEARCH BOOK
const searchBook = (cards, response) => {
    let searchDone = false;

    searchBtn.addEventListener('click', event => {
        console.log('func.searchBtn.click -> start');
        event.preventDefault();
        
        cards.forEach(el => el.remove());

        const searchInputValue = searchInput.value;
        console.log(searchInputValue)

        const filterRes = response.filter((elem) => {
            return elem.title.toLowerCase().includes(searchInputValue);
        });
        
        if(searchDone){
            console.log('ricerca già effettuata');
            alert('Ricerca già effettuata.');
        } else {
            filterRes.map((el) => {
                createCard(el, containerCards);
            });

            searchDone = true;
        }
    });
}

//FUNCTION TO ADD THE HIDE EVENT
const hideElement = () => {
    const hideBtn = document.querySelectorAll('.hide-btn');

    hideBtn.forEach((singleBtn) => {
        singleBtn.addEventListener('click', () => {
            console.log('hide -> clicked')
            singleBtn.closest('.col').classList.add('hide');
        });
    });
}

//ADD BOOK TO CART
const addToCart = (response) => {
    const addBtn = document.querySelectorAll('.add-btn');

    addBtn.forEach((singleBtn) => {
        singleBtn.addEventListener('click', () => {
            console.log('addToCart -> clicked')

            const findRes = response.find((elem) => {
                return singleBtn.value === elem.asin;
            });
            
            const checkAsin = cartArray.some((el) => {
                return el.asin === findRes.asin;
            })

            if(!checkAsin){
                cartArray.push(findRes);
            } else {
                alert('Prodotto già a carrello');
            }
            console.log(cartArray);

            localStorage.setItem('cart', JSON.stringify(cartArray)); //TRASFORMO L'OGGETTO IN JSON

            elOfCart.classList.add('show');
            const totCart = cartArray.length;
            elOfCart.textContent = totCart;
        });
    }); 
}

//RIEMPIE IL MENU' CARRELLO
cartBtn.addEventListener('click', () => {
    populateCart(cartArray);

    const sumCart = cartArray.reduce((acc, current) => {
        return acc + current.price
    }, 0).toFixed(2);

    totalCart.innerHTML = `Totale Carrello: € ${sumCart}`;
});

delCart.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
});


const removeFromArray = (array, id) => {
    console.log(id);
    const filterArray = array.filter(cartItem => cartItem.asin !== id);
    localStorage.setItem('cart', JSON.stringify(filterArray));
    console.log(filterArray);
};

viewCart.addEventListener('click', () => {
    sectionCart.classList.add('show');
    containerCards.classList.add('hide');
});






