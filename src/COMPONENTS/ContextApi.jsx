import { createContext, useEffect } from "react";

let productContext = createContext()

function ContextApi ({children}){

    // let backUrl = 'http://localhost:8000/api'
    let backUrl = "https://imdb-backend-e4xg.onrender.com/api"
    

    return(
        <>
        <productContext.Provider value={{backUrl}}>
            {children}
        </productContext.Provider>
        </>
    )

}

export default ContextApi
export {productContext}