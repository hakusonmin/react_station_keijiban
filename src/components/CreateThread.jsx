import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Form.css";

function CreateThread() {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // ↓formの挙動を防ぐ
        e.preventDefault();
        setError(null);

        if (!title.trim()) {
            setError("タイトルを入力してください");
            return;
        }

        try {
            const response = await fetch(
                "https://railway.bulletinboard.techtrain.dev/threads",
                {
                    method: "POST",
                    //↓これがないと Data送信が正常に動かない場合がある
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title }),
                }
            );

            if (!response.ok) {
                throw new Error("スレッドの作成に失敗しました");
            }

            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="wrapper">
            <h2>新規スレッド作成画面</h2>
            <form onSubmit={handleSubmit}>
                <div className="wrapper-item-form">
                    <label>
                        <div className="label">新規スレッド作成名</div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
    );
}

export default CreateThread;
