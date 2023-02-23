import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Header from './Header';
import CommentArea from './CommentArea';
import Footer from './Footer';
import '../css/singleBook.css';
import AddComment from './AddComment';

const SingleBook = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {asin} = useParams();

    const getData = async () => {
        setLoading(true);
        try{
          const data = await fetch(`https://striveschool-api.herokuapp.com/books/${asin}`);
          const response = await data.json();
          console.log(response);
          setBook(response);
          setLoading(false);
        }
        catch(error){
          console.log(error);
          setError(error)
        }
    }
    
      useEffect(() => {
        getData();
    }, []);

  return (
    <div className='bg-gray-200'>
        <Header />

        <div className="mx-auto max-w-2xl py-8 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
            {loading && <ClipLoader color="#36d7b7" />}
            {!loading && book && <div className="product grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
                <div className='image px-6'>
                    <img 
                      className='w-full rounded-lg shadow'
                      src={book.img} 
                      alt={book.title} 
                    />
                </div>
                <div className='info'>
                    <ul>
                        <li className='font-normal text-sm uppercase text-gray-600'>{book.category}</li>
                        <li className='font-bold text-4xl b-title'>{book.title}</li>
                        <li className='font-bold text-3xl my-4 price'>{`€ ${book.price}`}</li>
                        <li className='font-normal'>{`Asin: ${book.asin}`}</li>
                        <li className='font-normal'>Descrizione: Lorem Ispum dolor sit amet</li>
                    </ul>

                    <div className='comment-area mt-8 border-t border-gray-400 py-4 px-3'>
                      {CommentArea && <CommentArea />}
                    </div>

                    <div className='add-comment px-3'>
                      <AddComment bookID={book.asin} />
                    </div>
                </div>
            </div>}
        </div>

        <Footer />
    </div>
  )
}

export default SingleBook