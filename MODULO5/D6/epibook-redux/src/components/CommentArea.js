import React, {useEffect} from 'react'
import AddComment from './AddComment'
import CommentList from './CommentList'
import { changeTheme } from '../states/ThemeState'
import { useSelector, useDispatch } from 'react-redux'

const CommentArea = () => {
    const dispatch = useDispatch()
    const themeState = useSelector(changeTheme);

    useEffect(() => {}, [dispatch, themeState])

    return (
        <aside className={`comments w-1/4 fixed right-0 top-74 h-screen px-8 py-8 text-left overflow-y-auto ${themeState === 'dark' ? 'bg-gray-800' : 'bg-gray-600'}`} style={{ height: "calc(100% - 74px)" }}>
            <h2 className="uppercase font-semibold mb-4 text-2xl text-white">
                Area Commenti
            </h2>
            <CommentList />
            <AddComment />
        </aside>
    )
}

export default CommentArea
