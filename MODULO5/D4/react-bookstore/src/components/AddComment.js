import React, {useState, useEffect} from 'react';

const AddComment = ({bookID}) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RhYjg0ODJiMDAxNTAwMTU5YThiNjgiLCJpYXQiOjE2NzY5MjM3MTksImV4cCI6MTY3ODEzMzMxOX0.UzS4ZMrCmXPLaB5y32U3N2Z7DU397iNrXS1CKR74WL0';
    const elementId = bookID
    const [formData, setFormData] = useState({elementId})
    console.log(formData);

    const postRequest = async () => {
        try{
            const data = await fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, 
                body: JSON.stringify(formData),
            });
            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    }

    const addComment = (e) => {
        e.preventDefault();

        postRequest();

        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

  return (
    <div className='py-4 px-3 bg-white rounded-xl shadow-md'>
        <form onSubmit={addComment}>
            <h1 className='mb-2'>Aggiungi Commento:</h1>

            <div className='info-comment mb-1'>
                <input 
                    type="email" 
                    name="author" 
                    placeholder='youremail@example.it'
                    onChange={(e) => setFormData({
                        ...formData,
                        author: e.target.value
                    })}
                    className='mt-1 py-2 px-3 w-2/4 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                />

                <select 
                    name="rate"
                    onChange={(e) => setFormData({
                        ...formData,
                        rate: Number(e.target.value)
                    })}
                    className="mt-1 ml-2 box-content w-1/4 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                    <option defaultValue="">Dai un voto</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>

            <div className='comment'>
                <textarea 
                    name="comment" 
                    rows="3" 
                    onChange={(e) => setFormData({
                        ...formData,
                        comment: e.target.value
                    })}
                    className="mt-1 w-full rounded-md border px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    placeholder="Scrivi il tuo commento...">
                </textarea>
            </div>

            <button 
                className='inline-flex mt-2 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                type='submit'
            >
                Aggiungi
            </button>
        </form>
    </div>
  )
}

export default AddComment