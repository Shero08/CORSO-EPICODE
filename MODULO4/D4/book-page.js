console.log(window.location.search);

const apiURL = 'https://striveschool-api.herokuapp.com/books/';
const containerBook = document.getElementById('book');
const textDesc = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'

//THAT CREATE AN OBJECT THAT HAS METHODS TO HELP RETREIVE THE INFORMATION
const params = new URLSearchParams(window.location.search);
const query = params.get('q');
console.log(query);

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
getRequest(apiURL + query).then((response) => {
    console.log(response);

    createBook(response, containerBook);
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

//FUNCTION TO CREATE ALBUM SECTION
const createBook = (data, place) => {
    const book = createElement('div', { class: 'row g-3 mb-4' }, 
        createElement('div', {class: 'col-4 px-4'}, 
            createElement('img', {src: `${data.img}`, alt: `${data.title}`}, )
        ),
        createElement('div', {class: 'col-8 px-5'}, 
            createElement('ul', {class: 'info-book'},
                createElement('li', {class: 'book-title'}, `${data.title}`),
                createElement('li', {class: 'book-asin'}, `Asin: ${data.asin}`),
                createElement('li', {class: 'book-cat'}, `Genere: ${data.category}`),
                createElement('li', {class: 'book-price'}, `Prezzo: € ${data.price}`),
                createElement('li', {class: 'book-desc'}, `Trama: ${textDesc}`),
            ),    
        createElement('a', {class: 'add-cart-btn', href: '#'}, 'Aggiungi al carrello'),
        ),
    );

    place.appendChild(book);
}