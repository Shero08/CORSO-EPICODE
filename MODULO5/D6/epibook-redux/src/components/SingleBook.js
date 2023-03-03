import React from 'react';

const SingleBook = (props) => {
  return (
    <div key={props.asin} className="group bg-white rounded-lg py-2 px-2 shadow cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-gray-600 hover:shadow-md">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <div
          className='w-full card-img min-h-[250px] bg-cover bg-top'
          style={{backgroundImage: `url(${props.image})`}}
        ></div>
      </div>
      <h3 className="mt-2 text-sm text-gray-700 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{props.title}</h3>
      <p className="mt-1 text-lg font-semibold text-gray-900">{props.price}</p>
    </div>
  )
}

export default SingleBook