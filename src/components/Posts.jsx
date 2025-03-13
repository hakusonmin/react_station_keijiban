import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Posts() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState("");
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
      try {
          const response = await fetch(
              `https://railway.bulletinboard.techtrain.dev/threads/${id}/posts`
          );

          if (!response.ok) {
              throw new Error("投稿の取得に失敗しました");
          }
          const data = await response.json();
          console.log("API Response:", data);

          if (Array.isArray(data.posts)) {
              setPosts(data.posts);
          } else {
              setPosts([]);
          }
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
      fetchPosts();
  }, [id]); 

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      try {
          const response = await fetch(
              `https://railway.bulletinboard.techtrain.dev/threads/${id}/posts`,
              {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ post: postContent }),
              }
          );

          if (!response.ok) {
              throw new Error("投稿の作成に失敗しました");
          }

          setPostContent(""); 
          fetchPosts(); 
      } catch (err) {
          setError(err.message);
          console.error("Error:", err);
      }
  };

    return (
        <div className="wrapper">
            <div className="wrapper-item">
                <h2>書き込み一覧</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <p>{post.post}</p>
                        </li>
                    ))}
                </ul>
                <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <div className="wrapper-item-form">
                    <label>
                        <div className="label">新規投稿内容</div>
                        <textarea
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                </div>
                <button type="submit" className="button">
                    <a className="button-text">投稿する</a>
                </button>
                <button className="button">
                    <Link to="/" className="button-text">
                        戻る
                    </Link>
                </button>
            </form>
        </div>
            </div>
        </div>
    );
}

export default Posts;
