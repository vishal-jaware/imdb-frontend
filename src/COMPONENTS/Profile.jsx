import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/profile",
          { withCredentials: true }
        );
        setUser(res.data.user);
        console.log(user);
        
      } catch (error) {
  console.log("PROFILE ERROR:", error);
  return res.status(500).json({ message: "Failed to fetch profile" });
}
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }


  const handleRemove = async (movieId) => {
  try {
    await axios.delete(
      `http://localhost:8000/api/watchlist/${movieId}`,
      { withCredentials: true }
    );

    // update UI 
    setUser(prev => ({
      ...prev,
      watchlist: prev.watchlist.filter(
        movie => movie._id !== movieId
      )
    }));

  } catch (error) {
    console.log("REMOVE ERROR:", error.response?.data || error.message);
  }
};

  return (
    <div className="container py-5">
      <div className="card shadow-lg p-4 rounded-4 text-center">

        <img
          src={
            user.image
              ? `http://localhost:8000/uploads/${user.image}`
              : "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="rounded-circle mb-3"
          width="150"
          height="150"
          style={{ objectFit: "cover" }}
        />

        <h3 className="fw-bold">{user.fullname}</h3>
        <p className="text-muted">{user.email}</p>

        <hr />

        <div className="text-start mt-3">
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>User ID:</strong> {user._id}</p>
        </div>

      </div>
      <hr />
      <div className="mt-4 text-start">
  <h5 className="fw-bold mb-3">My Watchlist</h5>

  {user.watchlist && user.watchlist.length > 0 ? (
    <div className="row">
      {user.watchlist.map((movie) => (
        <div key={movie._id} className="col-md-3 mb-3">
          <div className="card h-100 shadow-sm">
            <img
              src={movie.Poster_Link}
              className="card-img-top"
              alt={movie.Series_Title}
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h6 className="card-title">{movie.Series_Title}</h6>

              <button
      className="btn btn-danger btn-sm mt-auto"
      onClick={() => handleRemove(movie._id)}
    >
      Remove
    </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-muted">No movies in watchlist yet.</p>
  )}
</div>
    </div>

    
  );
}

export default Profile;