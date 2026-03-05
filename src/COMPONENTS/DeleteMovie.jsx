import axios from "axios"

export const deleteMovie = async (id) => {
  try {

    const res = await axios.delete(
      `https://imdb-backend-e4xg.onrender.com/api/deletemovie/${id}`,
      {
        withCredentials: true
      }
    )

    return res.data

  } catch (error) {
    console.log("DELETE ERROR:", error)
    throw error
  }
}