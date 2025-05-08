import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const res = await api.post("/auth/login", {email, password });
            login(res.data.token);
            navigate("/todos");
        } catch (err) {
            setError("Invalid email or password.");
        }

    };

    return (
        <div className="form-container">
        <form className = "form-box" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>}
            <p>New user? <Link to="/register">Register</Link></p>
        </form>
        </div>
    )
}