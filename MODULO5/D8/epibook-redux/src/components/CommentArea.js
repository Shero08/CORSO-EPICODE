import React, {useEffect} from 'react'
import CommentList from './CommentList'
import { changeTheme } from '../states/ThemeState'
import { useSelector, useDispatch } from 'react-redux'

const CommentArea = () => {
    const dispatch = useDispatch()
    const themeState = useSelector(changeTheme);

    useEffect(() => {}, [dispatch, themeState])

    return (
        <div className='comments w-full py-2 text-left'>
            <h2 className={`uppercase font-semibold mb-4 text-2xl ${themeState === 'dark' ? 'text-white' : 'text-black'}`}>
                Area Commenti:
            </h2>
            <CommentList />
        </div>
    )
}

export default CommentArea  
