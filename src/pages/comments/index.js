import { useState } from "react";

export default function CommentsPage() {
    const [comments, setComments] = useState([]);
    const fetchComments = async () => {
        const response = await fetch('/api/comments');
        const responseData = await response.json();

        setComments(responseData);
    }
    return (
        <>
            <button onClick={fetchComments}>Load comments</button>
            {
                comments?.map(comment => (
                    <div key={comment.id}>
                        <h1>{comment.id} {comment.text}</h1>
                        <hr />
                    </div>
                ))
            }
        </>
        
    )
}