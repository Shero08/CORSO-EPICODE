import React from 'react'
import AddComment from './AddComment'

const CommentArea = () => {
  return (
    <aside className='comments w-1/4 h-screen fixed right-0 px-8 py-8 bg-gray-600 text-left'>
      <h2 className='uppercase font-semibold mb-4 text-2xl text-white'>Area Commenti</h2>
      <AddComment />
    </aside>
  )
}

export default CommentArea