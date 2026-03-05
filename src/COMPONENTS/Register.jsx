import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"


function Register() {

    let [userData,setUserData] = useState({
        fullname:"",
        email:"",
        city:"",
        password:"",
        image:null
    })
  
    let navigate = useNavigate()

    let handleChange = (e)=>{

        let {name,value,type,files} = e.target
        
         setUserData((prev)=>{
      if (type === "file") {
        return{
          ...prev,
          image : files[0]
        }
      }
      return{
        ...prev,
        [name]:value
      }
    
 })
    }

    let handleSubmit = async (e) => {
        e.preventDefault()

        

        let formData = new FormData()

        formData.append("fullname",userData.fullname)
        formData.append("email",userData.email)
        formData.append("city",userData.city)
        formData.append("password",userData.password)
        formData.append("image",userData.image)


        try {
            
        
        let res = await axios.post("https://imdb-backend-e4xg.onrender.com/api/userRegister",formData,{
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
        alert(res.data.message)

        setUserData({
        fullname:"",
        email:"",
        city:"",
        password:"",
        image:null
        })

        navigate("/login")
        } catch (error) {
         console.log(error.response?.data || error.message);   
        }
    }

  return (
    <div className="container-fluid bg-dark min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-lg-5 col-md-7 col-sm-10 mx-auto">
          <div className="card shadow-lg p-4 border-0 rounded-4">
            <h3 className="text-center mb-4 text-warning">Create Account 🎬</h3>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullname"
                  value={userData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={userData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                  autoComplete="true"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-warning w-100 fw-bold">
                Register
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <span className="text-primary" style={{ cursor: "pointer" }}>
                 <a href="/login">Login</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;