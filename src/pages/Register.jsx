import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../css/Register.css"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    try {
      const response = await api.post("/auth/register", { email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.log("Error response:", err.response); 
      if(err.response && err.response.data.message === "User already exist"){
        setError("This email is already registered.");
      }else {
        setError("Registration failed. Please try again.");
      }
      
    }
  };

  return (
    <div className="form-container">
    <form  className="form-box"  onSubmit={handleRegister}>
      <h2>Register</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    
    {error && <p style={{ color: "red" }}>{error}</p>}
    <p style = {{marginTop: "20px"}}>
      Already a user? <Link to = "/login">Login</Link>
    </p>
    </form>
    </div>
  );
}
