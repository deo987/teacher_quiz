import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/questions");
                setQuestions(response.data);
            } catch (err) {
                console.error("Error fetching questions", err);
            }
        };
        fetchQuestions();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/questions/delete/${id}`);
            setQuestions(questions.filter((question) => question._id !== id));
        } catch (err) {
            console.error("Error deleting question", err);
        }
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            <h2 style={{
                textAlign: "center",
                color: "#343a40",
                fontFamily: "'Roboto', sans-serif",
                fontSize: "28px"
            }}>Question List</h2>
            <ul style={{
                listStyleType: "none",
                padding: "0",
                margin: "20px auto",
                maxWidth: "800px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
            }}>
                {questions.map((question) => (
                    <li
                        key={question._id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "15px",
                            borderBottom: "1px solid #e0e0e0",
                            fontFamily: "'Roboto', sans-serif",
                            color: "#495057",
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <strong>{question.category}</strong>: {question.question}
                        </div>
                        <div>
                            <Link
                                to={`/edit/${question._id}`}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    borderRadius: "5px",
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                    marginRight: "10px",
                                    transition: "background-color 0.3s",
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
                                onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(question._id)}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#dc3545",
                                    color: "#fff",
                                    borderRadius: "5px",
                                    border: "none",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s",
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = "#c82333"}
                                onMouseLeave={(e) => e.target.style.backgroundColor = "#dc3545"}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionList;
