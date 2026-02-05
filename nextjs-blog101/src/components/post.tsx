type PostProps = {
    post: {
        title: string;
        body: string;
    };
};

function Post({ post }: PostProps) {
    return (
        <>
        <p>{post.title} </p>
        <p>{post.body} </p>
        </>
    )
}
export default Post;