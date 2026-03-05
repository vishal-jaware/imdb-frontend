const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          
          <h1 className="mb-4 fw-bold">About MovieHub</h1>

          <p className="lead text-muted">
            MovieHub is a full-stack movie listing web application built using the 
            MERN stack. It allows users to explore movies, view detailed information, 
            search movies, and manage a personal watchlist.
          </p>

          <hr className="my-4" />

          <div className="text-start">
            
            <h4 className="fw-semibold mt-4">🎬 Features</h4>
            <ul className="mt-3">
              <li>Browse and explore movies</li>
              <li>Search movies by title, director, or stars</li>
              <li>View detailed movie information</li>
              <li>Top rated movie section</li>
              <li>Add movies to personal watchlist</li>
              <li>Pagination for large movie collections</li>
              <li>Admin dashboard to add, update, and delete movies</li>
              <li>Fully responsive UI using Bootstrap</li>
            </ul>

            <h4 className="fw-semibold mt-4">🛠 Tech Stack</h4>
            <ul className="mt-3">
              <li>MongoDB – Database</li>
              <li>Express.js – Backend API</li>
              <li>React.js – Frontend UI</li>
              <li>Node.js – Server Runtime</li>
              <li>Bootstrap – Responsive UI</li>
              <li>JWT & Cookies – Authentication</li>
            </ul>

            <h4 className="fw-semibold mt-4">🎯 Purpose</h4>
            <p className="mt-3">
              This project was built as a full-stack portfolio project to demonstrate 
              modern web development skills including REST APIs, authentication, 
              database operations, responsive design, and full CRUD functionality.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default About;