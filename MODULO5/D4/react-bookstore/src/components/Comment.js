import React from 'react';
import Rate from './Rate';

const Comment = ({singleComment}) => {

  const commentID = singleComment._id;

  return (
    <div>
      <div className='comment'>
        <div className='flex items-center author'>
          <span className="h-8 w-8 overflow-hidden rounded-full bg-white">
            <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </span>
          <h2 className='mx-3 font-semibold'>{singleComment.author}</h2>
        </div>

        <div>
          <Rate value={singleComment.rate} />
        </div>

        <div>
          <p className='font-normal pb-4 mb-3 border-b border-gray-300'>{singleComment.comment}</p>
        </div>
      </div>

      <div className='comment-btn'>
        <button>Elimina</button>
      </div>
    </div>
  )
}

export default Comment