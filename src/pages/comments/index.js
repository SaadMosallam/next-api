import { useState } from "react";

export default function CommentsPage() {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')
    const fetchComments = async () => {
        const response = await fetch('/api/comments');
        const responseData = await response.json();

        setComments(responseData);
    }
    const submitComment = async () => {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json'}
        });
        setComment('');
        const data = await response.json();
        console.log(data)
    }

    const deleteComment = async (commentId) => {
        console.log(commentId)
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data)
        fetchComments();
    }
    return (
        <>
            <input type='text' onChange={e => setComment(e.target.value)} value={comment} />
            <button onClick={submitComment}>Submit comment</button>
            <button onClick={fetchComments}>Load comments</button>
            {
                comments?.map(comment => (
                    <div key={comment.id}>
                        <h1>{comment.id} {comment.text}</h1>
                        <button onClick={() => deleteComment(comment.id)}>Delete comment</button>
                        <hr />
                    </div>
                ))
            }
        </>
        
    )
}