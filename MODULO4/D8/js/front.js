/*
# ESERCIZI

### E-COMMERCE FRONT PAGE & BACK OFFICE

– **INIZIA DAGLI ULTIMI COMPITI FATTI**

Il tuo obbiettivo è creare una pagina che gestisca i prodotti di un e-commerce.

Le task di oggi:

– Nella frontpage, aggiungi un loader che sia visibile mentre l’API elabora i dati.
– Cliccando su un prodotto, l’utente deve essere reindirizzato ad una pagina prodotto. Passa l’id come query string nell’URL.
– Nella pagina prodotto, mostra le informazioni del prodotto su cui si è cliccato. Puoi prendere le informazioni dall’endpoint “product/IL TUO ID QUI”
– Nel backoffice, aggiungi la funzionalità per modificare un prodotto e un pulsante per eliminarlo.
– Aggiungi una validazione dei prodotti in face di creazione o modifica usando gli alert di bootstrap

l prodotto deve essere strutturato così:

“`jsx
{
“_id”: “5d318e1a8541744830bef139”, // SERVER GENERATED
“name”: “3310 cellphone”, // REQUIRED
“description”: “An unforgettable icon.”, // REQUIRED
“brand”: “Nokia”, // REQUIRED
“imageUrl”: “https://bit.ly/3CExjRa”, // REQUIRED
“price”: 100, // REQUIRED
“userId”: “admin”, // SERVER GENERATED
“createdAt”: “2021-09-19T09:32:10.535Z”, // SERVER GENERATED
“updatedAt”: “2021-09-19T09:32:10.535Z”, // SERVER GENERATED
“__v”: 0 // SERVER GENERATED
}
“`

I campi che dicono “REQUIRED” sono obbligatori. Quelli “SERVER GENERATED”, invece, non serve che siano inviati all’API.

L’endpoint è:

`[https://striveschool-api.herokuapp.com/api/product/](https://striveschool-api.herokuapp.com/api/product/)`

Sia per GET che per POST.

Per PUT e DELETE è necessario specificare l’id

`https://striveschool-api.herokuapp.com/api/product/id`

🛑 **IMPORTANTE** 🛑

OGNI CHIAMATA DEVE ESSERE AUTENTICATE.

Ogni richiesta a questo API deve includere un token per ottenere l’accesso.

Puoi ottenere il token qui: [https://strive.school/studentlogin](https://strive.school/studentlogin)

Esempio:

“`jsx
fetch(‘https://striveschool-api.herokuapp.com/api/product/’, {
headers: {
Authorization: ‘Bearer XXXXXXXXXXXXXXXXX’
}
})
“`

Dove “XXXXXXXXXXXXXXXXX“ deve essere sostituito dal token preso dalla pagina menzionata in precedenza.

Il token dura 14 giorni, se te ne serve uno nuovo, puoi ottenerlo con la seguente richiesta:

“`jsx
method: “POST”
endpoint: “https://striveschool-api.herokuapp.com/api/account/login”
request body:
{
“username”: // the username you registered with,
“password”: // the password you registered with
}
“`

Puoi iniziare con il template allegato.

### 🔴 CENTRO RISOLUZIONE PROBLEMI / FAQ:

Imparare a leggere gli errori è fondamentale**! ✨**

**Ricevo solo un array vuoto, perché?**

L’API ti invierà solo i prodotti che TU hai aggiunti. Prova a creare qualcosa con POST e controlla di nuovo.

**Ricevo un errore 500, come posso risolvere?**

Controlla nella network tab del tuo inspector per vedere l’errore specifico.
Solitamente

1. Ti manca un field nel corpo
2. Hai una “duplicate key”, cioè il nome del prodotto esiste già
3. Hai inviato il tipo sbagliato di dati (una stringa invece di un numero o simili).
*/

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RhYjg0ODJiMDAxNTAwMTU5YThiNjgiLCJpYXQiOjE2NzUyNzg0MDgsImV4cCI6MTY3NjQ4ODAwOH0.zHhKdPwEWPfkAyPzNF1mmucurKPTcZs7lQqBlhVKoaw';
const api = 'https://striveschool-api.herokuapp.com/api/product/';
const containerCards = document.getElementById('container-cards');
const pageProd = './product.html?q='
const loader = document.getElementById('loader');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn'); 
let currentFilterValue = "";
let allProduct;
const listProd = document.getElementById('list-prod');
const cartArray = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
const cartBtn = document.getElementById('cart-btn');
const elOfCart = document.getElementById('tot-cart');
const totalCart = document.getElementById('total-cart');
const delCart = document.getElementById('empty-btn');

