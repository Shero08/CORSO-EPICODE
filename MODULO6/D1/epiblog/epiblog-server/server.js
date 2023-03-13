const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3030;
const authorsRoute = require('./routes/authors');
const cors = require('cors');

app.use(express.json())
app.use(cors());
app.use('/', authorsRoute);

mongoose.connect('mongodb+srv://carlocap08:rqYWcZKne17SsYkl@cluster0.qjgudq2.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore di connessione'));
db.once('open', () => {
    console.log('Database connesso'); 
});

app.listen(port, () => {
    console.log(`Server avviato sulla porta ${port}`);
})