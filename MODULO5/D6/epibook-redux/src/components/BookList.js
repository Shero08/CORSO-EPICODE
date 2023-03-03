import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { productsState, productsStateError, productsStateLoading } from '../states/SearchState';
import { getProducts } from '../states/SearchState';
import SingleBook from './SingleBook';

const BookList = () => {
  const dispatch = useDispatch()
  const isProductsLoading = useSelector(productsStateLoading)
  const products = useSelector(productsState)
  const productsError = useSelector(productsStateError)
  const themeState = useSelector(state => state.themeStore.state) || localStorage.getItem('theme');

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch, themeState])

  console.log(themeState);

  return (
    <main className={`books w-3/4 py-8 px-8 ${themeState === '"dark"' ? 'bg-gray-600' : 'bg-gray-300'}`}>
      <h2 className={`text-left uppercase font-semibold mb-4 text-2xl ${themeState === '"dark"' ? 'text-white' : 'text-black'}`}>Prodotti</h2>
      {!isProductsLoading && productsError && <h1>Ops, qualcosa è andato storto!</h1>}
      <div className="grid grid-cols-1 gap-y-6 gap-x-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
          {isProductsLoading && <h1>Caricamento in corso...</h1>}
          {!isProductsLoading && products && products.map((book) => {
              return(
                  <SingleBook
                      key={book.asin} 
                      title={book.title}
                      image={book.img}
                      category={book.category}
                      price={book.price}
                  />
              )
          })}
      </div>
    </main>
  )
}

export default BookList