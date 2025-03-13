import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ThreadList from "./components/ThreadList";
import CreateThread from "./components/CreateThread";
import Posts from "./components/Posts";
import Header from "./components/Header";



function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<ThreadList />} />
                    <Route path="/threads/new" element={<CreateThread />} />
                    <Route path="/threads/:id" element={<Posts />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
