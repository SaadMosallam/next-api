import { comments } from "data/comments";
import { useState } from "react";

export default function CommentsPage({ commentsList }) {
    const [comments, setComments] = useState(commentsList);
    const [comment, setComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editInputFieldValue, setEditInputFieldValue] = useState('')
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

    const submitCommentEdit = async (commentId) => {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: commentId, text: editInputFieldValue })
        });
        const data = await response.json();
        setEditInputFieldValue('')
        setIsEditing(false);
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
                        {
                            isEditing === comment.id ? (
                                <>
                                    <button onClick={() => submitCommentEdit(comment.id)}>Submit Edit</button>
                                    <br />
                                    <input type='text' onChange={(e) => setEditInputFieldValue(e.target.value)} value={editInputFieldValue} />
                                </>
                            ) : (
                                <button onClick={() => setIsEditing(comment.id)}>EditComment</button>
                            )
                        }
                        <hr />
                    </div>
                ))
            }
        </>
        
    )
}

export async function getServerSideProps() {

    // Don't Do this
    // It's not recommended to call your own api routes in getStaticProps, only call external apis here
    // Calling your api route add an additional round trip which is not necessary
    // const response = await fetch(`http://localhost:3000/api/comments}`);
    // const responseData = await response.json();
    return {
        props: {
            commentsList: comments
        }
    }
}