const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/users')
const bookRoute = require('./routes/books')
const commentsRoute = require('./routes/comments')
const loginRoute = require('./routes/login')
const port = 3030;
const app = express();
const cors = require('cors');
const logMiddlewares = require('./middlewares/logMiddlewares')
require('dotenv').config();


//middleware (funzioni che si frappongono fra la request e la response)
app.use(express.json())
app.use(cors())
app.use(logMiddlewares)
app.use('/', userRoute)
app.use('/', bookRoute)
app.use('/', commentsRoute)
app.use('/', loginRoute)

//connessione al database:
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Errore di connessione'))
db.once('open', () => {
    console.log('Database connesso')
})

app.listen(port, () => console.log(`server avviato sulla porta: ${port}`))