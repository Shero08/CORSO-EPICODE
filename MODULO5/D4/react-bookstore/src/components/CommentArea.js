import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import CommentList from './CommentList';

const CommentArea = () => {
    const [comments, setComments] = useState(null)
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RhYjg0ODJiMDAxNTAwMTU5YThiNjgiLCJpYXQiOjE2NzY5MjM3MTksImV4cCI6MTY3ODEzMzMxOX0.UzS4ZMrCmXPLaB5y32U3N2Z7DU397iNrXS1CKR74WL0';
    const {asin} = useParams();

    const getComments = async () => {
        try{
            const data = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const response = await data.json();
            console.log(response);
            setComments(response);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getComments();
    }, []);

  return (
    <div>
        <CommentList comments={comments} />
    </div>
  )
}

export default CommentArea