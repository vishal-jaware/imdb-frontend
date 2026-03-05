import { useNavigate } from "react-router-dom"

function Admin(){

  const navigate = useNavigate()

  return(

    <div className="container mt-5">

      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="d-flex justify-content-center">

        <button
        className="btn btn-dark btn-lg"
        onClick={()=>navigate("/admin/movies")}
        >
          Manage Movies
        </button>

      </div>

      <p className="text-center mt-3 text-muted">
        Add, Update, Delete and Manage all movies from one place
      </p>

    </div>

  )

}

export default Admin