// raggruppiamo in alto gli elementi che possono servirci
const favouriteAlbumContainer = document.getElementById('fav-collapse')
const otherAlbumsContainer = document.getElementById('other-collapse')
const hallOfShameContainer = document.getElementById('hall-collapse')
const modal = document.querySelector('dialog')

// i metodi degli array ci consentono di manipolarli e fornirci il risultato che desideriamo
// senza i cicli for che sono ormai superati (salvo casi specifici)
const mostRatedAlbums = albums.filter(album => album.Vote >= 4)
const hallOfShameAlbums = albums.filter(album => album.Vote <= 2)
const middleRatedAlbums = albums
    .filter(album => album.Vote > 3)
    .filter(album => album.Vote < 4)

// dato che dobbiamo creare molti elementi, in questi casi un developer si crea una funzione
// che gli consente di farlo in maniera più pulita e semplice
const createEl = (type, attributes, ...children) => {
    const element = document.createElement(type)

    // tradformo tutte le chiavi dell'oggetto in proprietà da passare a setattribute
    Object
        .keys(attributes)
        .forEach((key) => {
            element.setAttribute(key, attributes[key])
        })

    // se passo una stringa, creerà un nodo di tipo testo, altrimenti un normale nodo
    children
        .forEach(child => {
            typeof child === 'string'
                ? element.appendChild(document.createTextNode(child))
                : element.appendChild(child)
        })

    return element
}

// mi creo una funzione che andrà a popolare il mio modale con i dati che voglio
// noterai che nell'html ho utilizzato il più comodo <dialog> invece di un div.
// il dialog ci consente di manipolarlo in js con funzioni built-in
const populateModal = (element, data) => {
    element.addEventListener('click', () => {
        const modalContent = createEl(
            'div',
            {class: 'album-modal-header'},
            createEl('div', {
                class: 'album-card', style:
                    `background-image: url(${data.Poster});`,
            }),
            createEl('ul', {class: 'modal-list'},
                createEl('li', {class: 'info-list'}, `${data.Title}`),
                createEl('li', {class: 'info-list'}, `Autore: ${data.Author}`),
                createEl('li', {class: 'info-list'}, `Durata: ${data.Duration}`),
                createEl('li', {class: 'info-list'}, `Genere: ${data.Genre}`),
            )
        )
        modal.appendChild(modalContent)
        modal.showModal()
        // se clicco al di fuori del mio modale, si chiude e si svuota
        modal.addEventListener('click', (event) => {
            if (event.target.id !== 'album-modal-header') {
                modal.close();
                modalContent.remove()
            }
        });

    })
}

// mappando i relativi album che abbiamo dichiarato prima, siamo sicuri di
// avere sempre i dati giusti tornati dal filter (in alto)
mostRatedAlbums.map((favourite) => {
    const card = createEl(
        'div',
        {
            title: favourite.Title,
            class: 'album-card', style:
                `background-image: url(${favourite.Poster});`
        },
        createEl('div', {class: 'rating'}, `${favourite.Vote}`)
    )
    favouriteAlbumContainer.appendChild(card)
    populateModal(card, favourite)
})

middleRatedAlbums.map((favourite) => {
    const card = createEl(
        'div',
        {
            title: favourite.Title,
            class: 'album-card', style:
                `background-image: url(${favourite.Poster});`
        },
        createEl('div', {class: 'rating'}, `${favourite.Vote}`)
    )
    otherAlbumsContainer.appendChild(card)
    populateModal(card, favourite)
})

hallOfShameAlbums.map((favourite) => {
    const card = createEl(
        'div',
        {
            title: favourite.Title,
            class: 'album-card', style:
                `background-image: url(${favourite.Poster});`,
        },
        createEl('div', {class: 'rating'}, `${favourite.Vote}`)
    )
    hallOfShameContainer.appendChild(card)
    populateModal(card, favourite)
})

const numOfAlbum = () => {
    const num = document.querySelector('.num-album');
    num.innerText = `Totale album: ${albums.length}`;
}

window.onload = () => {
    numOfAlbum();
}
