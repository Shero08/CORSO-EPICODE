import React, {useState, useEffect} from 'react';
import Card from '../components/Card';
import ClipLoader from "react-spinners/ClipLoader";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
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
    <div className="bg-white">
      <Header />

      <div className="mx-auto max-w-2xl pt-3 pb-8 px-4 sm:pb-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <form className='flex mx-auto px-4 py-6 justify-center' onSubmit={filterClick}>
            <input 
            className='mt-1 py-2 px-3 w-2/4 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            type='text' 
            placeholder='Cerca libro...' 
            onChange={(e) => {
                setSearchText(e.target.value)
            }}
            />
            <button
                type='submit'
                className='ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >Cerca</button>
        </form>

        {!loading && error && <h1>Ops, qualcosa è andato storto!</h1>}
        {loading && <ClipLoader color="#36d7b7" />}
        {!loading && !error && <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {searchedBook && searchedBook.length > 0 
          ? (
            searchedBook.map((book) => {
              return <Card 
              key={book.asin}
              asin={book.asin}
              title={book.title}
              img={book.img}
              price={book.price}
            />
            })
          ) 
          : (
          books && books.map((book) => {
            return <Card 
              key={book.asin}
              asin={book.asin}
              title={book.title}
              img={book.img}
              price={book.price}
            />
          })
          )}
        </div>}
      </div>

      <Footer />
    </div>
  )
}

export default Index