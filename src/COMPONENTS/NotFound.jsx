import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      <Link to="/" style={styles.button}>
        Go Back Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  code: {
    fontSize: "80px",
    margin: "0",
    color: "crimson"
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#111",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px"
  }
};

export default NotFound;
