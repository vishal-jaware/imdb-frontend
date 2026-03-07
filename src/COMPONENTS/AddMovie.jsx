import { useState, useEffect } from "react"
import axios from "axios"
import { useContext } from "react"
import { productContext } from "./ContextApi"

function AddMovie(){

    
let {backUrl} = useContext(productContext)

const [movies,setMovies] = useState([])
const [editId,setEditId] = useState(null)

const [page,setPage] = useState(1)
const [totalPages,setTotalPages] = useState(1)

const [search,setSearch] = useState("")

const [movie,setMovie] = useState({
Poster_Link:"",
Series_Title:"",
Released_Year:"",
Certificate:"",
Runtime:"",
Genre:"",
IMDB_Rating:"",
Overview:"",
Meta_score:"",
Director:"",
Star1:"",
Star2:"",
Star3:"",
Star4:"",
No_of_Votes:"",
Gross:""
})


// FETCH MOVIES 

const fetchMovies = async ()=>{
try{

let res = await axios.get(
`${backUrl}/movies?page=${page}&limit=12&search=${search}`
)

setMovies(res.data.movies)
setTotalPages(res.data.totalPages)

}catch(error){
console.log(error)
}
}

useEffect(()=>{
fetchMovies()
},[page,search])


// FORM CHANGE 

const handleChange = (e)=>{
setMovie({...movie,[e.target.name]:e.target.value})
}


// ADD / UPDATE 

const handleSubmit = async(e)=>{
e.preventDefault()

try{

if(editId){

await axios.put(
`${backUrl}/updatemovie/${editId}`,
movie,
{withCredentials:true}
)

alert("Movie Updated")
setEditId(null)

}else{

await axios.post(
`${backUrl}/addmovie`,
movie,
{withCredentials:true}
)

alert("Movie Added Successfully")

}

setPage(1)
fetchMovies()

}catch(error){
console.log(error)
}

}


// DELETE MOVIE 

const handleDelete = async(id)=>{
try{

await axios.delete(
`${backUrl}/deletemovie/${id}`,
{withCredentials:true}
)

alert("Movie Deleted")

setPage(1)
fetchMovies()

}catch(error){
console.log(error)
}
}


// EDIT MOVIE 

const handleEdit = (m)=>{

setMovie(m)
setEditId(m._id)

window.scrollTo({top:0,behavior:"smooth"})

}


return(

<div className="container mt-5">

<h2>{editId ? "Update Movie" : "Add Movie"}</h2>

<form onSubmit={handleSubmit}>

<input name="Poster_Link" value={movie.Poster_Link} placeholder="Poster Link" className="form-control mb-2" onChange={handleChange}/>

<input name="Series_Title" value={movie.Series_Title} placeholder="Movie Title" className="form-control mb-2" onChange={handleChange}/>

<input name="Released_Year" value={movie.Released_Year} placeholder="Released Year" className="form-control mb-2" onChange={handleChange}/>

<input name="Certificate" value={movie.Certificate} placeholder="Certificate" className="form-control mb-2" onChange={handleChange}/>

<input name="Runtime" value={movie.Runtime} placeholder="Runtime" className="form-control mb-2" onChange={handleChange}/>

<input name="Genre" value={movie.Genre} placeholder="Genre" className="form-control mb-2" onChange={handleChange}/>

<input name="IMDB_Rating" value={movie.IMDB_Rating} placeholder="IMDB Rating" className="form-control mb-2" onChange={handleChange}/>

<textarea name="Overview" value={movie.Overview} placeholder="Overview" className="form-control mb-2" onChange={handleChange}/>

<input name="Meta_score" value={movie.Meta_score} placeholder="Meta Score" className="form-control mb-2" onChange={handleChange}/>

<input name="Director" value={movie.Director} placeholder="Director" className="form-control mb-2" onChange={handleChange}/>

<input name="Star1" value={movie.Star1} placeholder="Star 1" className="form-control mb-2" onChange={handleChange}/>

<input name="Star2" value={movie.Star2} placeholder="Star 2" className="form-control mb-2" onChange={handleChange}/>

<input name="Star3" value={movie.Star3} placeholder="Star 3" className="form-control mb-2" onChange={handleChange}/>

<input name="Star4" value={movie.Star4} placeholder="Star 4" className="form-control mb-2" onChange={handleChange}/>

<input name="No_of_Votes" value={movie.No_of_Votes} placeholder="Number of Votes" className="form-control mb-2" onChange={handleChange}/>

<input name="Gross" value={movie.Gross} placeholder="Gross Revenue" className="form-control mb-2" onChange={handleChange}/>

<button className={`btn ${editId ? "btn-warning" : "btn-success"}`}>
{editId ? "Update Movie" : "Add Movie"}
</button>

</form>

<hr className="my-5"/>


{/* SEARCH BAR  */}

<div className="mb-3 d-flex gap-2">

<input
type="text"
placeholder="Search movie by title, director, actor..."
className="form-control"
value={search}
onChange={(e)=>{
setSearch(e.target.value)
setPage(1)
}}
/>

<button
className="btn btn-primary"
onClick={fetchMovies}
>
Search
</button>

<button
className="btn btn-secondary"
onClick={()=>{
setSearch("")
setPage(1)
}}
>
Clear
</button>

</div>


{/* MOVIE LIST */}

<h3>All Movies</h3>

<table className="table table-bordered">

<thead>

<tr>
<th>Poster</th>
<th>Title</th>
<th>Director</th>
<th>Year</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{movies.map((m)=>(
<tr key={m._id}>

<td>
<img src={m.Poster_Link} width="60"/>
</td>

<td>{m.Series_Title}</td>
<td>{m.Director}</td>
<td>{m.Released_Year}</td>

<td>

<button
className="btn btn-warning btn-sm me-2"
onClick={()=>handleEdit(m)}
>
Edit
</button>

<button
className="btn btn-danger btn-sm"
onClick={()=>handleDelete(m._id)}
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>


{/* PAGINATION */}

<div className="d-flex justify-content-center align-items-center gap-3 mt-4">

<button
className="btn btn-secondary"
disabled={page === 1}
onClick={()=>setPage(page-1)}
>
Previous
</button>

<span>
Page {page} of {totalPages}
</span>

<button
className="btn btn-secondary"
disabled={page === totalPages}
onClick={()=>setPage(page+1)}
>
Next
</button>

</div>

</div>

)

}

export default AddMovie