import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelected } from '../states/SelectState';
import { selectedState } from '../states/SelectState';

const SingleBook = (props) => {
  const dispatch = useDispatch()
  const selectCardState = useSelector(selectedState);

  const handleSelectItem = () => {
    if (selectCardState === props.asin) {
      dispatch(setSelected(''));
    } else {
      dispatch(setSelected(props.asin));
    }  
  }

  useEffect(() => {

  }, [dispatch, selectCardState])

  console.log(selectCardState);

  return (
    
    <div 
      key={props.asin} 
      className={`bg-white rounded-lg py-2 px-2 shadow cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-gray-600 hover:shadow-md ${selectCardState === props.asin ? 'selected border-solid border-4 border-red-600' : ''}`}
      onClick={handleSelectItem}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <div
          className='w-full card-img min-h-[250px] bg-cover bg-top'
          style={{backgroundImage: `url(${props.image})`}}
        ></div>
      </div>
      <h3 className="mt-2 text-sm text-gray-700 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{props.title}</h3>
      <p className="mt-1 text-lg font-semibold text-gray-900">€ {props.price}</p>
    </div>
  )
}

export default SingleBook