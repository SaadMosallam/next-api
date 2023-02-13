import { comments } from "data/comments";

export default function handler(req, res) {
    const { commentId } = req.query;

    if(req.method === 'GET') {
        const comment = comments.find((comment) => comment.id === parseInt(commentId));
        res.status(200).json(comment)
    } else if (req.method === 'DELETE') {
        const comment = comments.find((comment) => comment.id === parseInt(commentId));
        const commentIndex = comments.findIndex((comment) => comment.id === parseInt(commentId));
        comments.splice(commentIndex, 1);
        res.status(200).json(comment)
    }
   
}