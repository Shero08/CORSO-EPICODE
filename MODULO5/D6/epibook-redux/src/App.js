/*
    Miglioriamo EpiBooks!

    Riparti dal progetto precedente, oggi aggiungeremo le seguenti nuove funzionalità.

    Oggi devi modificare il layout dell’applicazione: crea due colonne, quella di sinistra continuerà a mostrare le copertine del libri, mentre quella sulla 
    destra mostrerà SEMPRE un componente CommentArea. Infine rimuovi l’altra istanza di CommentArea, quella presente all’interno di SingleBook.
    Ora, al caricamento dell’applicazione, CommentArea non riceverà più immediatamente un libro per effettuare la fetch delle recensioni; tienine conto e 
    fai in modo che CommentArea non provochi un crash dell’intera applicazione quando ancora non possiede dati da mostrare.
    Ora che la proprietà ‘selected’ è memorizzata all’interno del componente BookList, questo valore deve raggiungere anche CommentArea all’interno di una prop: 
    quando ‘selected’ cambia (ovvero quando l’utente clicca su un nuovo libro) CommentArea deve eseguire una nuova fetch con il nuovo valore di ‘selected’, 
    e le recensioni nella colonna di destra devono riflettere il libro selezionato nella colonna di sinistra. Puoi ottenere questo risultato inserendo un 
    componentDidUpdate() all’interno di CommentArea, e impostandolo in ascolto delle modifiche sulla prop ‘selected’.
    Quanto la sezione delle recensioni è di nuovo funzionante, controlla che anche il componente AddComment non abbia problemi. A seconda della tua 
    implementazione, potrebbe richiedere una riscrittura in modo da mantenere aggiornata la sua proprietà elementId (necessaria per la richiesta POST) 
    con il libro attualmente selezionato.

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

import './App.css'
import BookList from './components/BookList'
import CommentArea from './components/CommentArea'
import Header from './components/Header'

const session = JSON.parse(localStorage.getItem('theme'))

function App() {
    if (!session) {
        localStorage.setItem('theme', JSON.stringify('light'))
    }

    return (
        <div className="App">
            <Header /> 
            <section className="main flex mx-auto max-w-2xl lg:max-w-full">
                <BookList />
                <CommentArea />
            </section>
        </div>
    )
}

export default App
