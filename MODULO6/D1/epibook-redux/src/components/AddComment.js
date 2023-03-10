import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectedStateComments } from '../states/SelectState';
import { selectedState } from '../states/SelectState'

const AddComment = () => {
    const dispatch = useDispatch()
    const selectCardState = useSelector(selectedState)
    const comments = useSelector(selectedStateComments)
    const elementId = selectCardState
    const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RhYjg0ODJiMDAxNTAwMTU5YThiNjgiLCJpYXQiOjE2NzgxOTI3MjksImV4cCI6MTY3OTQwMjMyOX0.rIU7-vqg3e79nmNSU9MaGUNsKpIwf24YqI0mclBscko'

    const [formData, setFormData] = useState({})
    console.log(elementId)
    console.log(formData)

    useEffect(() => {}, [dispatch, selectCardState, comments])

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

            if(data.ok){
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const addComment = (e) => {
        console.log('func.addComment -> start')
        e.preventDefault()

        selectCardState === '' ? console.log('Errore! seleziona un libro per aggiungere un commento!') : postRequest()

    }

    return (
        <div className="bg-white rounded-xl shadow shadow-gray-700 px-2 py-2">
            <form onSubmit={addComment}>
                <h1 className="mb-2">Aggiungi Commento:</h1>

                <div className="info-comment mb-1">
                    <input
                        type="email"
                        name="author"
                        placeholder="youremail@example.it"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                author: e.target.value,
                            })
                        }
                        className="mt-1 py-2 px-3 w-2/4 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />

                    <select
                        name="rate"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                rate: Number(e.target.value),
                            })
                        }
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

                <div className="comment">
                    <textarea
                        name="comment"
                        rows="3"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                elementId,
                                comment: e.target.value,
                            })
                        }
                        className="mt-1 w-full rounded-md border px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Scrivi il tuo commento..."
                    ></textarea>
                </div>

                <button
                    className="inline-flex mt-2 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    type="submit"
                >
                    Aggiungi
                </button>
            </form>
        </div>
    )
}

export default AddComment
