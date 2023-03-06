import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    productsState,
    productsStateError,
    productsStateLoading,
} from '../states/SearchState'
import { getProducts } from '../states/SearchState'
import SingleBook from './SingleBook'
import { filteredProductsState } from '../states/SearchState'
import Footer from '../components/Footer'
import LoadingIndicator from './LoadingIndicator'

const BookList = () => {
    const dispatch = useDispatch()
    const isProductsLoading = useSelector(productsStateLoading)
    const products = useSelector(productsState)
    const productsError = useSelector(productsStateError)
    const filteredProducts = useSelector(filteredProductsState)
    console.log(filteredProducts)
    const themeState =
        useSelector((state) => state.themeStore.state) ||
        localStorage.getItem('theme')

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch, themeState])

    console.log(themeState)

    return (
        <main
            className={`books w-3/4 pt-8 ${
                themeState === '"dark"' ? 'bg-gray-600' : 'bg-gray-300'
            }`}
        >
            <h2
                className={`text-left uppercase font-semibold mb-4 text-2xl px-8 ${
                    themeState === '"dark"' ? 'text-white' : 'text-black'
                }`}
            >
                Prodotti
            </h2>
            {!isProductsLoading && productsError && (
                <div class="mb-4 rounded-lg bg-danger-100 py-5 px-6 text-base text-danger-700" role="alert">{productsError}</div>
            )}
            <div className="grid grid-cols-1 gap-y-6 gap-x-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6 pb-8 px-8">
                {isProductsLoading && <LoadingIndicator />}
                {!isProductsLoading &&
                filteredProducts &&
                filteredProducts.length > 0
                    ? filteredProducts.map((book) => {
                          return (
                              <SingleBook
                                  key={book.asin}
                                  asin={book.asin}
                                  title={book.title}
                                  image={book.img}
                                  category={book.category}
                                  price={book.price}
                              />
                          )
                      })
                    : products &&
                      products.map((book) => {
                          return (
                              <SingleBook
                                  key={book.asin}
                                  title={book.title}
                                  asin={book.asin}
                                  image={book.img}
                                  category={book.category}
                                  price={book.price}
                              />
                          )
                      })}
            </div>
            <Footer />
        </main>
    )
}

export default BookList
