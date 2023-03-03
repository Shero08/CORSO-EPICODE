import React, {useEffect} from 'react';

const DeleteComment = ({commentID}) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RhYjg0ODJiMDAxNTAwMTU5YThiNjgiLCJpYXQiOjE2NzY5MjM3MTksImV4cCI6MTY3ODEzMzMxOX0.UzS4ZMrCmXPLaB5y32U3N2Z7DU397iNrXS1CKR74WL0';
    console.log(`id commento: ${commentID}`);
    
    const deleteRequest = async () => {
        try{
            const data = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentID}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }); 
            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    }

    const delComment = () => {
        deleteRequest();

        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

  return (
    <button
        onClick={() => delComment()}
    >
    Elimina
    </button>
  )
}

export default DeleteComment