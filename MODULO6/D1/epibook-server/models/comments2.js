const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
  content: String,
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
});

//modello dei libri (esempio non completo)
const bookSchema = new mongoose.Schema({
  title: String,
  author: String
});

const Comment = mongoose.model('Comment', commentSchema, 'commentCollection');
const Book = mongoose.model('Book', bookSchema, 'bookCollection');

// qui vi mostro (frammentato) come di solito salviamo i libri
const book = new Book({
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald'
});

book.save()

// stessa cosa per i commenti

// quando salviamo il commento, lo "leghiamo" tramite la proprietà book (la reference)
  const comment = new Comment({
    content: 'This is a great book!',
    book: savedBook._id
  });

  comment.save()
  });
});