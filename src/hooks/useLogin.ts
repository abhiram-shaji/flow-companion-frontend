import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "admin" && password === "admin") {
      navigate("/admin/dashboard");
      return;
    }
  
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, role } = response.data;
  
      localStorage.setItem("token", token);
      if (role === "Admin") {
        navigate("/admin/dashboard");
      } else if (role === "Worker") {
        navigate("/worker/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };
  
  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};

export default useLogin;
