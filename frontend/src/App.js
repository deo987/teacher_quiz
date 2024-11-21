import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddQuestion from "./components/AddQuestion";
import EditQuestion from "./components/EditQuestion";
import QuestionList from "./components/QuestionList";

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Question List</Link></li>
                        <li><Link to="/add">Add Question</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<QuestionList />} />
                    <Route path="/add" element={<AddQuestion />} />
                    <Route path="/edit/:id" element={<EditQuestion />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
