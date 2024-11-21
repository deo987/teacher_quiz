import React, { useState } from "react";
import axios from "axios";

const AddQuestion = () => {
    const [formData, setFormData] = useState({
        category: "",
        question: "",
        options: ["", "", "", ""],
        answer: "",
    });

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
            await axios.post("http://localhost:5000/api/questions/add", formData);
            alert("Question added successfully!");
            setFormData({
                category: "",
                question: "",
                options: ["", "", "", ""],
                answer: "",
            });
        } catch (err) {
            console.error("Error adding question", err);
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f9f9f9"
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: "#ffffff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                }}
            >
                <h2 style={{
                    textAlign: "center",
                    color: "#333",
                    fontFamily: "Arial, sans-serif"
                }}>Add Question</h2>
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
                        backgroundColor: "#4caf50",
                        color: "#ffffff",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "background-color 0.3s"
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#4caf50")}
                >
                    Add Question
                </button>
            </form>
        </div>
    );
};

export default AddQuestion;
