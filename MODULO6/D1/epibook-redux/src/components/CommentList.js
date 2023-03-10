import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectedStateLoading, selectedStateComments, selectedStateError, selectedState } from '../states/SelectState';
import { getBookComment } from '../states/SelectState';
import LoadingIndicator from '../components/LoadingIndicator'
import Comment from './Comment';

const CommentList = () => {
    const commentsLoading = useSelector(selectedStateLoading)
    const comments = useSelector(selectedStateComments)
    const commentsError = useSelector(selectedStateError)
    const selectedBookState = useSelector(selectedState)
    const dispatch = useDispatch()

    useEffect(() => {
        if(selectedBookState !== ''){
            dispatch(getBookComment(selectedBookState))
        }
    }, [dispatch, selectedBookState])

    console.log(comments);

  return (
    <div>
        {!commentsLoading && commentsError && <div className="mb-4 rounded-lg bg-red-600 py-5 px-6 text-base text-white" role="alert">{commentsError}</div>}
        {commentsLoading && <LoadingIndicator />}
        {!commentsLoading && comments && comments.map((elem) => {
            return ( <Comment key={elem._id} singleComment={elem} /> );  
        })}
    </div>
  )
}

export default CommentList