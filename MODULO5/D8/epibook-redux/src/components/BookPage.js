import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Header from './Header';
import CommentArea from './CommentArea';
import LoadingIndicator from './LoadingIndicator';
import useFetch from '../hooks/useFetch';
import AddComment from './AddComment';
import { changeTheme } from '../states/ThemeState'
import { useSelector, useDispatch } from 'react-redux'
import Footer from './Footer';


const BookPage = () => {
  const {asin} = useParams();
  const { data, loading, error } = useFetch({ url: `https://striveschool-api.herokuapp.com/books/${asin}`, headers: {}});
  console.log(data, loading, error);

  const dispatch = useDispatch()
    const themeState = useSelector(changeTheme);

    useEffect(() => {}, [dispatch, themeState])
    
  return (
    <div>
      <Header />

      <div className={`mx-auto max-w-2xl py-8 px-4 sm:py-16 sm:px-6 lg:max-w-full lg:px-8 ${themeState === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}>
            {loading && <LoadingIndicator />}
            {!loading && error && (
                <div className="mb-4 rounded-lg bg-danger-100 py-5 px-6 text-base text-danger-700" role="alert">{error}</div>
            )}
            {!loading && data && <div className="product grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
                <div className='image px-6'>
                    <img 
                      className='w-full rounded-lg shadow'
                      src={data.img} 
                      alt={data.title} 
                    />
                </div>
                <div className="info">
                    <ul className={`${themeState === 'dark' ? 'text-white' : ''}`}>
                        <li className='font-normal text-sm uppercase text-gray-600'>{data.category}</li>
                        <li className='font-bold text-4xl b-title'>{data.title}</li>
                        <li className='font-bold text-3xl my-4 price'>{`€ ${data.price}`}</li>
                        <li className='font-normal'>{`Asin: ${data.asin}`}</li>
                        <li className='font-normal'>Descrizione: Lorem Ispum dolor sit amet</li>
                    </ul>

                    <div className='comment-area mt-8 border-t border-gray-400 py-4 px-3'>
                      {CommentArea && <CommentArea />}
                    </div>

                    <div className='add-comment px-3'>
                      <AddComment bookID={data.asin} />
                    </div>
                </div>
            </div>}
        </div>

        <Footer />
    </div>
  )
}

export default BookPage