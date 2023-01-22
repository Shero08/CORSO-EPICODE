/*
# SPOTIFY

## 🎵Strivify

Come allegato al compito trovi un template di una pagina simile a Spotify.

L’obbiettivo dell’esercizio è di ottenere i dati dall’API menzionato sotto e utilizzarli nel template al posto della musica statica presente nel template.

– Riempi la pagina (nelle sezioni appropriata) con i dati da questo API. Puoi usare delle card di bootstrap. Puoi cambiare le query se preferisci!

`https://striveschool-api.herokuapp.com/api/deezer/search?q=pinguini%20tattici%20nucleari`

`https://striveschool-api.herokuapp.com/api/deezer/search?q=maneskin`

`https://striveschool-api.herokuapp.com/api/deezer/search?q=mahmood`

Assicurati che l’API venga chiamato durante il caricamento della pagina. 

– Aggiungi un pulsante “Tutti gli album”. Quando premuto, dovrebbe mostrare in un modal tutti i titoli degli album presenti sulla pagina.
– Aggiungi un pulsante “conta unici”. Quando premuto, stampa a console il numero di album UNICI nella pagina.
*/

//DECLARATION
const takeDiv = document.querySelector('#cardSection');
const takeDivManeskin = document.querySelector('#maneskinSection');
const takeDivMahmood = document.querySelector('#mahmoodSection');
const getSection = document.querySelector('#cardSection2');
const modal = document.querySelector('dialog');


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

//FUNCTION FOR DINAMIC ASYNC FETCH
const getData = async (url) => {
    try{
        const albums = await fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin' : 'http://localhost:3000',
                'Access-Control-Allow-Credentials' : true,
                'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
            },
            mode: "cors",
        });
        return await albums.json();
    } 

    catch(error) {
        console.log(error);
    }
}

//FUNCTION FOR TIME FORMAT
const timeFormat = (duration) => {  
    // Hours, minutes and seconds
    let hrs = ~~(duration / 3600);
    let mins = ~~((duration % 3600) / 60);
    let secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

//INVOCATION OF "GETDATA" TO GET THE DATA FROM THE API
getData('https://striveschool-api.herokuapp.com/api/deezer/search?q=pinguini%20tattici%20nucleari')
    .then(response => {
        console.log(response);
        
        response.data.slice(0, 8).map((element) => { 
            createCard(element, takeDiv)
        })

        const tracks = response.data.map((track) => {
            const trackAPI = track.album.tracklist
            getData(trackAPI);
        });
        console.log(tracks)
    });

getData('https://striveschool-api.herokuapp.com/api/deezer/search?q=maneskin')
    .then(response => {
        console.log(response);
        
        response.data.slice(0, 8).map((element) => { 
            createCard(element, takeDivManeskin)
        })
    });

getData('https://striveschool-api.herokuapp.com/api/deezer/search?q=mahmood')
    .then(response => {
        console.log(response);
        
        response.data.slice(0, 8).map((element) => { 
            createCard(element, takeDivMahmood)
        })
    });


//FUNCTION FOR CREATE CARDS
const createCard = (data, element) => {
    const card = createEl('div', {class: 'col'},
        createEl('a', {class: 'card', href: '#'},
            createEl('div', {class: 'card-img-top', style: `background-image: url(${data.artist.picture_big});`}),
            createEl('div', {class: 'card-body'},
                createEl('div', {class: 'card-title'}, `${data.title}`)
            )
        )
    )

    element.appendChild(card);
    populateModal(card, data)
}

//EVENT TO CREATE ELEMENT AND OPEN THE MODAL
const populateModal = (element, data) => {
    element.addEventListener('click', () => {
        const modalContent = createEl('div', {class: 'album-modal-header'},
            createEl('div', {class: 'album-card', style: `background-image: url(${data.artist.picture_big});`,}),
            createEl('ul', {class: 'modal-list'},
                createEl('li', {class: 'info-list'}, `${data.title}`),
                createEl('li', {class: 'info-list art'}, `Autore: ${data.artist.name}`),
                createEl('li', {class: 'info-list'}, 
                    createEl('a', {class: 'album-link', href: '#'}, `Album: ${data.album.title}`)
                ),
                createEl('li', {class: 'info-list'}, `Durata: ${timeFormat(data.duration)}`),
                createEl('li', {class: 'info-list'}, 
                    createEl('a', {class: 'track-link', href: `${data.link}`, target: '_blank'}, `${data.link}`)
                ),
            ),
            createEl('div', {id: 'btn-close', href: '#'}, 'X')
        )
        modal.appendChild(modalContent)
        modal.showModal()
        modal.addEventListener('click', (event) => {
            if (event.target.id === 'btn-close') {
                modal.close();
                modalContent.remove()
            }
        });

        const albumBtn = document.querySelector('.album-link');
        albumBtn.addEventListener('click', () => {
            console.log('clicked');
            modalContent.remove();

            populateAlbum(data);
        })

    })
}

const populateAlbum = (data) => {
    const modalAlbum = createEl('div', {class: 'album-modal-header2'}, 
        createEl('div', {class: 'album-header', style: `background-image: url(${data.album.cover_big});`},
        createEl('div', {class: 'album-header-overlay'}, ``),
            createEl('div', {class: 'album-header-title'}, `${data.album.title}`)
        ),
        createEl('div', {class: 'album-body'}, 
            createEl('div', {class: 'album-info'}, '')
        ),
        createEl('div', {id: 'btn-close', href: '#'}, 'X')
    );

    modal.appendChild(modalAlbum);
    modal.addEventListener('click', (event) => {
        if (event.target.id === 'btn-close') {
            modal.close();
            modalAlbum.remove()
        }
    });
}
