import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({email, password})
  };
  return <>
  
  <div className="container mt-5" style={{maxWidth:"400px"}}>
    <h3 className="text-center mb-3">Login</h3>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  </div>
  </>;
}

export default Login;
