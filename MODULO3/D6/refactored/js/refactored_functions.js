const favouriteAlbumContainer = document.getElementById('fav-collapse')
const otherAlbumsContainer = document.getElementById('other-collapse')
const hallOfShameContainer = document.getElementById('hall-collapse')
const totalAlbums = document.querySelector('.num-album');
const modal = document.querySelector('dialog')

const mostRatedAlbums = albums.filter(album => album.Vote >= 4)
const hallOfShameAlbums = albums.filter(album => album.Vote <= 2)
const middleRatedAlbums = albums
    .filter(album => album.Vote > 3)
    .filter(album => album.Vote < 4)
console.log(mostRatedAlbums);

const createEl = (type, attributes, ...children) => {
    const element = document.createElement(type)

    Object
        .keys(attributes)
        .forEach((key) => {
            element.setAttribute(key, attributes[key])
        })

    children
        .forEach(child => {
            typeof child === 'string'
                ? element.appendChild(document.createTextNode(child))
                : element.appendChild(child)
        })

    return element
}

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
        modal.addEventListener('click', (event) => {
            if (event.target.id !== 'album-modal-header') {
                modal.close();
                modalContent.remove()
            }
        });

    })
}

const populateAlbum = (albumType, data) => {
    const card = createEl(
        'div',
        {
            title: data.Title,
            class: 'album-card', style:
                `background-image: url(${data.Poster});`
        },
        createEl('div', {class: 'rating'}, `${data.Vote}`)
    )
    albumType.appendChild(card)
    populateModal(card, data)
}

mostRatedAlbums.map(favourite => populateAlbum(favouriteAlbumContainer, favourite))
middleRatedAlbums.map(middleRated => populateAlbum(otherAlbumsContainer, middleRated))
hallOfShameAlbums.map(poorRated => populateAlbum(hallOfShameContainer, poorRated))

console.log(mostRatedAlbums)

totalAlbums.innerText = `Totale album: ${albums.length}`;

