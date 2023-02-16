import React, {useState, useEffect} from 'react'
import SingleBook from './SingleBook';
import ClipLoader from "react-spinners/ClipLoader";

const BookList = () => {
  const [books, setBooks] = useState([]);
  console.log(books);

  const [searchedBook, setSearchedBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    setLoading(true);
    try{
      const data = await fetch('https://striveschool-api.herokuapp.com/books');
      const response = await data.json();
      setBooks(response);
      setLoading(false);
    }
    catch(error){
      console.log(error);
      setLoading(false)
      setError(error)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const [searchText, setSearchText] = useState('');

  const filterClick = (e) => {
    e.preventDefault();

    const booksFiltered = books.filter((elem) => {
      const filtered = elem.title.toLowerCase().includes(searchText.toLowerCase());
      return filtered
    })

    setSearchedBook(booksFiltered)
  }

  return (
    <>
    <div className='container py-5'>
        <form className='d-flex' onSubmit={filterClick}>
            <input 
            className='form-control me-2'
            type='search' 
            placeholder='Cerca libro...' 
            onChange={(e) => {
                setSearchText(e.target.value)
            }}
            />
            <button
                type='submit'
                className='btn btn-outline-warning'
            >Cerca</button>
        </form>
    </div>
    
    <div className='container d-flex'>
      {!loading && error && <h1>Ops, qualcosa è andato storto!</h1>}
      {loading && <ClipLoader color="#36d7b7" />}
      {!loading && !error && <div className='row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4'>
        {searchedBook && searchedBook.length > 0 
        ? (
          searchedBook.map((book, i) => {
            return <SingleBook key={i} title={book.title} img={book.img} />
          })
        ) 
        : (  
          books && books.map((book, i) => {
            return <SingleBook key={i} title={book.title} img={book.img} />
          })
        )}
      </div>}
    </div>
    </>
  )
}

export default BookList