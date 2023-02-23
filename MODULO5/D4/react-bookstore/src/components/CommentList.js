import React from 'react';
import Comment from './Comment';

const CommentList = ({comments}) => {
  return (
    <div>
        <h1 className='font-bold text-2xl uppercase mb-4'>Recensioni:</h1>
        {comments && comments.map((comment, i) => {
            return <Comment key={i} singleComment={comment} />;
        })}
    </div>
  )
}

export default CommentList