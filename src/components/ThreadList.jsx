import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../List.css";

function ThreadList() {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        const fetchThreads = async () => {
            const response = await fetch(
                "https://railway.bulletinboard.techtrain.dev/threads"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setThreads(data);
        };
        //ここで実行
        fetchThreads();
    }, []);

    return (
        <div className="wrapper">
            <div className="wrapper-item">
                <h2>スレッド一覧</h2>
                <ul>
                    {threads.map((thread) => (
                        //↓mapするときは keyをつけないとエラーが出ます
                        <li key={thread.id}>
                            <Link to={`/threads/${thread.id}`}>
                                <div>{thread.title}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <button className="button">
                    <Link to="/threads/new" className="button-text">新規スレッド作成</Link>
                </button>
            </div>
        </div>
    );
}

export default ThreadList;
