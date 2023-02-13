import { comments } from "data/comments";
import { useRouter } from "next/router";
export default function DisplayComment({ comment }) {
    const router = useRouter();
    if (router.isFallback) return <h2>Loading...</h2>
    return <h1>{comment.id} {comment.text}</h1>
}

export async function getStaticPaths() {
    return {
        // Passed to the page component as props
        paths: [ { params: { commentId: '1' } }],
        fallback: true
      }
}

export async function getStaticProps(context) {
    const { commentId } = context.params;
    const selectedComment = comments.find(comment => comment.id === parseInt(commentId))

    // Don't Do this
    // It's not recommended to call your own api routes in getStaticProps, only call external apis here
    // Calling your api route add an additional round trip which is not necessary
    // const response = await fetch(`http://localhost:3000/api/comments/${commentId}`);
    // const responseData = await response.json();

    return {
        props: {
            comment: selectedComment
        }
    }
}