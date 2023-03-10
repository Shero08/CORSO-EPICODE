import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setInputState } from '../states/SearchState'
import { setInput, filterBooks } from '../states/SearchState'
import { setTheme } from '../states/ThemeState'
import { changeTheme } from '../states/ThemeState';

const Header = () => {
    const searchInput = useSelector(setInputState);
    const dispatch = useDispatch()
    const [actualTheme, setActualTheme] = useState(JSON.parse(localStorage.getItem('theme')))
    const themeState = useSelector(changeTheme);
    console.log(themeState)

    const updateThemeState = () => {
        setActualTheme(actualTheme === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        dispatch(filterBooks())
        dispatch(setTheme(actualTheme))
    }, [dispatch, searchInput, actualTheme])

    const handleChangeInput = (e) => {
        e.preventDefault()
        dispatch(setInput(e.target.search.value))
    }

    return (
        <header className={`sticky top-0 z-50 ${themeState === 'dark' ? 'bg-black text-white' : 'bg-gray-200 text-black shadow'}`}>
            <div className="mx-auto max-w-2xl py-2 px-4 sm:py-4 sm:px-6 lg:max-w-full lg:px-8">
                <nav className="flex justify-between">
                    <Link to={'/home'} className="brand flex items-center">
                        <img
                            className="h-8 w-8"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company"
                        />
                        <span className="b-title ml-2 font-bold">EPIBOOK</span>
                    </Link>
                    <div className="w-2/4">
                        <form
                            className="flex mx-auto justify-center"
                            onSubmit={handleChangeInput}
                        >
                            <input
                                className="mt-1 py-2 px-3 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                type="text"
                                name="search"
                                placeholder="Cerca libro..."
                            />
                            <button
                                type="submit"
                                className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Cerca
                            </button>

                            <button
                                className={`mx-3 rounded px-2 ${themeState === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-white text-gray-600 hover:bg-gray-300'}`}
                                id="flexSwitchCheckDefault"
                                onClick={() => updateThemeState()}
                            >
                                {actualTheme === 'dark' ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                                        />
                                    </svg>
                                )}
                            </button>

                            <Link
                                className={`rounded px-2 flex items-center ${themeState === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-white text-gray-600 hover:bg-gray-300'}`}
                                to={'/'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </Link>
                        </form>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
