import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../states/ThemeState';

const Footer = () => {
    const dispatch = useDispatch()
    const themeState = useSelector(changeTheme);

    useEffect(() => {

    }, [dispatch, themeState])

    console.log(themeState);

    return (
        <footer className={themeState === 'dark' ? 'bg-black text-white' : 'bg-gray-400 text-black'}>
            <div className="mx-auto max-w-2xl py-8 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
                BookStore © Design by Carlo Capuozzo
            </div>
        </footer>
    )
}

export default Footer
