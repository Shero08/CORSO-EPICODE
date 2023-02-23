console.log(window.location.search);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RhYjg0ODJiMDAxNTAwMTU5YThiNjgiLCJpYXQiOjE2NzY5MjM3MTksImV4cCI6MTY3ODEzMzMxOX0.UzS4ZMrCmXPLaB5y32U3N2Z7DU397iNrXS1CKR74WL0';
const api = 'https://striveschool-api.herokuapp.com/api/product/';
const containerProd = document.getElementById('product');
const pageProd = './product.html?q='

//THAT CREATE AN OBJECT THAT HAS METHODS TO HELP RETREIVE THE INFORMATION
const params = new URLSearchParams(window.location.search);
const query = params.get('q');
console.log(query);

//DECLARATION FOR CART
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
console.log(cartArray);
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
getRequest(api + query).then((response) => {
    console.log(response);

    createProduct(response, containerProd);
    addToCart(response);
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

const populateCart = (cart) => {
    listProd.innerHTML = '';

    const localCart = JSON.parse(sessionStorage.getItem('cart')); //TRASFORMO JSON IN OGGETTO

    if(localCart){
        cart && cart.map((prod) => {
            createElCart(prod, listProd);
        });

        const delBtn = document.querySelectorAll('.del-btn')

        delBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                console.log('func.delBtn.click -> start -> id: '+ e.target.id);
                removeFromArray(cartArray, e.target.id)
                window.location.reload();
            })
        });
    }
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

//FUNCTION TO CREATE ALBUM SECTION
const createProduct = (data, place) => {
    const Product = createElement('div', { class: 'row g-3 mb-4' }, 
        createElement('div', {class: 'col-6 px-4'}, 
            createElement('img', {src: `${data.imageUrl}`, alt: `${data.name}`}, )
        ),
        createElement('div', {class: 'col-6 px-5'}, 
            createElement('ul', {class: 'info-prod'},
                createElement('li', {class: 'prod-brand'}, `${data.brand}`),
                createElement('li', {class: 'prod-title'}, `${data.name}`),
                createElement('li', {class: 'prod-price'}, `Prezzo: € ${data.price}`),
                createElement('li', {class: 'prod-id'}, `ID Prodotto: ${data._id}`),
                createElement('li', {class: 'prod-desc'}, `Descrizione: ${data.description}`),
            ),    
        createElement('a', {class: 'add-cart-btn btn', href: '#'}, 'Aggiungi al carrello'),
        ),
    );

    place.appendChild(Product);
}

//ADD PRODUCT TO CART
const addToCart = (response) => {
    const addBtn = document.querySelector('.add-cart-btn');

        addBtn.addEventListener('click', () => {
            console.log('addToCart -> clicked');

            const findRes = response._id;
            
            const checkID = cartArray.some((el) => {
                return el._id === findRes;
            })

            if(!checkID){
                cartArray.push(response);
            } else {
                alert('Prodotto già a carrello');
            }
            console.log(cartArray);

            sessionStorage.setItem('cart', JSON.stringify(cartArray)); //TRASFORMO L'OGGETTO IN JSON

            elOfCart.classList.add('show');
            const totCart = cartArray.length;
            elOfCart.textContent = totCart;
        });
};

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