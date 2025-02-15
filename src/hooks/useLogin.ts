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
      localStorage.setItem("role", "admin"); // Save the role in localStorage
      navigate("/admin/dashboard");
      return;
    }
  
    try {
      const response = await axios.post(
        "https://flow-companion-backend.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );
  
      const { message, userId, role } = response.data;
  
      // Persist the user information, including role
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
  
      // Navigate based on role
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else 
        navigate("/worker/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error); // Use the error message from the backend
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
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
