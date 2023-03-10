import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import LoadingIndicator from '../components/LoadingIndicator'
import Comment from './Comment';
import { changeTheme } from '../states/ThemeState'
import useFetch from '../hooks/useFetch';

const CommentList = () => {
    const dispatch = useDispatch()
    const themeState = useSelector(changeTheme);
    const {asin} = useParams();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RhYjg0ODJiMDAxNTAwMTU5YThiNjgiLCJpYXQiOjE2NzgzMTI1NjAsImV4cCI6MTY3OTUyMjE2MH0.CX0fpBVX_WZjYsCMH15nH1F1fiLsvON-gvzbDZi7K_w';

    const { data, loading, error } = useFetch({ url: `https://striveschool-api.herokuapp.com/api/comments/${asin}`, headers: { Authorization: `Bearer ${token}` }});

    useEffect(() => {
    }, [dispatch, themeState])

  return (
    <div>
        {!loading && error && <div className="mb-4 rounded-lg bg-red-600 py-5 px-6 text-base text-white" role="alert">{error}</div>}
        {loading && <LoadingIndicator />}
        {!loading && data && data.map((elem) => {
            return ( <Comment key={elem._id} singleComment={elem} /> );  
        })}
    </div>
  )
}

export default CommentList