import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user-related data from localStorage or sessionStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("token"); // If you're using a token

    // Redirect to the login page
    navigate("/login");
  };

  return {
    handleLogout,
  };
};

export default useLogout;
