console.log(window.location.search);

const api = `https://jsonplaceholder.typicode.com/users/`;
const containerBook = document.getElementById('book');
const userData = document.getElementById('user-data');
const userMap = document.getElementById('user-map');

//THAT CREATE AN OBJECT THAT HAS METHODS TO HELP RETREIVE THE INFORMATION
const params = new URLSearchParams(window.location.search);
const query = params.get('q');
console.log(query);

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
getData(api + query).then((response) => {
    console.log('func.async.getData->then -> response');
    console.log(response);
    //populateTable(response);
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
const createUser = (data, address, place) => {
    const user = createElement('tr', { class: 'user' },
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

    place.appendChild(user);
}

