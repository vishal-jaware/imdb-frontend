import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Home() {
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [show, setShow] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMovies();
    fetchTopRated();
  }, [currentPage, search]);

  //  FETCH MOVIES WITH PAGINATION
  const fetchMovies = async () => {
    try {
      let res = await axios.get(
        `https://imdb-backend-e4xg.onrender.com/api/movies?page=${currentPage}&limit=12&search=${search}`,
      );

      setMovies(res.data.movies);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  //  FETCH TOP RATED
const fetchTopRated = async () => {
  try {
    let res = await axios.get(
      "https://imdb-backend-e4xg.onrender.com/api/movies/top-rated"
    );
    setTopRated(res.data.movies);
  } catch (error) {
    console.log(error);
  }
};

  //  OPEN MODAL
  const openDetails = (movie) => {
    setSelectedMovie(movie);
    setShow(true);
  };

  // ADD TO WATCHLIST
  const addToWatchlist = async (movie) => {
    try {
      const res = await axios.post(
        `https://imdb-backend-e4xg.onrender.com/api/watchlist/${movie._id}`,
        {},
        { withCredentials: true },
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-black text-white min-vh-100 p-4">
      {/*  SEARCH */}
      <div className="container mb-4">
        <div className="d-flex gap-2">
          <input
            type="text"
            placeholder="Search movie by title, director, star..."
            className="form-control"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <button className="btn btn-primary" onClick={fetchMovies}>
            Search
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearch("");
              setCurrentPage(1);
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/*  TRENDING */}
      <div className="container mb-5">
        <h4 className="text-warning mb-3">Trending Movies</h4>

        <div style={{ display: "flex", overflowX: "auto", gap: "15px" }}>
          {movies.slice(0, 10).map((movie) => (
            <div
              key={movie._id}
              style={{ minWidth: "200px", cursor: "pointer" }}
              onClick={() => openDetails(movie)}
            >
              <img
                src={movie.Poster_Link}
                alt={movie.Series_Title}
                style={{
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <p className="mt-2">{movie.Series_Title}</p>
              <span style={{ color: "#f5c518" }}>⭐ {movie.IMDB_Rating}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TOP RATED */}
      <div className="container mb-5">
        <h4 className="text-warning mb-3">⭐ Top Rated</h4>

        <div style={{ display: "flex", overflowX: "auto", gap: "15px" }}>
          {topRated.map((movie) => (
            <div
              key={movie._id}
              style={{ minWidth: "200px", cursor: "pointer" }}
              onClick={() => openDetails(movie)}
            >
              <img
                src={movie.Poster_Link}
                alt={movie.Series_Title}
                style={{
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <p className="mt-2">{movie.Series_Title}</p>
              <span style={{ color: "#f5c518" }}>⭐ {movie.IMDB_Rating}</span>
            </div>
          ))}
        </div>
      </div>

      {/*  ALL MOVIES */}
      <div className="container mb-5">
        <h4 className="text-warning mb-4">All Movies</h4>

        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-3 mb-4" key={movie._id}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => openDetails(movie)}
              >
                <img
                  src={movie.Poster_Link}
                  className="img-fluid rounded"
                  style={{ height: "300px", objectFit: "cover" }}
                />

                <p className="mt-2">{movie.Series_Title}</p>
                <span style={{ color: "#f5c518" }}>⭐ {movie.IMDB_Rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/*  PAGINATION */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
          <button
            className="btn btn-warning"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)]
            .slice(
              Math.max(currentPage - 3, 0),
              Math.min(currentPage + 2, totalPages),
            )
            .map((_, index) => {
              const pageNumber = Math.max(currentPage - 2, 1) + index;

              return (
                <button
                  key={pageNumber}
                  className={`btn ${
                    currentPage === pageNumber
                      ? "btn-warning"
                      : "btn-outline-warning"
                  }`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}

          <button
            className="btn btn-warning"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

        <p className="text-center mt-2 text-secondary">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/*  MOVIE MODAL */}
      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        {selectedMovie && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMovie.Series_Title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="row">
                <div className="col-md-5 text-center">
                  <img
                    src={selectedMovie.Poster_Link}
                    alt={selectedMovie.Series_Title}
                    style={{
                      width: "100%",
                      maxHeight: "500px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <div className="col-md-7">
                  <p>{selectedMovie.Overview}</p>

                  <p>
                    <strong>Director:</strong> {selectedMovie.Director}
                  </p>

                  <p>
                    <strong>Genre:</strong> {selectedMovie.Genre}
                  </p>

                  <p style={{ color: "#f5c518", fontSize: "18px" }}>
                    ⭐ {selectedMovie.IMDB_Rating}
                  </p>

                  <Button
                    variant="warning"
                    onClick={() => addToWatchlist(selectedMovie)}
                  >
                    Add to Watchlist ❤️
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Home;
