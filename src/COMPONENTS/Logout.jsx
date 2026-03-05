import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await axios.post(
          "https://imdb-backend-e4xg.onrender.com/api/userlogout",
          {},
          { withCredentials: true }
        );

        // Clear local storage AFTER backend clears cookie
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert(res.data.message);

        navigate("/login");

      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    logoutUser();

  }, [navigate]);

  return null;
}

export default Logout;