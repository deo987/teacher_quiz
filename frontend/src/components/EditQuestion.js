import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditQuestion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category: "",
        question: "",
        options: ["", "", "", ""],
        answer: "",
    });

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/questions`);
                const question = response.data.find((q) => q._id === id);
                setFormData(question);
            } catch (err) {
                console.error("Error fetching question", err);
            }
        };
        fetchQuestion();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...formData.options];
        updatedOptions[index] = value;
        setFormData({ ...formData, options: updatedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/questions/update/${id}`, formData);
            alert("Question updated successfully!");
            navigate("/");
        } catch (err) {
            console.error("Error updating question", err);
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f0f4f8"
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: "#ffffff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                }}
            >
                <h2 style={{
                    textAlign: "center",
                    color: "#333",
                    fontFamily: "'Roboto', sans-serif"
                }}>Edit Question</h2>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{
                        marginBottom: "5px",
                        fontWeight: "bold",
                        color: "#555"
                    }}>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px"
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{
                        marginBottom: "5px",
                        fontWeight: "bold",
                        color: "#555"
                    }}>Question:</label>
                    <input
                        type="text"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px"
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{
                        marginBottom: "5px",
                        fontWeight: "bold",
                        color: "#555"
                    }}>Options:</label>
                    {formData.options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                            style={{
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                fontSize: "14px",
                                marginBottom: "5px"
                            }}
                            placeholder={`Option ${index + 1}`}
                        />
                    ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{
                        marginBottom: "5px",
                        fontWeight: "bold",
                        color: "#555"
                    }}>Answer:</label>
                    <input
                        type="text"
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        required
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px"
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#007bff",
                        color: "#ffffff",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "background-color 0.3s"
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
                >
                    Update Question
                </button>
            </form>
        </div>
    );
};

export default EditQuestion;