if(cartArray.length > 0){
    elOfCart.classList.add('show');
}

elOfCart.textContent = cartArray.length;
console.log(cartArray.length);

//CALL THE API
const getRequest = async (url) => {
    console.log('func.async.getRequest -> start');
    try {
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });

        return await data.json();
    }
    catch (error) {
        console.log(error);
    }
}

//TAKE RESPONSE FROM API
getRequest(api).then((response) => {
    loader.classList.add('hide');
    populateCards(response);

    allProduct = document.querySelectorAll('#container-cards .col')
    filterProduct(allProduct, response);

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

    const localCart = JSON.parse(sessionStorage.getItem('cart')); //TRASFORMO JSON IN OGGETTO

    if(localCart){
        cart && cart.map((prod) => {
            createElCart(prod, listProd);
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

//FUNCTION TO CREATE CART LIST
const createElCart = (data, place) => {
    const element = createElement('li', {}, 
        createElement('a', {class: 'dropdown-item', href: `${pageProd}${data._id}`}, `${data.name}`),
        createElement('a', {class: 'del-btn ms-auto', href: '#'}, 
            createElement('i', {class: 'fa-solid fa-trash', id: `${data._id}`}, ''),
        ),
    );

    place.appendChild(element);
}

//FUNCTION TO CREATE CARD
const createCard = (data, place) => {
    const card = createElement('div', { class: 'col' },
        createElement('div', { class: 'card' },
            createElement('a', {class: 'bd-placeholder-img card-img-top', href: `${pageProd}${data._id}`},
            createElement('div', { id: `${data.id}`, class: 'bd-placeholder-img card-img-top', style: `background-image: url(${data.imageUrl});` }, ''),
            ),
            createElement('div', { class: 'card-body' },
                createElement('a', { class: 'card-title', href: `${pageProd}${data._id}` }, `${data.name}`),
                createElement('p', { class: 'card-text' }, `Prezzo: € ${data.price}`),
                createElement('div', { class: 'd-flex align-items-center' },
                    createElement('button', { class: 'btn add-btn', type: 'button', value: `${data._id}` }, 'Aggiungi al carrello'),
                ),
            )
        )
    )

    place.appendChild(card);
}

//FILTER FUNCTION
const filterProduct = (oldList, response) => {
    searchBtn.addEventListener('click', (event) => {
        console.log('func.filterProduct-> click -> start');
        event.preventDefault();

        oldList.forEach(el => el.remove());

        const inputValue = searchInput.value
        console.log(inputValue);

        if (inputValue !== currentFilterValue) {
            currentFilterValue = inputValue;
            const filterRes = response.filter((elem) => {
                return elem.name.toLowerCase().includes(inputValue);
            });

            filterRes.map((el) => {
                createCard(el, containerCards);
            });

            oldList = document.querySelectorAll('#container-cards .col')
        }
    })
}

//ADD PRODUCT TO CART
const addToCart = (response) => {
    const addBtn = document.querySelectorAll('.add-btn');

    addBtn.forEach((singleBtn) => {
        singleBtn.addEventListener('click', () => {
            console.log('addToCart -> clicked')

            const findRes = response.find((elem) => {
                return singleBtn.value === elem._id;
            });
            
            const checkID = cartArray.some((el) => {
                return el._id === findRes._id;
            })

            if(!checkID){
                cartArray.push(findRes);
            } else {
                alert('Prodotto già a carrello');
            }
            console.log(cartArray);

            sessionStorage.setItem('cart', JSON.stringify(cartArray)); //TRASFORMO L'OGGETTO IN JSON

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
    sessionStorage.clear();
    window.location.reload();
});

const removeFromArray = (array, id) => {
    console.log(id);
    const filterArray = array.filter(cartItem => cartItem._id !== id);
    sessionStorage.setItem('cart', JSON.stringify(filterArray));
    console.log(filterArray);
}; 

