import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productContext } from "./ContextApi";


function Login() {

  let {backUrl} = useContext(productContext)

    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")

    let navigate = useNavigate()

    let handleSubmit = async (e)=>{
      e.preventDefault()
        let userDetails = {email,password}      
        let res = await axios.post(`${backUrl}/login`,userDetails,
            {withCredentials:true}
        )
        alert(res.data.message) 
        localStorage.setItem("token",res.data.token)
        let userInfo = JSON.stringify(res.data.user)
        localStorage.setItem("user",userInfo) 
        navigate("/")
    }
  return (
    <div className="bg-dark vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        
        {/* IMDb Logo */}
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: "bold", backgroundColor: "#f5c518", display: "inline-block", padding: "5px 15px" }}>
            IMDb
          </h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              autoComplete="true"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#f5c518", fontWeight: "bold" }}
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            New to IMDb? <a href="/register" className="text-decoration-none">Create your account</a>
          </small>
        </div>

      </div>
    </div>
  );
}

export default Login;