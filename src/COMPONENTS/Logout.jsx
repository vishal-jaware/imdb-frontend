import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { productContext } from "./ContextApi";

function Logout() {

  let {backUrl} = useContext(productContext)

  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await axios.post(
          `${backUrl}/userlogout`,
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