/*
    

    EpiBooks Navigation

    In questo esercizio migliorerai per l’ultima volta EpiBooks, aggiungendo le funzionalità di routing.

    Ricorda di installare il pacchetto npm: npm i react-router-dom

    Crea un componente Route per l’homepage dell’applicazione: dovrebbe puntare a ‘/’ e caricare il componente BookList.
    Crea un componente Route per una pagina di login, che punterà a una rotta statica senza parametri, come ‘/login’. Questa rotta dovrà renderizzare un 
    component con un form molto semplice, richiedente username e password. Non c’è bisogno che implementi alcun tipo di autenticazione, puoi semplicemente 
    mostrare un messaggio al click del pulsante submit.
    Aggiungi un Link a questa pagina di login nella navbar dell’applicazione.
    Crea un componente NotFound, dovrebbe venire renderizzato ogni volta che l’utente naviga su una rotta non gestita.
    Crea un componente Route per un nuovo componente BookDetails. Questa rotta deve passare un parametro ASIN.
    Aggiungi un pulsante in ogni SingleBook per poter navigare a questa nuova rotta dinamica e caricare BookDetails.
    Crea infine il componente BookDetails, che recupererà il parametro ASIN dall’url e caricherà i dettagli e le recensioni del libro su cui si è cliccato.

    EXTRA

    Se non hai ancora avuto modo di farlo, lavora sull’esperienza utente con indicatori di caricamento e messaggi d’errore.

    📚 API Docs:

    Il tuo endpoint per tutto il CRUD si trova su:

    https://striveschool-api.herokuapp.com/api/comments/

    Ciò significa che puoi effettuare operazioni di GET, DELETE, POST e PUT.

    🛑 IMPORTANT 🛑
    Per utilizzare l’endpoint avrai bisogno di un header di autenticazione. Puoi ottenerne uno su https://strive.school/studentlogin

    Una recensione è strutturata nel seguente modo:

    {
    “comment”: string
    “rate”: string,
    “elementId”: string
    }

    Dove:

    comment è il testo della recensione
    rate è un valore compreso tra 1 e 5
    elementId è l’identificativo ASIN del libro

    Esempio:

    {
    “comment”: “Un buon libro, anche se la trama non mi ha convinto fino in fondo”
    “rate”: “3”,
    “elementId”: “0316438960”
    }

    ⚠️ ATTENZIONE ⚠️

    Facendo un’operazione di GET su https://striveschool-api.herokuapp.com/api/comments/ riceverai TUTTE le recensioni presenti nel database. 
    Probabilmente quello che a te interessa maggiormente sono le recensioni relative ad un singolo libro: puoi ottenerli aggiungendo l’ASIN del libro sul tuo endpoint:
    https://striveschool-api.herokuapp.com/api/comments/:elementId

    Esempio:

    Una GET su https://striveschool-api.herokuapp.com/api/comments/0316438960 ti restituirà tutte le recensioni appartenenti ad un singolo libro.
*/

import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import BookPage from './components/BookPage';
import Login from './pages/Login';

const session = JSON.parse(localStorage.getItem('theme'))

function App() {
    if (!session) {
        localStorage.setItem('theme', JSON.stringify('light'))
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/:asin" element={<BookPage />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
