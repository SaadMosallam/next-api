import { comments } from "data/comments";

export default function handler(req, res) {
    if(req.method === 'GET') { res.status(200).json(comments);
    } else if(req.method === 'POST') {
        const comment = req.body.comment;
        const newComment = {
            id: comments[comments.length - 1].id + 1,
            text: comment
        };
        comments.push(newComment);
        res.status(201).json(newComment)
    }
}