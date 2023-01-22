
/*
    # Notes – HTTP

    – HyperText Transfer Protocol
    – Un “messaggio” mandato ad un server
    – Ogni “messaggio” è chiamato RICHIESTA e riceverà una RISPOSTA

    ## HTTP REQUEST

    La richiesta contiene:

    > **URL** ⇒ https://google.com/apis/test

    > **Metodo** ⇒ GET, POST, PUT, PATCH, DELETE…

    > **Headers** ⇒ Authentication, cookies, Content-Type

    > **Payload** ⇒ Il “corpo” del messaggio. Può essere vuoto

    ### Url

    – E’ l’endpoint che stiamo cercando di raggiungere
    – Inizia con HTTP o HTTPS
    – HTTPS è la versione sicura (crittografata) dell’HTTP

    ### Metodo

    Il metodo dice all’endpoint il motivo della nostra richiesta.

    > GET ⇒ Voglio delle informazioni

    > POST ⇒ Sto mandando delle informazioni

    > PUT ⇒ Voglio MODIFICARE delle informazioni

    > DELETE ⇒ Voglio CANCELLARE delle informazioni

    Ce ne sono molti altri, ma questi sono i più usati negli API moderni.

    ### Headers

    Gli headers specificano delle informazioni extra sulla richiesta.

    Alcuni esempi:

    > Content-Type ⇒ Il formato dei dati che sto mandando. Per esempio, “application/json” significa che i dati sono in formato JSON

    > Authorization ⇒ La chiave di autorizzazione

    > Accept ⇒ Il formato che mi aspetto dalla risposta

    > Cookie ⇒ Informazioni aggiuntive sui cookie

    Ce ne sono molti di più, e possono anche essere personalizzati.

    ### Payload

    – Nel Payload inserirai i dati da inviare al server
    – Strettamente correlato all’header “Content-Type”
    – Lo invierai solo quando facciamo richieste POST e PUT
    – E’ anche conosciuto come “body” o “corpo” della richiesta.

    ## HTTP RESPONSE

    Viene mandato dal server come risposta ad una richiesta.

    > **Payload** ⇒ Contiene le informazioni richieste

    > **Codici di stato** ⇒ Comunica il risultato dell’operazione

    > **Headers** ⇒ Informazioni extra

    ### Codici di stato

    Un numero di tre cifre che indica se una richiesta è stata completata con successo o meno.

    Questi sono i più usati:

    > 200 OK ⇒ Le informazioni sono state inviate correttamente

    > 201 Created ⇒ L’operazione di creazione è stata effettuata

    > 400 Bad request ⇒ Qualcosa non va con la tua richiesta

    > 401 Unauthorized ⇒ Non sei autorizzato ad effettuare questa operazione

    > 404 Not found ⇒ L’informazione richiesta non è disponibile

    > 500 Internal server error ⇒ QUalcosa è andato storto sul server

    ### JSON

    JavaScript Object Notation è una struttura dati spesso usata per scambiare dati in richieste HTTP. Il payload della richiesta e la 
    risposta del server avranno un formato simile a quello degli oggetti in JS.

    */
