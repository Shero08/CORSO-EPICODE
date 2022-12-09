let index;

const initAlbum = () => {
    console.log('func.initAlbum');

    //GENERATE CARDS
    for(let i = 0; i < albums.length; i++){
        index = i;
        console.log('index: '+index);

        if(albums[index].Vote >= 4){
            generateCol();
        } else if(albums[index].Vote < 2){
            hallOfShame();
        } else {
            otherAlbums();
        } 
    }
}

const generateCol = () => {
    console.log('func.generateCol -> start');
    const row = document.querySelector('.favorites .row');
    const newCol = document.createElement('div');
    row.appendChild(newCol);
    newCol.classList.add('col');

    generateCard();
}

const generateCard = () => {
    console.log('func.generateCard -> start');
    const column = document.querySelectorAll('.favorites .col')[index];
    const newCard = document.createElement('div');
    column.appendChild(newCard);
    newCard.classList.add('card', 'shadow', 'border-0');

    generateImg();
}

const generateImg = () => {
    console.log('func.generateImg -> start');
    const card = document.querySelectorAll('.favorites .card')[index];
    const newImg = document.createElement('img');
    const cardBody = document.createElement('div');

    card.appendChild(newImg);
    card.appendChild(cardBody);
    cardBody.classList.add('card-body');
    newImg.classList.add('card-img-top');
    newImg.src = albums[index].Poster;
    newImg.alt = 'Album image';

    generateData();
}

const generateData = () => {
    console.log('func.generateData -> start');
    const cardBody = document.querySelectorAll('.favorites .card-body')[index];
    const newTitle = document.createElement('h1');
    const newAuthor = document.createElement('h2');
    const button = document.createElement('button');

    cardBody.appendChild(newTitle).innerText = albums[index].Title;
    cardBody.appendChild(newAuthor).innerText = 'Di: '+albums[index].Author;
    cardBody.appendChild(button).innerText = 'Leggi tutto...'
    newTitle.classList.add('card-title','fs-5','fw-bold');
    newAuthor.classList.add('card-subtitle','fs-6');
    button.classList.add('btn', 'btn-primary');
    button.onclick = onClickModal;
    button.value = index;
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#myModal');
}

const otherAlbums = () => {
    console.log('func.otherAlbums -> start');
    const row = document.querySelector('#album .row');
    const newCol = document.createElement('div');
    row.appendChild(newCol);
    newCol.classList.add('col');

    otherLinks();
}

const otherLinks = () => {
    console.log('func.otherLinks -> start -> index: ' + index);
    const otherCol = document.querySelectorAll('.col')[index];
    const newButton = document.createElement('button');
    otherCol.appendChild(newButton);
    newButton.classList.add('border-0', 'p-0', 'shadow');
    newButton.innerHTML = `<img class="img-fluid rounded" title="${index}" src="${albums[index].Poster}" alt="${albums[index].Title}">`;
    newButton.onclick = onClickModal;
    newButton.setAttribute('data-bs-toggle', 'modal');
    newButton.setAttribute('data-bs-target', '#myModal');
}

const hallOfShame = () => {
    console.log('func.hallOfShame -> start');
    const row = document.querySelector('#hall .row');
    const newCol = document.createElement('div');
    row.appendChild(newCol);
    newCol.classList.add('col');

    otherLinks();
}

const onClickModal = event => {
    console.log('func.onClickModal->event click->tag: ' + event.target.tagName);
    let clickIndex;

    if(event.target.tagName !== 'IMG'){
        clickIndex = event.target.value;
    } else {
        clickIndex = event.target.title;
    }

    const modalTitle = document.querySelector('#myModal .modal-title');
    modalTitle.innerHTML = 'Take a look at this album: ' + albums[clickIndex].Title;

    const modalImg = document.querySelector('#myModal .poster img');
    modalImg.src = albums[clickIndex].Poster;

    const modalH1 = document.querySelector('#myModal .album-title');
    modalH1.innerText = 'Title: ' + albums[clickIndex].Title;

    const modalH2 = document.querySelector('#myModal .album-author');
    modalH2.innerText = 'Author: ' + albums[clickIndex].Author;

    const modalYear = document.querySelector('#myModal .album-year');
    modalYear.innerText = 'Year of publication: ' + albums[clickIndex].Year;

    const modalDuration = document.querySelector('#myModal .album-duration');
    modalDuration.innerText = 'Duration: ' + albums[clickIndex].Duration;

    const modalGenre = document.querySelector('#myModal .album-genre');
    modalGenre.innerText = 'Genre: ' + albums[clickIndex].Genre;

    fillTable(clickIndex);
}

const fillTable = (thisAlbum) => {
    console.log('func.fillTable->start');
    const findTable = document.querySelector('#myModal table tbody');

    if(document.querySelector('#myModal td') !== null){
        const resetTrack = document.querySelectorAll('#myModal td');

        for(const elem of resetTrack){
            elem.remove();
        }
    }

    for(let i=0; i < albums[thisAlbum].tracks.length; i++){
        const newTr = document.createElement('tr');
        const newTd = document.createElement('td');
        newTd.innerHTML = albums[thisAlbum].tracks[i];

        findTable.appendChild(newTr);
        newTr.appendChild(newTd);
    }
}

const numOfAlbum = () => {
    const num = document.querySelector('.num-album');
    num.innerText = `Totale album: ${albums.length}`;
}

window.onload = () => {
    initAlbum();
    numOfAlbum();
}