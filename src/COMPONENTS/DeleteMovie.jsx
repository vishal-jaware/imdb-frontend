import axios from "axios"
import { useContext } from "react"
import { productContext } from "./ContextApi"
export const deleteMovie = async (id) => {

  let {backUrl} = useContext(productContext)
  try {

    const res = await axios.delete(
      `${backUrl}/deletemovie/${id}`,
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