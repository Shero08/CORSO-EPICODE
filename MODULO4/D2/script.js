const takeDiv = document.getElementById('main');

const products = [
    {
        id: '1',
        name: 'Prodotto 1',
        description: 'Lorem ipsum',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
    },
    {
        id: '2',
        name: 'Prodotto 2',
        description: 'Lorem ipsum',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
    },
    {
        id: '3',
        name: 'Prodotto 3',
        description: 'Lorem ipsum',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
    },
    {
        id: '4',
        name: 'Prodotto 4',
        description: 'Lorem ipsum',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
    }
];

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

const createCard = (data, element) => {
    const card = createEl('div', {id: 'card-container', class: 'card-container'},
    createEl('div', {id: 'card-image', class: 'card-image', style: `background-image: url(${data.images[0]});`}),
    createEl('div', {id: 'card-data', class: 'card-data'}, `${data.name}`),
    createEl('div', {id: 'card-description', class: 'card-description'}, `${data.description}`)
)

    element.appendChild(card);
}

const getData = async () => {
    const data = await fetch('https://dummyjson.com/products');
    return await data.json();
}

getData().then(data => {
    data.products.map((product) => {
        createCard(product, takeDiv)
    })

    console.log(data)
});